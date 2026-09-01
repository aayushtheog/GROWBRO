import { Sprout } from 'lucide-react';

export function Logo({ size = 'md', light = false }: { size?: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const dims = size === 'lg' ? 'h-10 w-10' : size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  const text = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-lg' : 'text-xl';
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${dims} flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card`}
      >
        <Sprout className="h-1/2 w-1/2" />
      </div>
      <span
        className={`${text} font-extrabold tracking-tight ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        Grow<span className="text-brand-600">Bro</span>
      </span>
    </div>
  );
}
