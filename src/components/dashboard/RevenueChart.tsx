import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { formatCurrency } from '../../lib/format';
import type { MonthlyMetric } from '../../types';

export function RevenueChart({ data }: { data: MonthlyMetric[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3485fb" />
            <stop offset="100%" stopColor="#1f66f0" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <Tooltip
          formatter={(value: number | string, name: string) =>
            name === 'revenue' ? [formatCurrency(Number(value)), 'Revenue'] : [value, 'Orders']
          }
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
            fontSize: 13,
          }}
        />
        <Bar dataKey="revenue" fill="url(#barFill)" radius={[6, 6, 0, 0]} maxBarSize={40} />
        <Line
          type="monotone"
          dataKey="orders"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={{ r: 3, fill: '#10b981' }}
          name="Orders"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
