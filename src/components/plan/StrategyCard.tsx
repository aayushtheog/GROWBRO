import { Gauge, Zap, BookOpen, Check } from 'lucide-react';
import type { CaseStudy, Strategy } from '../../types';

const effortTone: Record<string, string> = {
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  High: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export function StrategyCard({
  strategy,
  caseStudy,
  cta,
  selected = false,
}: {
  strategy: Strategy;
  caseStudy?: CaseStudy;
  cta: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border bg-white p-5 shadow-card transition-shadow hover:shadow-cardhover ${
        selected ? 'border-brand-400 ring-2 ring-brand-100' : 'border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-bold text-slate-900">{strategy.title}</h3>
        {selected && (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            <Check className="h-3 w-3" /> Your plan
          </span>
        )}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">{strategy.summary}</p>

      {strategy.why && (
        <p className="mt-3 rounded-xl bg-brand-50/70 px-3 py-2.5 text-sm text-slate-700">
          <span className="font-semibold text-brand-700">Why it could help:</span> {strategy.why}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          Impact: <strong className="text-slate-700">{strategy.impact}</strong>
        </span>
        <span className="inline-flex items-center gap-1">
          <Gauge className="h-3.5 w-3.5 text-slate-400" />
          Effort:
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${effortTone[strategy.effort]}`}
          >
            {strategy.effort}
          </span>
        </span>
        {caseStudy && (
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-brand-500" />
            Example: <span className="text-slate-700">{caseStudy.title}</span>
          </span>
        )}
      </div>

      <div className="mt-4 pt-1">{cta}</div>
    </div>
  );
}
