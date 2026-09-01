import { motion } from 'framer-motion';
import {
  Boxes,
  ShoppingBag,
  ShoppingCart,
  Store,
  Rocket,
  Briefcase,
  UserCheck,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { BUSINESS_TYPES } from '../../data/businessTypes';
import { Button } from '../ui/Button';

const ICONS: Record<string, typeof Boxes> = {
  Boxes,
  ShoppingBag,
  ShoppingCart,
  Store,
  Rocket,
  Briefcase,
  UserCheck,
  Sparkles,
};

export function BusinessTypeSelect({
  onSelect,
  value,
}: {
  onSelect: (id: string) => void;
  value: string | null;
}) {
  const [selected, setSelected] = useState<string | null>(value);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Step 1 of 3 · Your business
        </p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
          What type of business do you run?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
          Pick the closest fit. GrowBro will personalize every recommendation to your
          business type — so the advice fits, not just any advice.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BUSINESS_TYPES.map((type, i) => {
          const Icon = ICONS[type.icon] ?? Sparkles;
          const active = selected === type.id;
          return (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelected(type.id)}
              className={`relative flex flex-col items-start gap-3 rounded-2xl border bg-white p-5 text-left shadow-card transition-all hover:shadow-cardhover ${
                active
                  ? 'border-brand-400 ring-2 ring-brand-100'
                  : 'border-slate-200 hover:border-brand-200'
              }`}
            >
              {active && (
                <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check className="h-4 w-4" />
                </span>
              )}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">
                  <span className="mr-1.5">{type.emoji}</span>
                  {type.label}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-slate-500">{type.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <Button size="lg" disabled={!selected} onClick={() => selected && onSelect(selected)}>
          Continue <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
}
