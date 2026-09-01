import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, TrendingUp, Users, UserPlus, ShoppingCart, DollarSign, Percent } from 'lucide-react';
import type { DailyMetricLog } from '../../types';
import { Button } from '../ui/Button';

const EMPTY = { customers: 0, leads: 0, sales: 0, revenue: 0, conversionRate: 0 };

export function DailyMetricTracker({
  day,
  logs,
  onLog,
  onRemove,
}: {
  day: number;
  logs: DailyMetricLog[];
  onLog: (log: Omit<DailyMetricLog, 'id'>) => void;
  onRemove: (id: string) => void;
}) {
  const [form, setForm] = useState({ ...EMPTY });

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: Number(e.target.value) || 0 }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onLog({ day, dateLabel: `Day ${day}`, ...form });
    setForm({ ...EMPTY });
  };

  return (
    <div>
      <form onSubmit={submit} className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <MetricInput icon={Users} label="Customers" value={form.customers} onChange={set('customers')} />
        <MetricInput icon={UserPlus} label="Leads" value={form.leads} onChange={set('leads')} />
        <MetricInput icon={ShoppingCart} label="Sales" value={form.sales} onChange={set('sales')} />
        <MetricInput icon={DollarSign} label="Revenue" value={form.revenue} onChange={set('revenue')} />
        <div className="col-span-2 flex items-end gap-2 sm:col-span-1">
          <MetricInput icon={Percent} label="Conv. %" value={form.conversionRate} onChange={set('conversionRate')} step="0.1" />
        </div>
        <Button type="submit" size="md" className="col-span-2 sm:col-span-5">
          <Plus className="h-4 w-4" /> Log Day {day} metrics
        </Button>
      </form>

      {logs.length > 0 && <DailyMetricHistory logs={logs} onRemove={onRemove} />}
    </div>
  );
}

function MetricInput({
  icon: Icon,
  label,
  value,
  onChange,
  step = '1',
}: {
  icon: typeof Users;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
        <Icon className="h-3.5 w-3.5 text-brand-500" /> {label}
      </span>
      <input
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={onChange}
        className="h-10 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
    </label>
  );
}

function DailyMetricHistory({
  logs,
  onRemove,
}: {
  logs: DailyMetricLog[];
  onRemove: (id: string) => void;
}) {
  const rows = [...logs].sort((a, b) => b.day - a.day);
  return (
    <div className="mt-4">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <TrendingUp className="h-3.5 w-3.5" /> Growth log so far
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Day</th>
              <th className="px-3 py-2">Cust.</th>
              <th className="px-3 py-2">Leads</th>
              <th className="px-3 py-2">Sales</th>
              <th className="px-3 py-2">Revenue</th>
              <th className="px-3 py-2">Conv.</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-slate-100">
                <td className="px-3 py-2 font-semibold text-slate-800">{r.day}</td>
                <td className="px-3 py-2 text-slate-600">{r.customers}</td>
                <td className="px-3 py-2 text-slate-600">{r.leads}</td>
                <td className="px-3 py-2 text-slate-600">{r.sales}</td>
                <td className="px-3 py-2 text-slate-600">${r.revenue.toLocaleString()}</td>
                <td className="px-3 py-2 text-slate-600">{r.conversionRate}%</td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => onRemove(r.id)}
                    className="text-slate-300 transition-colors hover:text-rose-500"
                    aria-label="Remove metric"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
