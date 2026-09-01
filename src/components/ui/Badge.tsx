import type { ReactNode } from 'react';

type Tone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral' | 'accent';

const tones: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  danger: 'bg-rose-50 text-rose-700 ring-rose-200',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-200',
  accent: 'bg-teal-50 text-teal-700 ring-teal-200',
};

export function toneForSeverity(s: 'high' | 'medium' | 'low'): Tone {
  return s === 'high' ? 'danger' : s === 'medium' ? 'warning' : 'success';
}

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
