import { CheckCircle2, ChevronDown, ChevronUp, Gauge, Zap } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/Badge';
import type { Strategy } from '../../types';

const effortTone = (e: string) =>
  e === 'Low' ? 'success' : e === 'Medium' ? 'warning' : 'danger';

export function StrategyCard({ strategy, index = 0 }: { strategy: Strategy; index?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-shadow hover:shadow-cardhover">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-900">{strategy.title}</h4>
            <Badge tone="brand">{strategy.category}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600">{strategy.summary}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              Impact: <strong className="text-slate-700">{strategy.impact}</strong>
            </span>
            <span className="inline-flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5 text-slate-400" />
              Effort: <Badge tone={effortTone(strategy.effort)}>{strategy.effort}</Badge>
            </span>
          </div>
        </div>
        <span className="mt-1 shrink-0 text-slate-400">
          {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      {open && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 animate-fade">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Next steps
          </p>
          <ul className="space-y-1.5">
            {strategy.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
