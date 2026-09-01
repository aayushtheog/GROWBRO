import { Lightbulb, ListChecks, CheckCircle2, ArrowRight, ListChecks as ListChecksIcon } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { AiSolution } from '../../types';

const effortTone = (e: string) =>
  e === 'Low' ? 'success' : e === 'Medium' ? 'warning' : 'danger';

interface AiSolutionViewProps {
  solution: AiSolution;
  onAddToPlan?: (solution: AiSolution) => void;
}

export function AiSolutionView({ solution, onAddToPlan }: AiSolutionViewProps) {
  return (
    <div className="mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 shadow-sm">
      <div className="border-b border-slate-200 bg-white px-4 py-2.5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
          <Lightbulb className="h-3.5 w-3.5" /> Your growth plan
        </p>
      </div>

      <div className="space-y-4 p-4">
        {solution.strategies.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <ListChecksIcon className="h-3.5 w-3.5" /> Strategies
            </p>
            <div className="space-y-2">
              {solution.strategies.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{s.title}</span>
                    <Badge tone="brand">{s.category}</Badge>
                    <Badge tone={effortTone(s.effort)}>Effort: {s.effort}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{s.summary}</p>
                  {s.why && (
                    <p className="mt-2 rounded-xl bg-brand-50/70 px-3 py-2 text-[12px] text-slate-600">
                      <span className="font-semibold text-brand-700">Why it could help:</span> {s.why}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {onAddToPlan && solution.strategies.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                className="mt-3 w-full"
                onClick={() => onAddToPlan(solution)}
              >
                <ListChecksIcon className="h-4 w-4" /> Add this plan to My Plan
              </Button>
            )}
          </div>
        )}

        {solution.nextSteps.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recommended next steps
            </p>
            <ul className="space-y-1.5">
              {solution.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
