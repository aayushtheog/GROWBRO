// Deterministic business-solution engine.
// Given a business profile, it identifies likely problems and maps each to a
// concrete strategy with next steps. Used by both the dashboard and the
// chatbot's offline fallback so recommendations stay consistent and explainable.

import type { BusinessProblem, BusinessProfile, Strategy } from '../types';
import { strategyForProblem, STRATEGY_LIBRARY } from '../data/content';

export interface AnalysisResult {
  problems: BusinessProblem[];
  strategies: Strategy[];
}

const KEYWORDS: Record<string, { id: string; title: string; description: string; checked: (text: string) => boolean; severity: BusinessProblem['severity']; }> = {
  loyalty: {
    id: 'problem_loyalty',
    title: 'Weak customer retention',
    description:
      'Few customers come back after their first purchase, so you keep paying to acquire new ones.',
    checked: (t) =>
      /retention|repeat|loyal|churn|no repeat|don'?t come back|one[ -]time/i.test(t),
    severity: 'high',
  },
  margin: {
    id: 'problem_margin',
    title: 'Thin profit margins',
    description:
      'Revenue may be okay but margins are tight — pricing or product mix is leaving money on the table.',
    checked: (t) => /margin|profit|expensive|costs? (are )?(high|too high)|overhead|barely break/i.test(t),
    severity: 'high',
  },
  acquisition: {
    id: 'problem_acquisition',
    title: 'Inconsistent customer acquisition',
    description:
      'New customers arrive sporadically with no repeatable funnel bringing them in predictably.',
    checked: (t) => /acquir|new customer|leads?|walk[ -]ins|no traffic|marketing isn'?t working|hard to find/i.test(t),
    severity: 'high',
  },
  upsell: {
    id: 'problem_upsell',
    title: 'Low revenue per customer',
    description:
      'Customers buy once at a low value — there’s little upselling, bundling, or additional revenue per sale.',
    checked: (t) => /upsell|cross[ -]sell|average order|basket|add[ -]on|low value|spend per/i.test(t),
    severity: 'medium',
  },
  operations: {
    id: 'problem_operations',
    title: 'Manual, time-consuming operations',
    description:
      'Too much day-to-day work is done by hand, which caps growth and introduces errors as you scale.',
    checked: (t) => /manual|time[ -]consuming|admin|paperwork|operations|automate|swamped|no staff/i.test(t),
    severity: 'medium',
  },
  pricing: {
    id: 'problem_pricing',
    title: 'Underpriced or unclear offer',
    description:
      'Your pricing or packaging doesn’t reflect the value you deliver, leaving profit and growth on the table.',
    checked: (t) => /price|pricing|packag|tier|too cheap|undervalue/i.test(t),
    severity: 'medium',
  },
  online: {
    id: 'problem_online',
    title: 'Weak online presence',
    description:
      'Your website or listings don’t convert the traffic you already have into customers.',
    checked: (t) => /website|online|social media|web|digital|search|google|listing/i.test(t),
    severity: 'medium',
  },
  clarity: {
    id: 'problem_clarity',
    title: 'Unclear positioning',
    description:
      'Your ideal customer and core value aren’t sharply defined, so messaging feels scattered.',
    checked: (t) => /who.{0,20}customer|target|audience|ideal|position|message|confus/i.test(t),
    severity: 'low',
  },
};

const PROBLEM_ORDER: Record<string, number> = {
  problem_loyalty: 1,
  problem_margin: 2,
  problem_acquisition: 3,
  problem_upsell: 4,
  problem_operations: 5,
  problem_pricing: 6,
  problem_online: 7,
  problem_clarity: 8,
};

