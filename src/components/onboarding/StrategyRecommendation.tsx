import { motion } from 'framer-motion';
import { ArrowRight, Check, RefreshCcw } from 'lucide-react';
import { CASE_STUDIES } from '../../data/content';
import { getBusinessTypeLabel } from '../../data/businessTypes';
import type { Strategy } from '../../types';
import { Button } from '../ui/Button';
import { StrategyCard } from '../plan/StrategyCard';

export function StrategyRecommendation({
  problemText,
  businessTypeId,
  strategies,
  selectedId,
  onSelect,
  onViewPlan,
  onRestart,
}: {
  problemText: string;
  businessTypeId: string | null;
  strategies: Strategy[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onViewPlan: () => void;
  onRestart: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Step 3 of 3 · Your strategy
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Your top {strategies.length} strategies
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-500">
            Personalized for a{' '}
            <span className="font-semibold text-slate-700">
              {getBusinessTypeLabel(businessTypeId)}
            </span>{' '}
            facing “{problemText.trim()}”. Pick one to begin your 30-day plan.
          </p>
        </div>
        <button
          onClick={onRestart}
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
        >
          <RefreshCcw className="h-4 w-4" /> Start over
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        {strategies.map((strategy, i) => {
          const study = CASE_STUDIES.find((c) => c.id === strategy.caseStudyId);
          const isSelected = selectedId === strategy.id;
          return (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <StrategyCard
                strategy={strategy}
                caseStudy={study}
                selected={isSelected}
                cta={
                  isSelected ? (
                    <Button size="md" className="w-full" onClick={onViewPlan}>
                      <Check className="h-4 w-4" /> View my 30-day plan
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={() => onSelect(strategy.id)}
                    >
                      Choose this strategy <ArrowRight className="h-4 w-4" />
                    </Button>
                  )
                }
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
