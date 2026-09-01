import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  Bot,
  LogOut,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useBusinessStore } from '../../store/businessStore';
import { Logo } from './Logo';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/metrics', label: 'Metrics', icon: LineChart },
  { to: '/chat', label: 'AI Advisor', icon: Bot },
];

export function Sidebar({ compact = false }: { compact?: boolean }) {
  const { currentUser, signOut } = useAuthStore();
  const profile = useBusinessStore((s) => s.profile);

  return (
    <aside
      className={`flex h-full flex-col border-r border-slate-200 bg-white ${
        compact ? 'w-16' : 'w-64'
      }`}
    >
      <div className={`flex h-16 items-center border-b border-slate-100 px-4 ${compact ? 'justify-center' : ''}`}>
        {compact ? <Logo size="sm" /> : <Logo />}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {!compact && (
          <div className="mb-3 flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2">
            <Sparkles className="h-4 w-4 shrink-0 text-brand-600" />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-brand-800">
                {profile.businessName}
              </p>
              <p className="text-[10px] text-brand-500">Growth workspace</p>
            </div>
          </div>
        )}

        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={compact ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                compact ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!compact && label}
          </NavLink>
        ))}

        {!compact && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-700">Pro Trial</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              You're on the 14-day free trial. Upgrade anytime to unlock unlimited sessions.
            </p>
          </div>
        )}
      </nav>

      <div className="border-t border-slate-100 p-3">
        {compact ? (
          <IconButton
            title="Sign out"
            onClick={signOut}
            icon={<LogOut className="h-5 w-5" />}
          />
        ) : (
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white">
              {initials(currentUser?.name)}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-semibold text-slate-800">
                {currentUser?.name}
              </p>
              <p className="truncate text-xs text-slate-400">{currentUser?.email}</p>
            </div>
            <LogOut className="h-4 w-4 shrink-0 text-slate-400" />
          </button>
        )}
      </div>
    </aside>
  );
}

function initials(name?: string): string {
  if (!name) return 'GB';
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function IconButton({ icon, title, onClick }: { icon: ReactNode; title: string; onClick: () => void }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
    >
      {icon}
    </button>
  );
}
