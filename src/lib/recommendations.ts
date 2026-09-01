// Personalized recommendation engine.
//
// Turns the user's business type + stated problem into exactly 5 highly
// relevant strategies. Scoring blends:
//   - which problem categories the problem text matches (keyword detection),
//   - the business type's category affinities,
//   - direct keyword hits between the strategy and the user's words.
// Every returned strategy gets a personalized `fit` line so the user sees
// WHY it was chosen for *their* combination. Works fully offline for demos.

import type { BusinessProfile, CaseStudy, GrowthObjective, Strategy } from '../types';
import { getBusinessType, getBusinessTypeLabel } from '../data/businessTypes';
import { detectProblemIds } from './businessLogic';
import { CASE_STUDIES, DEFAULT_STRATEGIES, STRATEGY_LIBRARY } from '../data/content';

const CATEGORY_MAP: Record<string, string> = {
  activity_retention: 'Retention',
  retention: 'Retention',
  activity_margin: 'Pricing',
  margin: 'Pricing',
  pricing: 'Pricing',
  activity_acquisition: 'Marketing',
  acquisition: 'Marketing',
  marketing: 'Marketing',
  activity_upsell: 'Revenue',
  upsell: 'Revenue',
  revenue: 'Revenue',
  activity_operations: 'Operations',
  operations: 'Operations',
  activity_online: 'Digital',
  online: 'Digital',
  digital: 'Digital',
  activity_clarity: 'Strategy',
  clarity: 'Strategy',
  strategy: 'Strategy',
  conversion: 'Conversion',
  activity_conversion: 'Conversion',
};

export interface PersonalizedPlan {
  objective: GrowthObjective;
  strategies: Strategy[];
  businessTypeId: string | null;
  businessTypeLabel: string;
}

function normalizeCategory(cat: string): string {
  return CATEGORY_MAP[cat.toLowerCase()] ?? cat;
}

/** Detect any of the canonical problem categories in a piece of text. */
function matchedCategories(text: string): string[] {
  const ids = detectProblemIds(text);
  return ids.map((id) => normalizeCategory(id.replace('problem_', 'activity_')));
}

/** Simple relevance sentence that names the user's business type + problem. */
function buildFit(strategy: Strategy, businessTypeLabel: string, problem: string): string {
  const bt = businessTypeLabel && businessTypeLabel !== 'your business' ? businessTypeLabel : 'a growing business like yours';
  return `For ${bt}, facing “${truncate(problem, 48)}”, ${strategy.title.toLowerCase()} is a focused next move — ${strategy.summary.charAt(0).toLowerCase() + strategy.summary.slice(1)}`;
}

function truncate(s: string, n: number): string {
  const t = s.trim();
  return t.length > n ? t.slice(0, n).trimEnd() + '…' : t;
}

const effortRank = (e: Strategy['effort']) => (e === 'Low' ? 0 : e === 'Medium' ? 1 : 2);
const impactRank = (i: Strategy['impact']) => (i === 'High' ? 0 : i === 'Medium' ? 1 : 2);

/**
 * Return exactly 5 personalized strategies for a business type + problem.
 * If fewer than 5 fit, it backfills with strong general strategies and always
 * ends at 5 (deduplicated).
 */
