import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ListChecks, Target, Calendar, TrendingUp, RotateCcw } from 'lucide-react';
import { useBusinessStore } from '../store/businessStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ObjectiveCard } from '../components/plan/ObjectiveCard';
import { format } from 'date-fns';

export function ProgressPage() {
  const navigate = useNavigate();
  const store = useBusinessStore();

  if (!store.plan) {
    return (
      <EmptyProgress
        title="No progress to show yet"
        message="Start by telling GrowBro the problem you're facing. You'll get a clear objective and a simple plan to track."
        actionLabel="Describe my problem"
        onAction={() => navigate('/home')}
      />
    );
  }

  const done = store.planSteps.filter((s) => s.done).length;
  const total = store.planSteps.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const nextStep = store.planSteps.find((s) => !s.done);
  const completedToday = useMemo(() => stepsCompletedToday(store.planSteps), [store.planSteps]);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Progress</p>
      <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
        How is your growth going?
      </h1>

      <div className="mt-6 space-y-5">
        <ObjectiveCard objective={store.plan} compact />

        {/* Today's focus */}
        <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Today's focus</p>
              <p className="text-sm font-medium text-slate-800">
                {nextStep
                  ? nextStep.text
                  : 'All steps complete — great work! 🎉'}
              </p>
            </div>
          </div>
        </div>

        {/* Big progress bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
                <TrendingUp className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Overall progress</p>
                <p className="text-3xl font-extrabold text-slate-900">{pct}%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">{done} of {total} steps done</p>
              {completedToday > 0 && (
                <p className="text-xs font-medium text-emerald-700">
                  ✓ {completedToday} completed today
                </p>
              )}
            </div>
          </div>
          <ProgressBar value={pct} className="mt-4 h-4" />
        </div>

        {/* Daily history */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
              <Calendar className="h-4 w-4" /> Daily progress
            </p>
            {store.planSteps.some((s) => s.doneAt) && (
              <Button variant="ghost" size="sm" onClick={() => navigate('/plan')}>
                <RotateCcw className="h-4 w-4" /> View plan
              </Button>
            )}
          </div>

          <div className="mt-4">
            {renderDailyHistory(store.planSteps)}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" className="flex-1" onClick={() => navigate('/plan')}>
            <ListChecks className="h-4 w-4" /> View my plan
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => navigate('/home')}>
            Start a new problem
          </Button>
        </div>
      </div>
    </div>
  );
}

function stepsCompletedToday(steps: { done: boolean; doneAt?: number }[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime();
  const tomorrowMs = todayMs + 24 * 60 * 60 * 1000;
  return steps.filter((s) => s.done && s.doneAt && s.doneAt >= todayMs && s.doneAt < tomorrowMs).length;
}

function renderDailyHistory(steps: { id: string; text: string; done: boolean; doneAt?: number }[]) {
  const doneSteps = steps.filter((s) => s.done && s.doneAt).sort((a, b) => (b.doneAt ?? 0) - (a.doneAt ?? 0));

  if (doneSteps.length === 0) {
    return (
      <div className="text-center py-6 text-slate-500">
        <p className="text-sm">No steps completed yet.</p>
        <p className="text-xs mt-1">Complete a step on your plan to see it here.</p>
      </div>
    );
  }

  // Group by date
  const byDate = new Map<string, typeof doneSteps>();
  for (const s of doneSteps) {
    if (!s.doneAt) continue;
    const date = format(new Date(s.doneAt), 'EEE, MMM d');
    const arr = byDate.get(date) ?? [];
    arr.push(s);
    byDate.set(date, arr);
  }

  return (
    <div className="space-y-4">
      {Array.from(byDate.entries()).map(([date, items]) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{date}</p>
          <ul className="mt-2 space-y-1.5">
            {items.map((s) => (
              <li key={s.id} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                {s.text}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

function EmptyProgress({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-card"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
          <TrendingUp className="h-7 w-7 text-brand-600" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-slate-900">{title}</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">{message}</p>
        <Button size="lg" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      </motion.div>
    </div>
  );
}