export function analyzeBusiness(profile: BusinessProfile): AnalysisResult {
  const text = `${profile.industry} ${profile.goals} ${profile.targetCustomers} ${profile.currentSituation} ${profile.problems}`.toLowerCase();

  // Stated problems are always honored and ranked highest.
  const stated = profile.problems
    .split(/[,\n;]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const problems: BusinessProblem[] = stated.map((p, i) => ({
    id: `stated_${i}`,
    title: 'Stated problem',
    description: p,
    severity: 'high',
    evidence: 'You told us this is a problem.',
    source: 'stated',
  }));

  const inferred = Object.values(KEYWORDS)
    .filter((k) => k.checked(text))
    .map<BusinessProblem>((k) => ({
      id: k.id,
      title: k.title,
      description: k.description,
      severity: k.severity,
      evidence: `Flagged from your description of your ${k.title.toLowerCase().split(' ')[0]} situation and goals.`,
      source: 'inferred',
    }))
    .sort((a, b) => (PROBLEM_ORDER[a.id] ?? 99) - (PROBLEM_ORDER[b.id] ?? 99));

  // Merge: keep all inferred; a stated problem also "counts" as inferred coverage below.
  const merged = [...problems, ...inferred];

  // Build strategy list: cover every problem (stated ones pull from a default set).
  const strategies: Strategy[] = [];
  const seen = new Set<string>();

  for (const prob of [...inferred, ...problems]) {
    let strat = strategyForProblem(prob.id);
    if (!strat) {
      strat = strategyForProblem('problem_clarity');
    }
    if (strat && !seen.has(strat.id)) {
      seen.add(strat.id);
      strategies.push({ ...strat });
    }
  }

  // If very little was detected, include a couple of general high-value strategies
  // so the panel never looks empty.
  if (strategies.length === 0) {
    for (const s of STRATEGY_LIBRARY.slice(0, 3)) {
      if (!seen.has(s.id)) {
        seen.add(s.id);
        strategies.push({ ...s });
      }
    }
  }

  return { problems: merged, strategies };
}

/** Which problem categories are detected for a piece of text. */
export function detectProblemIds(text: string): string[] {
  const lower = text.toLowerCase();
  return (Object.values(KEYWORDS)
    .filter((k) => k.checked(lower))
    .map((k) => k.id)
  ).sort((a, b) => (PROBLEM_ORDER[a] ?? 99) - (PROBLEM_ORDER[b] ?? 99));
}

// Plain-language "what this actually means" for each detected problem category.
const CATEGORY_MEANING: Record<string, string> = {
  problem_loyalty:
    'most customers never buy a second time, so we keep paying to find new ones',
  problem_margin:
    'we are not earning enough on what we sell — pricing or costs are leaving money behind',
  problem_acquisition:
    'new customers only arrive now and then, with no reliable way to bring them in',
  problem_upsell:
    'customers spend only once and at a low amount, so each sale is worth too little',
  problem_operations:
    'too much day-to-day work is done by hand, which slows us down as we grow',
  problem_pricing:
    'our pricing or packaging does not reflect the value we deliver',
  problem_online:
    'our website and online presence are not turning visitors into customers',
  problem_clarity:
    'people are not sure what we do best or who we are for',
};

// A clear, one-line objective for each detected problem category.
const CATEGORY_OBJECTIVE: Record<string, string> = {
  problem_loyalty: 'Turn more one-time buyers into loyal, repeat customers.',
  problem_margin: 'Improve our profit margins so we earn more on every sale.',
  problem_acquisition: 'Build a steady, repeatable flow of new customers.',
  problem_upsell: 'Earn more from every customer by increasing each order value.',
  problem_operations: 'Simplify our operations so we can grow without extra stress.',
  problem_pricing: 'Price and package our offer to match its true value.',
  problem_online: 'Turn our online presence into a reliable source of customers.',
  problem_clarity: 'Sharpen our message so the right customers understand and choose us.',
};

/**
 * Turn a stated problem into a simplified understanding and a clear objective.
 * `humanizeProblem` maps detected categories to plain-language explanations so
 * the user immediately sees that GrowBro "gets" their problem.
 */
export function understandProblem(userInput: string): {
  summary: string;
  objective: string;
  categories: string[];
} {
  const ids = detectProblemIds(userInput);
  const categories = ids.map((id) => CATEGORY_MEANING[id] ?? 'growth is being held back somewhere').filter(Boolean);

  if (ids.length > 0 && categories.length > 0) {
    const summary = `You told us: “${userInput.trim()}”. In plain terms, this is about the fact that ${categories[0]}.`;
    const objective = CATEGORY_OBJECTIVE[ids[0]] ?? 'Grow the business in a simple, steady way.';
    return { summary, objective, categories: categories.slice(0, 2) };
  }

  return {
    summary: `I heard you: “${userInput.trim()}”. You want to grow your business, but something is getting in the way.`,
    objective: 'Find the clearest growth opportunity and take steady, small steps toward it.',
    categories: [],
  };
}

// A lightweight "personalization score" based on the profile + current metrics,
// used to pick which highlighted recommendation to surface first.
export function topRecommendation(result: AnalysisResult): Strategy | null {
  if (result.strategies.length === 0) return null;
  const prioritized = [...result.strategies].sort((a, b) => {
    const impactRank = (imp: string) => (imp === 'High' ? 0 : imp === 'Medium' ? 1 : 2);
    return impactRank(a.impact) - impactRank(b.impact);
  });
  return prioritized[0];
}

// Build a short, human-friendly summary paragraph about the business state.
export function summarizeProfile(profile: BusinessProfile): string {
  return `${profile.businessName || 'Your business'} — an ${
    profile.industry || 'unlisted'
  } business focused on ${profile.goals || 'growth'}, serving ${
    profile.targetCustomers || 'customers'
  }. Current situation: ${profile.currentSituation || 'n/a'}.`;
}
