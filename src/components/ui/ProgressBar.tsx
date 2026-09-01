import { motion } from 'framer-motion';

export function ProgressBar({
  value,
  className = '',
  barClassName = '',
}: {
  value: number; // 0..100
  className?: string;
  barClassName?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`h-3 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 ${barClassName}`}
        initial={false}
        animate={{ width: `${clamped}%` }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
      />
    </div>
  );
}
