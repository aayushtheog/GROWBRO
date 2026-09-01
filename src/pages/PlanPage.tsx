import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight, ListChecks } from 'lucide-react';
import { useBusinessStore } from '../store/businessStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ObjectiveCard } from '../components/plan/ObjectiveCard';

export function PlanPage() {
  const navigate = useNavigate();
  const store = useBusinessStore();

  if (!store.plan) {
    return (
      <EmptyPlan
        title="No plan yet"
        message="Tell GrowBro the problem you're facing and you'll get a clear step-by-step plan."
        actionLabel="Describe my problem"
        onAction={() => navigate('/home')}
      />
    );
  }

  const strategy = store.strategies.find((s) => s.id === store.selectedStrategyId);

  if (!strategy || store.planSteps.length === 0) {
    return (
      <EmptyPlan
        title="Pick a strategy to start"
        message="You have a clear objective. Choose one strategy and GrowBro will turn it into simple steps."
        actionLabel="Choose a strategy"
        onAction={() => navigate('/home')}
      />
    );
  }

  const done = store.planSteps.filter((s) => s.done).length;
  const pct = Math.round((done / store.planSteps.length) * 100);
  const nextStep = store.planSteps.find((s) => !s.done);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">My Plan</p>
      <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
        Your step-by-step plan
      </h1>

      <div className="mt-6 space-y-5">
        <ObjectiveCard objective={store.plan} compact />

        <div className="rounded-2xl border border-slate-200 bg-white shadow-card">
          <div className="border-b border-slate-100 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Strategy — {strategy.category}
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">{strategy.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{strategy.summary}</p>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-700">
                {done} of {store.planSteps.length} steps done
              </span>
              <span className="font-bold text-brand-700">{pct}%</span>
            </div>
            <ProgressBar value={pct} className="mt-2" />

            <p className="mt-5 mb-3 flex items-center gap-2 text-sm text-slate-500">
              <ListChecks className="h-4 w-4 text-brand-500" />
              Tap a step to mark it complete.
            </p>

            <ol className="space-y-2">
              {store.planSteps.map((step, i) => (
                <li key={step.id}>
                  <button
                    onClick={() => store.togglePlanStep(step.id)}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
                      step.done
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50'
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="mt-0.5 h-6 w-6 shrink-0 text-slate-300" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Step {i + 1}
                      </span>
                      <span
                        className={`mt-0.5 block text-base font-medium ${
                          step.done ? 'text-slate-400 line-through' : 'text-slate-800'
                        }`}
                      >
                        {step.text}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {nextStep ? 'Ready for your next step?' : 'Plan complete — great work! 🎉'}
            </p>
            <p className="mt-0.5 text-sm text-slate-600">
              {nextStep
                ? `Today's move: ${nextStep.text}`
                : 'See your overall progress and history.'}
            </p>
          </div>
          <Button onClick={() => navigate('/progress')}>
            View progress <ArrowRight className="h-4 w-4" />
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
