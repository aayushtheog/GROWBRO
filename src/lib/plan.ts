// Growth-plan generation: takes a stated business problem and produces a clear
// objective plus several practical strategies (each with a why, a next-step
// action plan, and a linked case study). This is the heart of the coach flow:
//   PROBLEM -> OBJECTIVE -> STRATEGIES -> CHOOSE ONE -> ACTION PLAN.

import type { BusinessProfile, GrowthObjective, Strategy } from '../types';
import { analyzeBusiness, understandProblem } from './businessLogic';
import { DEFAULT_STRATEGIES, STRATEGY_LIBRARY } from '../data/content';

export interface GrowthPlan {
  objective: GrowthObjective;
  strategies: Strategy[];
}

/**
 * Build a growth plan for a stated problem. Combines the user's own words with
 * any known business profile context, detects the problem categories, and
 * returns a focused set of strategies (deduplicated, capped, ordered by impact).
 */
export function createGrowthPlan(userInput: string, profile: BusinessProfile): GrowthPlan {
  const { summary, objective } = understandProblem(userInput);

  // Analyse the intersection of stated problem + known profile to pick strategies.
  const context = analyzeBusiness({
    ...profile,
    problems: [profile.problems, userInput].filter(Boolean).join(', '),
  });

  let strategies: Strategy[] = context.strategies;
  if (strategies.length === 0 || strategies.length < 2) {
    // Nothing confidently detected — fall back to a solid general starting set.
    strategies = [...strategies, ...DEFAULT_STRATEGIES];
  }

  // Deduplicate and keep a focused, prioritized set.
  strategies = dedupe(strategies).slice(0, 4);

  const createdAt = Date.now();
  return {
    objective: { problem: userInput.trim(), summary, objective, createdAt },
    strategies,
  };
}

export function findStrategyById(id: string, strategies: Strategy[]): Strategy | undefined {
  return strategies.find((s) => s.id === id);
}

/** Look a strategy up in the full library (used by the chatbot's "add to plan"). */
export function findStrategyInLibrary(id: string): Strategy | undefined {
  return STRATEGY_LIBRARY.find((s) => s.id === id);
}

function dedupe(list: Strategy[]): Strategy[] {
  const seen = new Set<string>();
  const out: Strategy[] = [];
  for (const s of list) {
    if (!seen.has(s.id)) {
      seen.add(s.id);
      out.push(s);
    }
  }
  return out;
}
