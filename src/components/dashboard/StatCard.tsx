import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  icon: LucideIcon;
  tone?: 'brand' | 'accent' | 'amber' | 'violet';
}

const tones: Record<string, string> = {
  brand: 'from-brand-500 to-brand-600',
  accent: 'from-emerald-400 to-emerald-600',
  amber: 'from-amber-400 to-amber-500',
  violet: 'from-violet-400 to-violet-600',
};

export function StatCard({ label, value, delta, deltaLabel = 'vs last month', icon: Icon, tone = 'brand' }: StatCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Card className="relative overflow-hidden p-5">
      <div
        className={`absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[tone]} opacity-[0.08]`}
      />
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tones[tone]} text-white shadow-card`}>
          <Icon className="h-5 w-5" />
        </div>
        {delta !== undefined && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {positive ? '+' : ''}
            {delta.toFixed(1)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">{value}</p>
        {delta !== undefined && (
          <p className="mt-1 text-xs text-slate-400">{deltaLabel}</p>
        )}
      </div>
    </Card>
  );
}
