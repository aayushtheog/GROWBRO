import { Target } from 'lucide-react';
import type { GrowthObjective } from '../../types';

export function ObjectiveCard({
  objective,
  compact = false,
}: {
  objective: GrowthObjective;
  compact?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
      {!compact && objective.summary && (
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-700">What I understand:</span>{' '}
          {objective.summary}
        </p>
      )}
      <div className={`flex items-start gap-3 ${!compact && objective.summary ? 'mt-3' : ''}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
          <Target className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Your objective
          </p>
          <p className="mt-0.5 text-lg font-bold leading-snug text-slate-900">
            {objective.objective}
          </p>
        </div>
      </div>
    </div>
  );
}
