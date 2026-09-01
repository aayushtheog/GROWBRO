import { Loader2 } from 'lucide-react';

export function Spinner({ className = 'h-5 w-5' }: { className?: string }) {
  return <Loader2 className={`animate-spin text-brand-600 ${className}`} />;
}

export function PageLoader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-500">
      <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export function InlineLoader({ label = 'Thinking…' }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
      <span className="flex gap-1">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500 [animation-delay:0.12s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500 [animation-delay:0.24s]" />
      </span>
      {label}
    </div>
  );
}
