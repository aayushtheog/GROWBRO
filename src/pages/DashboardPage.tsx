import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Users,
  ShoppingCart,
  Percent,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Target,
  FolderOpen,
  Lightbulb,
  Wand2,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useBusinessStore } from '../store/businessStore';
import { useToastStore } from '../store/toastStore';
import { analyzeBusiness } from '../lib/businessLogic';
import { formatCurrency, formatNumber } from '../lib/format';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { TextInput, TextArea, Field } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/dashboard/StatCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { ProblemListView } from '../components/dashboard/ProblemListView';
import { StrategyCard } from '../components/dashboard/StrategyCard';
import { CaseStudyCard } from '../components/dashboard/CaseStudyCard';
import { GrowthTipsCard } from '../components/dashboard/GrowthTipsCard';
import { CASE_STUDIES } from '../data/content';
import { useNavigate } from 'react-router-dom';

type Tab = 'strategies' | 'cases' | 'tips';

export function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const store = useBusinessStore();
  const notify = useToastStore((s) => s.notify);

  const analysis = useMemo(() => analyzeBusiness(store.profile), [store.profile]);
  const [tab, setTab] = useState<Tab>('strategies');

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Greeting + actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome back, {currentUser?.name.split(' ')[0] ?? 'there'} 👋
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Here's how to grow {store.profile.businessName || 'your business'} today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              store.refreshMetrics();
              notify({ type: 'info', title: 'Metrics refreshed', description: 'Demo data updated.' });
            }}
          >
            <RefreshCw className="h-4 w-4" /> Refresh metrics
          </Button>
          <Button onClick={() => navigate('/chat')}>
            <Sparkles className="h-4 w-4" /> Ask the AI advisor
          </Button>
        </div>
      </div>

      {/* Personalized recommendation banner */}
      <RecommendationBanner />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Monthly Revenue"
          value={formatCurrency(store.metrics.revenue, true)}
          delta={store.metrics.revenueGrowthPct}
          icon={DollarSign}
          tone="brand"
        />
        <StatCard
          label="Active Customers"
          value={formatNumber(store.metrics.customers)}
          delta={store.metrics.customerGrowthPct}
          icon={Users}
          tone="accent"
        />
        <StatCard
          label="Avg. Order Value"
          value={formatCurrency(store.metrics.avgOrderValue)}
          icon={ShoppingCart}
          tone="violet"
          deltaLabel="per order"
        />
        <StatCard
          label="Conversion Rate"
          value={`${store.metrics.conversionRate}%`}
          icon={Percent}
          tone="amber"
          deltaLabel="visits → orders"
        />
      </div>

      {/* Revenue chart + profile */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Revenue & Orders Trend"
            description="Last 6 months of performance"
            action={<Badge tone="success">On the up</Badge>}
          />
          <CardContent>
            <RevenueChart data={store.monthly} />
          </CardContent>
        </Card>

        <ProfileCard />
      </div>

      {/* Solutions + problems */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Your Growth Playbook" description="Personalized strategies & inspiration" />
            <Tabs tab={tab} onChange={setTab} />
            <CardContent>
              {tab === 'strategies' && (
                analysis.strategies.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                    {analysis.strategies.map((s, i) => (
                      <StrategyCard key={s.id} strategy={s} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-sm text-slate-500">
                    Add your business profile to generate strategies.
                  </div>
                )
              )}
              {tab === 'cases' && (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {CASE_STUDIES.map((cs) => (
                    <CaseStudyCard key={cs.id} study={cs} />
                  ))}
                </div>
              )}
              {tab === 'tips' && <GrowthTipsCard />}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <ProblemListView problems={analysis.problems} />
          <ProgressCard />
        </div>
      </div>
    </div>
  );
}

function RecommendationBanner() {
  const store = useBusinessStore();
  const navigate = useNavigate();
  const analysis = useMemo(() => analyzeBusiness(store.profile), [store.profile]);
  const top = analysis.strategies[0];

  if (!top) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-white shadow-cardhover"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
          <Wand2 className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-100">
            <Sparkles className="h-3.5 w-3.5" /> Personalized for you
          </p>
          <h3 className="mt-1 text-lg font-bold">{top.title}</h3>
          <p className="mt-0.5 text-sm text-brand-50">{top.summary}</p>
        </div>
        <Button
          onClick={() => navigate('/chat')}
          className="shrink-0 bg-white text-brand-700 hover:bg-brand-50"
        >
          Start now <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function Tabs({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const items: { key: Tab; label: string; icon: typeof Target }[] = [
    { key: 'strategies', label: 'Strategies', icon: Target },
    { key: 'cases', label: 'Case Studies', icon: FolderOpen },
    { key: 'tips', label: 'Growth Tips', icon: Lightbulb },
  ];
  return (
    <div className="flex gap-1 border-b border-slate-100 px-5 pb-0">
      {items.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
            tab === key
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

function ProfileCard() {
  const store = useBusinessStore();
  const notify = useToastStore((s) => s.notify);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(store.profile);

  const set = (k: keyof typeof draft) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setDraft((d) => ({ ...d, [k]: e.target.value }));

  const save = (e: FormEvent) => {
    e.preventDefault();
    store.updateProfile(draft);
    setEditing(false);
    notify({ type: 'success', title: 'Profile saved', description: 'Recommendations updated.' });
  };

  if (!editing) {
    return (
      <Card>
        <CardHeader
          title="Business Profile"
          description="The context behind your recommendations"
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDraft(store.profile);
                setEditing(true);
              }}
            >
              Edit
            </Button>
          }
        />
        <CardContent className="space-y-2 text-sm">
          <Detail label="Industry" value={store.profile.industry} />
          <Detail label="Goals" value={store.profile.goals} />
          <Detail label="Target customers" value={store.profile.targetCustomers} />
          <Detail label="Situation" value={store.profile.currentSituation} />
          <Detail label="Known problems" value={store.profile.problems} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="Edit Business Profile" description="What drives your recommendations" />
      <form onSubmit={save} className="space-y-3 p-5">
        <Field label="Business name">
          <TextInput value={draft.businessName} onChange={set('businessName')} />
        </Field>
        <Field label="Industry">
          <TextInput value={draft.industry} onChange={set('industry')} placeholder="e.g. Retail, SaaS, F&B" />
        </Field>
        <Field label="Growth goals">
          <TextArea value={draft.goals} onChange={set('goals')} placeholder="What do you want to achieve?" />
        </Field>
        <Field label="Target customers">
          <TextArea value={draft.targetCustomers} onChange={set('targetCustomers')} placeholder="Who do you serve?" />
        </Field>
        <Field label="Current situation">
          <TextArea value={draft.currentSituation} onChange={set('currentSituation')} placeholder="What's happening now?" />
        </Field>
        <Field label="Known problems" hint="Separate each with a comma.">
          <TextArea value={draft.problems} onChange={set('problems')} placeholder="e.g. low repeat customers, thin margins" />
        </Field>
        <div className="flex gap-2 pt-1">
          <Button type="submit">Save & re-analyze</Button>
          <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm text-slate-700">{value}</p>
    </div>
  );
}

function ProgressCard() {
  const store = useBusinessStore();
  const notify = useToastStore((s) => s.notify);
  const [newTitle, setNewTitle] = useState('');
  const done = store.milestones.filter((m) => m.done).length;
  const pct = store.milestones.length ? Math.round((done / store.milestones.length) * 100) : 0;

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    store.addMilestone(newTitle.trim());
    setNewTitle('');
    notify({ type: 'info', title: 'Milestone added' });
  };

  return (
    <Card>
      <CardHeader title="Progress Tracker" description="Track your growth milestones" />
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">Overall progress</span>
            <span className="font-bold text-brand-700">{pct}%</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600"
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 80 }}
            />
          </div>
        </div>

        <form onSubmit={add} className="flex gap-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a milestone…"
            className="h-9 flex-1 rounded-lg border border-slate-300 px-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <Button size="sm" type="submit" variant="secondary">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <ul className="space-y-2">
          {store.milestones.map((m) => (
            <li key={m.id} className="group flex items-start gap-2.5">
              <button onClick={() => store.toggleMilestone(m.id)} aria-label="Toggle milestone">
                {m.done ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 text-slate-300 hover:text-slate-400" />
                )}
              </button>
              <span
                className={`flex-1 text-sm ${
                  m.done ? 'text-slate-400 line-through' : 'text-slate-700'
                }`}
              >
                {m.title}
              </span>
              <button
                onClick={() => store.removeMilestone(m.id)}
                className="text-slate-300 opacity-0 transition-opacity hover:text-rose-500 group-hover:opacity-100"
                aria-label="Remove milestone"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
