import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ListChecks, Target, Calendar, TrendingUp, RotateCcw, Flag } from 'lucide-react';
import { useBusinessStore } from '../store/businessStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ObjectiveCard } from '../components/plan/ObjectiveCard';
import { DailyMetricTracker } from '../components/plan/DailyMetricTracker';
import { format } from 'date-fns';

export function ProgressPage() {
  const navigate = useNavigate();
  const store = useBusinessStore();

  if (!store.plan) {
    return (
      <EmptyProgress
        title="No progress to show yet"
        message="Start by telling GrowBro your business type and the problem you're facing. You'll get a 30-day plan to track day by day."
        actionLabel="Start my growth plan"
        onAction={() => navigate('/home')}
      />
    );
  }

  // Plan exists but the user hasn't picked a strategy yet.
  if (!store.selectedStrategyId || store.roadmap.length === 0) {
    return (
      <EmptyProgress
        title="Pick your strategy to start tracking"
        message="Choose one of your top strategies and GrowBro will build a 30-day roadmap you can track here."
        actionLabel="Choose a strategy"
        onAction={() => navigate('/home')}
      />
    );
  }

  const days = store.roadmap;
  const done = days.filter((d) => d.done).length;
  const total = days.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const remaining = total - done;
  const currentDay = done < total ? done + 1 : total;
  const nextDay = days.find((d) => !d.done);
  const completedToday = useMemo(() => daysCompletedToday(days), [days]);

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
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Day {currentDay} · Today's focus
              </p>
              <p className="text-sm font-medium text-slate-800">
                {nextDay ? nextDay.task : 'All 30 days complete — incredible! 🎉'}
              </p>
            </div>
          </div>
        </div>

        {/* Big progress card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
                <TrendingUp className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">30-day progress</p>
                <p className="text-3xl font-extrabold text-slate-900">{pct}%</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-extrabold text-slate-900">{done}<span className="text-sm font-semibold text-slate-400">/{total}</span></p>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Days done</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-brand-700">{currentDay}</p>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Current day</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-emerald-600">{remaining}</p>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">To go</p>
              </div>
            </div>
          </div>
          <ProgressBar value={pct} className="mt-4 h-4" />
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Day 1</span>
            <span>Day {total}</span>
          </div>
          {completedToday > 0 && (
            <p className="mt-2 text-xs font-medium text-emerald-700">
              ✓ {completedToday} task{completedToday > 1 ? 's' : ''} completed today
            </p>
          )}
        </div>

        {/* Daily metrics */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
              <Flag className="h-4 w-4" /> Daily metrics
            </p>
            <span className="text-xs text-slate-400">Track customers, leads, sales &amp; revenue</span>
          </div>
          <DailyMetricTracker
            day={currentDay}
            logs={store.dailyMetrics}
            onLog={store.logDailyMetric}
            onRemove={store.removeDailyMetric}
          />
        </div>

        {/* Daily history */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
              <Calendar className="h-4 w-4" /> Daily progress history
            </p>
            {days.some((d) => d.doneAt) && (
              <Button variant="ghost" size="sm" onClick={() => navigate('/plan')}>
                <RotateCcw className="h-4 w-4" /> View roadmap
              </Button>
            )}
          </div>
          <div className="mt-4">{renderDailyHistory(days)}</div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" className="flex-1" onClick={() => navigate('/plan')}>
            <ListChecks className="h-4 w-4" /> View my roadmap
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => navigate('/home')}>
            Start a new plan
          </Button>
        </div>
      </div>
    </div>
  );
}

function daysCompletedToday(days: { done: boolean; doneAt?: number }[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const from = today.getTime();
  const to = from + 24 * 60 * 60 * 1000;
  return days.filter((d) => d.done && d.doneAt && d.doneAt >= from && d.doneAt < to).length;
}

function renderDailyHistory(days: { id?: string; day: number; task: string; done: boolean; doneAt?: number }[]) {
  const doneDays = days.filter((d) => d.done && d.doneAt).sort((a, b) => (b.doneAt ?? 0) - (a.doneAt ?? 0));

  if (doneDays.length === 0) {
    return (
      <div className="py-6 text-center text-slate-500">
        <p className="text-sm">No days completed yet.</p>
        <p className="mt-1 text-xs">Complete a day on your roadmap to see it here.</p>
      </div>
    );
  }

  const byDate = new Map<string, typeof doneDays>();
  for (const d of doneDays) {
    if (!d.doneAt) continue;
    const date = format(new Date(d.doneAt), 'EEE, MMM d');
    const arr = byDate.get(date) ?? [];
    arr.push(d);
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
            {items.map((d) => (
              <li key={d.id ?? d.day} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span className="font-semibold text-slate-500">Day {d.day}</span> {d.task}
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