export function recommendTopFive(
  problemText: string,
  businessTypeId: string | null,
  profile?: BusinessProfile,
): Strategy[] {
  const text = [problemText, profile?.problems ?? '', profile?.industry ?? ''].join(' ').toLowerCase();
  const type = getBusinessType(businessTypeId);
  const matched = matchedCategories(text);

  const scored = STRATEGY_LIBRARY.map((s) => {
    const cat = normalizeCategory(s.category);
    let score = 0;

    // 1. Direct problem-category match (strongest signal).
    if (s.problemId) {
      const probCat = normalizeCategory(s.problemId.replace('problem_', 'activity_'));
      if (matched.includes(probCat)) score += 6;
    }
    if (matched.includes(cat)) score += 4;

    // 2. Business-type affinity for this category.
    const affinity = type?.categoryAffinity?.[cat.toLowerCase()] ?? 0;
    score += affinity * 2;

    // 3. Keyword hits between the strategy and the user's words.
    const haystack = `${s.title} ${s.summary} ${s.category} ${(s.nextSteps ?? []).join(' ')}`.toLowerCase();
    score += type?.keywords.some((k) => haystack.includes(k)) ? 2 : 0;
    const words = problemText.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    score += words.filter((w) => heatmap(haystack, w)).length * 0.5;

    return { s, score, cat };
  });

  // Sort by relevance, then by impact & effort as tie-breakers.
  const ranked = [...scored].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (impactRank(a.s.impact) !== impactRank(b.s.impact)) return impactRank(a.s.impact) - impactRank(b.s.impact);
    return effortRank(a.s.effort) - effortRank(b.s.effort);
  });

  const chosen: Strategy[] = [];
  const seen = new Set<string>();

  for (const { s } of ranked) {
    if (seen.has(s.id)) continue;
    chosen.push(s);
    seen.add(s.id);
    if (chosen.length >= 5) break;
  }

  // Backfill from defaults / library until we reach exactly 5.
  const backfillPool = [...DEFAULT_STRATEGIES, ...STRATEGY_LIBRARY];
  for (const s of backfillPool) {
    if (chosen.length >= 5) break;
    if (seen.has(s.id) || chosen.length >= 5) continue;
    chosen.push(s);
    seen.add(s.id);
  }

  // Personalize each with a `fit` line + fill backfilled entries with matches.
  const label = getBusinessTypeLabel(businessTypeId);
  return chosen.map((s) => ({
    ...s,
    fit:
      s.fit ?? buildFit(s, label, problemText),
  }));
}

/**
 * Build the full growth plan (objective + top 5 strategies) for the new flow.
 */
export function createPersonalizedPlan(
  problemText: string,
  businessTypeId: string | null,
  profile: BusinessProfile,
): PersonalizedPlan {
  const strategies = recommendTopFive(problemText, businessTypeId, profile);
  const ids = detectProblemIds(problemText);
  const objectiveText = objectivesFor(ids);

  const objective: GrowthObjective = {
    problem: problemText.trim(),
    summary: `You run a ${getBusinessTypeLabel(businessTypeId).toLowerCase() || 'business'} and you told us: “${problemText.trim()}”. Your top focus is ${objectiveText.toLowerCase()}.`,
    objective: objectiveText,
    createdAt: Date.now(),
  };

  return {
    objective,
    strategies,
    businessTypeId,
    businessTypeLabel: getBusinessTypeLabel(businessTypeId),
  };
}

function objectivesFor(ids: string[]): string {
  const map: Record<string, string> = {
    problem_loyalty: 'Turn more one-time buyers into loyal, repeat customers.',
    problem_margin: 'Improve your profit margins so you earn more on every sale.',
    problem_acquisition: 'Build a steady, repeatable flow of new customers.',
    problem_upsell: 'Earn more from every customer by increasing each order value.',
    problem_operations: 'Simplify operations so you can grow without extra stress.',
    problem_pricing: 'Price and package your offer to match its true value.',
    problem_online: 'Turn your online presence into a reliable source of customers.',
    problem_clarity: 'Sharpen your message so the right customers understand and choose you.',
  };
  for (const id of ids) {
    if (map[id]) return map[id];
  }
  return 'Find the clearest growth opportunity and take steady, small steps toward it.';
}

// Lightweight substring scoring (case-insensitive) for keyword matching.
function heatmap(haystack: string, word: string): boolean {
  return haystack.includes(word);
}

/** Case studies sorted so the user's business type / problem matches appear first. */
export function prioritizeCaseStudies(
  businessTypeId: string | null,
  problemText: string,
  studies: CaseStudy[] = CASE_STUDIES,
): CaseStudy[] {
  const type = getBusinessType(businessTypeId);
  const matched = matchedCategories(problemText);
  const lower = problemText.toLowerCase();

  const score = (c: CaseStudy): number => {
    let s = 0;
    const tagText = (c.tags ?? []).join(' ').toLowerCase();
    if (type) {
      if (type.id === 'other') s += 0;
      else if (c.businessType === type.id) s += 8;
      else if ((type.keywords ?? []).some((k) => c.industry.toLowerCase().includes(k) || tagText.includes(k))) s += 4;
    }
    if (matched.some((m) => m.toLowerCase() === m.toLowerCase())) {
      // category-ish match on tags/industry
      const cat = matched.length ? matched[0] : undefined;
      if (cat && tagText.includes(cat.toLowerCase())) s += 3;
    }
    if (lower && lower.length > 4) {
      s += c.challenge.toLowerCase().split(/\s+/).filter((w) => w.length > 4 && lower.includes(w)).length;
    }
    return s;
  };

  return [...studies].sort((a, b) => score(b) - score(a));
}
