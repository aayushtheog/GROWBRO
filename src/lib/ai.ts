// AI layer for the GrowBro chatbot.
//
// When the optional `ANTHROPIC_API_KEY` env var is set (see .env.example),
// this calls the Anthropic Messages API directly for a real AI response.
// When no key is configured — the default demo state — it falls back to a
// local engine that understands a WIDE variety of business questions:
//   - specific problem statements ("low repeat customers", "thin margins"…)
//   - common "how do I…" topics (social media, pricing, email, referrals…)
//   - greetings and quick acknowledgements
//   - anything else → asks helpful follow-up questions and offers starting steps
// Both paths return the same shape, so the UI is identical.

import type {
  AiSolution,
  BusinessProfile,
  ChatMessage,
  GrowthObjective,
  Strategy,
} from '../types';
import { summarizeProfile } from './businessLogic';
import { createGrowthPlan, findStrategyInLibrary } from './plan';
import { DEFAULT_STRATEGIES, findTopicAdvice } from '../data/content';
import { uid } from './storage';

const env = () =>
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};

export const isAiConfigured = (): boolean =>
  Boolean(env().VITE_ANTHROPIC_API_KEY || env().ANTHROPIC_API_KEY);

const API_KEY = env().VITE_ANTHROPIC_API_KEY || env().ANTHROPIC_API_KEY;
const MODEL = env().VITE_ANTHROPIC_MODEL || 'claude-sonnet-5';

export interface AiResponse {
  message: string;
  solution: AiSolution;
}

/** Extra context the chat can pass in so the advisor can help with the active plan. */
export interface ChatContext {
  objective?: GrowthObjective | null;
}

/** Build a structured, empty-ish solution used for conversational replies. */
function conversationalSolution(problem: string, strategies: Strategy[] = [], nextSteps: string[] = []): AiSolution {
  return { problem, strategies, nextSteps };
}

/**
 * The local fallback engine. Handles greetings, thanks, "how do I" topics,
 * stated problems, and unknown input — so the chatbot never feels "broken".
 */
export function buildLocalSolution(
  userInput: string,
  profile: BusinessProfile,
  context: ChatContext = {},
): AiResponse {
  const text = userInput.trim();
  const lower = text.toLowerCase();

  // 1. Greetings.
  if (/^(hi|hello|hey|yo|good (morning|afternoon|evening)|howdy)\b/.test(lower)) {
    return greeting(context.objective);
  }

  // 2. Acknowledgements / brevity.
  if (/^(thanks|thank you|ok|okay|great|awesome|got it|sounds good|nice)\b/.test(lower)) {
    return {
      message:
        "You're welcome! 🙌 Tell me any business question or problem whenever you're ready — pricing, marketing, repeat customers, saving time — and I'll give you practical next steps.",
      solution: conversationalSolution(text),
    };
  }

  // 3. A "how do I… / what should I do about…" question on a known topic.
  const topic = findTopicAdvice(text);
  if (topic) {
    const base = findStrategyInLibrary(topic.planType);
    const strategy: Strategy =
      base ?? DEFAULT_STRATEGIES[0];
    const enriched: Strategy = {
      ...strategy,
      title: topic.title,
      summary: topic.intro,
      why: topic.intro,
      nextSteps: topic.steps,
      caseStudyId: topic.caseStudyId ?? strategy.caseStudyId,
    };
    return {
      message: `${topic.intro}\n\nI've turned this into a few simple steps below. Would you like me to add this to your plan?`,
      solution: conversationalSolution(text, [enriched], topic.steps),
    };
  }

  // 4. Otherwise treat it as a (stated) problem and build a full growth plan.
  //    The keyword engine still fires on anything that mentions a known
  //    problem, and the fallback keeps the response useful for anything else.
  const plan = createGrowthPlan(text, profile);
  const top = plan.strategies[0];

  let message = `${plan.objective.summary}\n\n**Your objective:** ${plan.objective.objective}`;

  if (context.objective) {
    message += `\n\n_I can also help with your current goal: “${context.objective.objective}”. Below are fresh options for the problem you just described._`;
  }

  message += `\n\nI've outlined ${plan.strategies.length} strategies below. Pick one and I'll build your step-by-step plan.`;

  return {
    message,
    solution: conversationalSolution(text, plan.strategies, top?.nextSteps ?? []),
  };
}

