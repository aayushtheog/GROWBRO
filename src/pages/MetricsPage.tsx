import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import {
  DollarSign,
  Users,
  ShoppingCart,
  Percent,
  Heart,
  UserMinus,
  RefreshCw,
} from 'lucide-react';
import { useBusinessStore } from '../store/businessStore';
import { useToastStore } from '../store/toastStore';
import { formatCurrency, formatNumber } from '../lib/format';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/dashboard/StatCard';
import { Button } from '../components/ui/Button';

const CHANNEL_COLORS = ['#3485fb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export function MetricsPage() {
  const store = useBusinessStore();
  const notify = useToastStore((s) => s.notify);
  const m = store.metrics;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Growth Metrics</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Deep dive into {store.profile.businessName}'s performance.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => notify({ type: 'info', title: 'Metrics refreshed', description: 'Demo data updated.' })}>
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        <StatCard label="Revenue" value={formatCurrency(m.revenue, true)} delta={m.revenueGrowthPct} icon={DollarSign} tone="brand" />
        <StatCard label="Customers" value={formatNumber(m.customers)} delta={m.customerGrowthPct} icon={Users} tone="accent" />
        <StatCard label="Avg. Order Value" value={formatCurrency(m.avgOrderValue)} icon={ShoppingCart} tone="violet" />
        <StatCard label="Conversion Rate" value={`${m.conversionRate}%`} icon={Percent} tone="amber" />
        <StatCard label="Net Promoter Score" value={String(m.netPromoterScore)} icon={Heart} tone="brand" deltaLabel="/ 100" />
        <StatCard label="Churn Rate" value={`${m.churnRate}%`} icon={UserMinus} tone="amber" deltaLabel="monthly" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue Growth" description="Monthly trend" action={<Badge tone="success">Growing</Badge>} />
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={store.monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3485fb" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#3485fb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
                <Tooltip
                  formatter={(v: number | string, n: string) =>
                    n === 'revenue' ? [formatCurrency(Number(v)), 'Revenue'] : [v, n]
                  }
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3485fb" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Customer Channels" description="Where customers come from" />
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={store.channels}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {store.channels.map((_, i) => (
                    <Cell key={i} fill={CHANNEL_COLORS[i % CHANNEL_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {store.channels.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: CHANNEL_COLORS[i % CHANNEL_COLORS.length] }} />
                    {c.name}
                  </span>
                  <span className="font-semibold text-slate-800">{c.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Orders per Month" description="Transaction volume trend" />
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={store.monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip
                formatter={(v: number | string) => [formatNumber(Number(v)), 'Orders']}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              <Bar dataKey="orders" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={46} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
