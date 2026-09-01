import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ListChecks, Calendar, CheckCircle2, Flame } from 'lucide-react';
import { useBusinessStore } from '../store/businessStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ObjectiveCard } from '../components/plan/ObjectiveCard';
import { RoadmapDayRow } from '../components/plan/RoadmapDayRow';
import { groupByPhase } from '../lib/roadmap';

export function PlanPage() {
  const navigate = useNavigate();
  const store = useBusinessStore();

  if (!store.plan) {
    return (
      <EmptyPlan
        title="No plan yet"
        message="Tell GrowBro your business type and the problem you're facing, and you'll get a personalized 30-day plan."
        actionLabel="Start my growth plan"
        onAction={() => navigate('/home')}
      />
    );
  }

  // Plan exists but no strategy selected yet — prompt before showing a roadmap.
  if (!store.selectedStrategyId || store.roadmap.length === 0) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">My Plan</p>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">Set up your plan</h1>
        <div className="mt-6 space-y-5">
          <ObjectiveCard objective={store.plan} compact />
          <EmptyPlan
            title="Pick your strategy to begin"
            message="You have a clear objective. Choose one of your top strategies and GrowBro will build your detailed 30-day roadmap."
            actionLabel="Choose a strategy"
            onAction={() => navigate('/home')}
          />
        </div>
      </div>
    );
  }

  const strategy = store.strategies.find((s) => s.id === store.selectedStrategyId);
  const days = store.roadmap;
  const done = days.filter((d) => d.done).length;
  const total = days.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const remaining = total - done;
  const currentDay = done < total ? done + 1 : total;
  const phases = groupByPhase(days);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">My Plan</p>
      <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
        Your 30-day growth roadmap
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {strategy?.title} · One focused action every day for a month.
      </p>

      <div className="mt-6 space-y-5">
        <ObjectiveCard objective={store.plan} compact />

        {/* Progress overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
                <Calendar className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Day {currentDay} of {total}</p>
                <p className="text-2xl font-extrabold text-slate-900">{pct}% complete</p>
              </div>
            </div>
            <div className="text-right text-sm text-slate-500">
              <p className="font-semibold text-slate-700">{done} / {total} days done</p>
              <p className="text-emerald-700">{remaining} to go</p>
            </div>
          </div>
          <ProgressBar value={pct} className="mt-3 h-3" />
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <Flame className="h-3.5 w-3.5 text-amber-500" /> Check off each day as you complete it.
          </div>
        </div>

        {/* Roadmap grouped by phase */}
        {Array.from(phases.entries()).map(([phase, phaseDays]) => (
          <section key={phase}>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
                {phase}
              </span>
              <h2 className="text-base font-bold text-slate-900">{phaseDays[0].phaseName}</h2>
              <span className="text-xs font-medium text-slate-400">
                {phaseDays.filter((d) => d.done).length}/{phaseDays.length}
              </span>
            </div>
            <div className="space-y-2">
              {phaseDays.map((d) => (
                <RoadmapDayRow
                  key={d.day}
                  day={d}
                  isCurrent={d.day === currentDay && !d.done}
                  onToggle={store.toggleRoadmapDay}
                />
              ))}
            </div>
          </section>
        ))}

        <div className="flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-brand-600" />
            <p className="text-sm font-semibold text-slate-800">
              {remaining === 0 ? 'Month complete — incredible! 🎉' : `Keep going — you're on Day ${currentDay}.`}
            </p>
          </div>
          <Button onClick={() => navigate('/progress')}>
            Track my progress <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmptyPlan({
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
          <ListChecks className="h-7 w-7 text-brand-600" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-slate-900">{title}</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">{message}</p>
        <Button size="lg" className="mt-6" onClick={onAction}>
          {actionLabel} <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
