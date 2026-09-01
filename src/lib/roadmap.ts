// Generates a 30-day RoadmapDay list for a selected strategy. Tasks come from
// the per-category template library so every day is relevant to the strategy
// the user chose. Used when the user picks a strategy of the month.

import type { RoadmapDay, Strategy } from '../types';
import { getRoadmapTemplate } from '../data/roadmapTemplates';

/**
 * Build a full 30-day roadmap for a strategy. Phase widths come from the
 * template (Week 1–4), and day numbers are assigned 1..30 in order. Tinkers
 * the tasks toward the user's business type name where meaningful.
 */
export function createRoadmap(strategy: Strategy): RoadmapDay[] {
  const template = getRoadmapTemplate(strategy.category);

  const days: RoadmapDay[] = [];
  let dayNumber = 0;

  for (let phase = 0; phase < template.weeks.length; phase++) {
    const week = template.weeks[phase];
    for (const t of week.tasks) {
      dayNumber += 1;
      if (dayNumber > 30) break;
      days.push({
        day: dayNumber,
        phase: phase + 1,
        phaseName: week.title,
        task: t.task,
        goal: t.goal,
        outcome: t.outcome,
        done: false,
      });
    }
  }

  return days;
}

/** Phase grouping helper used by the plan/progress views. */
export function groupByPhase(days: RoadmapDay[]): Map<number, RoadmapDay[]> {
  const map = new Map<number, RoadmapDay[]>();
  for (const d of days) {
    const arr = map.get(d.phase) ?? [];
    arr.push(d);
    map.set(d.phase, arr);
  }
  return map;
}