function greeting(objective?: GrowthObjective | null): AiResponse {
  const planLine = objective
    ? ` I can see your current goal is: “${objective.objective}” — ask me anything about it.`
    : '';
  return {
    message:
      `Hi! 👋 I'm GrowBro, your business growth coach.${planLine}\n\n` +
      'Tell me any business problem in your own words — for example:\n' +
      '• "I don\'t get enough customers."\n' +
      '• "My profit margins are too thin."\n' +
      '• "How do I use social media to sell more?"\n' +
      '• "Customers don\'t come back."\n\n' +
      'I\'ll understand your situation and give you practical strategies and next steps.',
    solution: conversationalSolution(''),
  };
}

/**
 * Produce an AI response for a user message. Uses the real Anthropic API when
 * a key is configured, otherwise the local engine.
 */
export async function getAiResponse(
  userMessage: string,
  profile: BusinessProfile,
  history: ChatMessage[],
  context: ChatContext = {},
): Promise<AiResponse> {
  if (!API_KEY) {
    // Demo mode — purely local, no network needed.
    return buildLocalSolution(userMessage, profile, context);
  }

  try {
    const structured = await callAnthropic(userMessage, profile, history, context);
    return structured ?? buildLocalSolution(userMessage, profile, context);
  } catch (err) {
    console.error('[growbro] Anthropic call failed, using fallback engine:', err);
    return buildLocalSolution(userMessage, profile, context);
  }
}

async function callAnthropic(
  userMessage: string,
  profile: BusinessProfile,
  history: ChatMessage[],
  context: ChatContext,
): Promise<AiResponse | null> {
  const planContext = context.objective
    ? ` The user's current objective is: "${context.objective.objective}".`
    : '';

  const system = [
    'You are GrowBro, a friendly expert business-growth coach.',
    'Help small-business owners with a WIDE variety of business questions: pricing, marketing, retention, acquisition, operations, online presence, and more.',
    'Understand the problem, ask a useful follow-up question only when you truly need more detail, then give practical strategies with clear next steps.',
    'Respond with VALID JSON only, using exactly this shape:',
    '{"message": "a short markdown summary for the user", ',
    ' "solution": {"problem": "restate the user problem", ',
    '   "strategies": [{"title","summary","category","effort","impact","nextSteps":[]}], ',
    '   "nextSteps": []}}',
    'Keep strategies concrete and specific to their business. Do not fabricate real costs.',
    `Business profile for context: ${summarizeProfile(profile)}.${planContext}`,
  ].join('\n');

  const messages = [
    ...history.slice(-8).map((m) => ({ role: m.role, content: m.content })),
    { role: 'user' as const, content: userMessage },
  ];

  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  };
  if (API_KEY) headers['x-api-key'] = API_KEY;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1200,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const text: string = (data?.content ?? [])
    .filter((c: { type: string }) => c.type === 'text')
    .map((c: { text: string }) => c.text)
    .join('\n')
    .trim();

  const parsed = extractJson(text);
  if (!parsed || !parsed.solution) return null;
  return {
    message: parsed.message ?? 'Here are my recommendations.',
    solution: {
      problem: parsed.solution.problem ?? userMessage,
      strategies: (parsed.solution.strategies ?? []).map((s) => ({
        id: uid('strat'),
        title: s.title,
        summary: s.summary,
        category: s.category ?? 'Strategy',
        effort: (s.effort ?? 'Medium') as Strategy['effort'],
        impact: (s.impact ?? 'Medium') as Strategy['impact'],
        nextSteps: Array.isArray(s.nextSteps) ? s.nextSteps : [],
      })),
      nextSteps: Array.isArray(parsed.solution.nextSteps) ? parsed.solution.nextSteps : [],
    },
  };
}

// Tolerate the model wrapping JSON in markdown fences or prose.
function extractJson(text: string): {
  message?: string;
  solution?: {
    problem?: string;
    strategies?: Array<{
      title: string;
      summary: string;
      category?: string;
      effort?: string;
      impact?: string;
      nextSteps?: string[];
    }>;
    nextSteps?: string[];
  };
} | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(candidate.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}
