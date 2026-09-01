import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getBusinessType } from '../../data/businessTypes';
import { Button } from '../ui/Button';
import { InlineLoader } from '../ui/Spinner';

const EXAMPLES = [
  "I don't get enough customers.",
  "My customers don't come back.",
  'My sales are falling.',
  'My profit margin is too low.',
  "I don't know how to market my business.",
];

export function ProblemDescribe({
  businessTypeId,
  onBack,
  onSubmit,
  submitting,
}: {
  businessTypeId: string | null;
  onBack: () => void;
  onSubmit: (text: string) => void;
  submitting: boolean;
}) {
  const [problemText, setProblemText] = useState('');
  const type = getBusinessType(businessTypeId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = problemText.trim();
    if (!text || submitting) return;
    onSubmit(text);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Step 2 of 3 · Your challenge
        </p>
        {type && (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 ring-1 ring-brand-200">
            {type.emoji} {type.label}
          </span>
        )}
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
          What problem is your business currently facing?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
          Describe it in your own words. We'll combine your business type and this problem
          to find the strategies most likely to work for you.
        </p>
      </div>

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
                <Sparkles className="h-5 w-5" /> Get my top 5 strategies
              </>
            )}
          </Button>
        </div>
      </motion.form>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" /> Change business type
        </button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
          <p className="text-center text-xs font-medium uppercase tracking-wide text-slate-400">
            Or start with an example
          </p>
          <div className="mt-2 flex flex-wrap justify-end gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setProblemText(ex)}
                className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100"
              >
                <CheckCircle2 className="h-3 w-3" />
                {ex}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
