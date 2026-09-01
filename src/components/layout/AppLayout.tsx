import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, ListChecks, TrendingUp, BookOpen, Bot, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Logo } from './Logo';
import { Toasts } from './Toast';

// Minimal, beginner-friendly navigation. No analytics clutter.
const NAV = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/plan', label: 'My Plan', icon: ListChecks },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/cases', label: 'Case Studies', icon: BookOpen },
  { to: '/chat', label: 'GrowBro Chat', icon: Bot },
];

export function AppLayout() {
  const { currentUser, signOut } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => {
              signOut();
              navigate('/login', { replace: true });
            }}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title={`Sign out (${currentUser?.email ?? ''})`}
          >
            <span className="hidden h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white sm:flex">
              {initials(currentUser?.name)}
            </span>
            <LogOut className="h-4 w-4 sm:hidden" />
            <span className="hidden lg:inline">Sign out</span>
          </button>
        </div>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 md:hidden">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200/70 py-6">
        <p className="text-center text-xs text-slate-400">
          GrowBro — a simple business-growth coach. Advice is general guidance, not
          financial, legal, or tax advice.
        </p>
      </footer>

      <Toasts />
    </div>
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
