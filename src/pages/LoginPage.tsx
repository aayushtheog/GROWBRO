import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Users, Lightbulb, Zap } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import { DEMO_CREDENTIALS } from '../data/demoUser';
import { Logo } from '../components/layout/Logo';
import { Button } from '../components/ui/Button';
import { TextInput, Field } from '../components/ui/Input';

type Mode = 'signin' | 'signup';

interface FormState {
  name: string;
  email: string;
  password: string;
}

const FEATURES = [
  { icon: Lightbulb, title: 'Find your problems', text: 'Uncover what’s really holding your business back.' },
  { icon: TrendingUp, title: 'Get growth strategies', text: 'Practical, prioritized moves that actually work.' },
  { icon: Users, title: 'Learn from case studies', text: 'See how businesses like yours grew.' },
  { icon: Zap, title: 'Ask the AI advisor', text: 'Instant answers to any business challenge.' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);
  const signUp = useAuthStore((s) => s.signUp);
  const notify = useToastStore((s) => s.notify);

  const [mode, setMode] = useState<Mode>('signin');
  const [form, setForm] = useState<FormState>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): boolean => {
    const er: Partial<FormState> = {};
    if (mode === 'signup' && form.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      er.email = 'Please enter a valid email address.';
    if (form.password.length < 6) er.password = 'Password must be at least 6 characters.';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    setLoading(true);

    // Simulate a short network round-trip for UX.
    setTimeout(() => {
      const res =
        mode === 'signin'
          ? signIn(form.email, form.password)
          : signUp(form.name, form.email, form.password);

      if (!res.ok) {
        setFormError(res.error ?? 'Something went wrong. Please try again.');
        setLoading(false);
      } else {
        notify({
          type: 'success',
          title: mode === 'signin' ? 'Welcome back!' : 'Account created!',
          description: mode === 'signin' ? 'Loading your dashboard…' : 'Your GrowBro workspace is ready.',
        });
        navigate('/dashboard', { replace: true });
      }
    }, 700);
  };

  const demoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      signIn(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
      notify({ type: 'success', title: 'Signed in with demo account', description: 'Exploring your demo workspace.' });
      navigate('/dashboard', { replace: true });
    }, 500);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left marketing panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-10 text-white lg:flex">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <Logo light />

        <div className="relative">
          <h1 className="text-4xl font-extrabold leading-tight">
            Grow your business with
            <br />
            <span className="text-brand-200">a smarter growth partner.</span>
          </h1>
          <p className="mt-4 max-w-md text-brand-100">
            Identify your business problems, discover practical strategies, and watch your growth
            metrics climb — all in one place.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <Icon className="h-6 w-6 text-brand-200" />
                <p className="mt-2 text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs text-brand-100/80">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative flex items-center gap-2 text-xs text-brand-200">
          <Sparkles className="h-4 w-4" />
          Trusted by 12,000+ growing small businesses
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col items-center justify-center bg-slate-50 px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {mode === 'signin'
                ? 'Sign in to your growth workspace.'
                : 'Start your 14-day free trial — no card required.'}
            </p>

            {/* Tabs */}
            <div className="mt-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
              {(['signin', 'signup'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setFormError('');
                  }}
                  className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                    mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {m === 'signin' ? 'Sign in' : 'Sign up'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === 'signup' && (
                <Field label="Full name" error={errors.name}>
                  <TextInput
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Alex Rivera"
                    invalid={!!errors.name}
                    autoComplete="name"
                  />
                </Field>
              )}

              <Field label="Email address" error={errors.email}>
                <TextInput
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@business.com"
                  invalid={!!errors.email}
                  autoComplete="email"
                />
              </Field>

              <Field label="Password" error={errors.password}>
                <TextInput
                  type="password"
                  value={form.password}
                  onChange={set('password')}
                  placeholder="••••••••"
                  invalid={!!errors.password}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
              </Field>

              {formError && (
                <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                  {formError}
                </p>
              )}

              <Button type="submit" size="lg" loading={loading} className="w-full">
                {mode === 'signin' ? 'Sign in' : 'Create account'}
              </Button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              or
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <Button variant="outline" size="lg" className="w-full" onClick={demoLogin} disabled={loading}>
              <Sparkles className="h-4 w-4 text-brand-600" />
              Explore the demo account
            </Button>
            <p className="mt-3 text-center text-xs text-slate-400">{DEMO_CREDENTIALS.hint}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
