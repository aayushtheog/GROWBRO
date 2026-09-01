import { CheckCircle2, Circle, Target, Flag } from 'lucide-react';
import type { RoadmapDay } from '../../types';

/** A single expandable day in the 30-day roadmap. */
export function RoadmapDayRow({
  day,
  isCurrent,
  onToggle,
}: {
  day: RoadmapDay;
  isCurrent: boolean;
  onToggle: (dayNumber: number) => void;
}) {
  return (
    <button
      onClick={() => onToggle(day.day)}
      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
        day.done
          ? 'border-emerald-200 bg-emerald-50/50'
          : isCurrent
            ? 'border-brand-300 bg-brand-50/40 hover:border-brand-400'
            : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50'
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        <span className="text-[9px] font-semibold uppercase leading-none text-slate-400">Day</span>
        <span className="text-sm font-extrabold leading-tight">{day.day}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`text-sm font-semibold ${
              day.done ? 'text-slate-400 line-through' : 'text-slate-800'
            }`}
          >
            {day.task}
          </p>
          {isCurrent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Today
            </span>
          )}
        </div>

        <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          <span className="flex items-start gap-1.5 text-xs text-slate-500">
            <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
            <span>
              <span className="font-semibold text-slate-600">Goal:</span> {day.goal}
            </span>
          </span>
          <span className="flex items-start gap-1.5 text-xs text-slate-500">
            <Flag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
            <span>
              <span className="font-semibold text-slate-600">Outcome:</span> {day.outcome}
            </span>
          </span>
        </div>
      </div>

      <span className="mt-1 shrink-0">
        {day.done ? (
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        ) : (
          <Circle className="h-6 w-6 text-slate-300" />
        )}
      </span>
    </button>
  );
}
