import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCcw, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useBusinessStore } from '../store/businessStore';
import { createGrowthPlan } from '../lib/plan';
import { CASE_STUDIES } from '../data/content';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ObjectiveCard } from '../components/plan/ObjectiveCard';
import { StrategyCard } from '../components/plan/StrategyCard';
import { InlineLoader } from '../components/ui/Spinner';

const EXAMPLES = [
  "I don't get enough customers.",
  "My customers don't come back.",
  'My sales are falling.',
  'My profit margin is too low.',
  "I don't know how to market my business.",
];

export function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const store = useBusinessStore();

  // What summary + objective to show right after generating (in-memory), so the
  // Home view transitions smoothly before the store persists everything.
  const [problemText, setProblemText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const hasPlan = !!store.plan;
  const selected = store.selectedStrategyId;
  const doneSteps = store.planSteps.filter((s) => s.done).length;
  const pct = store.planSteps.length ? Math.round((doneSteps / store.planSteps.length) * 100) : 0;

  const name = currentUser?.name?.split(' ')[0] ?? 'there';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = problemText.trim();
    if (!text || submitting) return;
    setSubmitting(true);
    // Small delay so the loading state feels natural.
    setTimeout(() => {
      const plan = createGrowthPlan(text, store.profile);
      store.startGrowthPlan(plan.objective, plan.strategies);
      setProblemText('');
      setSubmitting(false);
    }, 350);
  };

  // No plan yet — ask the one big question.
  if (!hasPlan) {
    return (
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Welcome back, {name} 👋
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            What problem are you facing in your business?
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
            Tell GrowBro what's getting in the way — in your own words. I'll help you turn it
            into a clear goal and practical strategies.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          onSubmit={handleSubmit}
          className="mt-8"
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-card sm:p-6">
            <textarea
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              rows={4}
              autoFocus
              placeholder="e.g. I don't get enough customers — we get a few walk-ins but nothing consistent…"
              className="w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <Button
              type="submit"
              size="lg"
              className="mt-4 w-full text-base"
              disabled={!problemText.trim() || submitting}
            >
              {submitting ? (
                <InlineLoader label="Building your plan…" />
              ) : (
                <>
                  <Sparkles className="h-5 w-5" /> Show me how to grow
                </>
              )}
            </Button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mt-6"
        >
          <p className="text-center text-xs font-medium uppercase tracking-wide text-slate-400">
            Or start with an example
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setProblemText(ex)}
                className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100"
              >
                {ex}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // A plan exists — show the objective + strategy selection.
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Hi {name} — your growth plan
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            What do you want to focus on?
          </h1>
        </div>
        <button
          onClick={() => store.resetGrowth()}
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
        >
          <RefreshCcw className="h-4 w-4" /> Start a new problem
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <ObjectiveCard objective={store.plan} />

        {/* Small progress strip when a strategy is active */}
        {store.planSteps.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-700">Plan progress</span>
              <span className="font-bold text-brand-700">{pct}%</span>
            </div>
            <ProgressBar value={pct} className="mt-2" />
            <button
              onClick={() => navigate('/plan')}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
            >
              Open my step-by-step plan <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div>
          <h2 className="text-lg font-bold text-slate-900">Choose a strategy to start with</h2>
          <p className="mt-1 text-sm text-slate-500">
            Pick one that feels right. GrowBro will turn it into a simple step-by-step plan.
          </p>

          {submitting ? (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <InlineLoader label="Analysing your problem…" />
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4">
              {store.strategies.map((strategy) => {
                const study = CASE_STUDIES.find((c) => c.id === strategy.caseStudyId);
                const isSelected = selected === strategy.id;
                return (
                  <StrategyCard
                    key={strategy.id}
                    strategy={strategy}
                    caseStudy={study}
                    selected={isSelected}
                    cta={
                      isSelected ? (
                        <Button
                          size="md"
                          className="w-full"
                          onClick={() => navigate('/plan')}
                        >
                          <Check className="h-4 w-4" /> View my plan
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="md"
                          className="w-full"
                          onClick={() => {
                            store.selectStrategy(strategy.id);
                            navigate('/plan');
                          }}
                        >
                          Choose this strategy <ArrowRight className="h-4 w-4" />
                        </Button>
                      )
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
