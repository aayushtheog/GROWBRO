import { motion } from 'framer-motion';
import { ArrowRight, Building2, TrendingUp, Lightbulb, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES } from '../data/content';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function CasesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Case Studies</p>
      <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
        How others grew — and how you can too
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-base text-slate-500">
        Real small businesses, real problems, simple strategies. Each case shows the
        challenge, the solution, the result — and how to apply the lesson to your business.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5">
        {CASE_STUDIES.map((study, i) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <CaseStudyCard study={study} />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">See a pattern?</p>
            <p className="mt-1 text-sm text-slate-600">
              Every business above started with a simple problem, picked ONE strategy,
              and took small consistent steps. You can do the same — tell GrowBro your
              problem and you'll get a clear plan to follow.
            </p>
            <button
              onClick={() => (window.location.href = '/home')}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
            >
              Tell me my problem <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({ study }: { study: typeof CASE_STUDIES[0] }) {
  return (
    <Card hover className="flex flex-col overflow-hidden">
      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <Badge tone="neutral">
            <Building2 className="h-3 w-3" /> {study.industry}
          </Badge>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
            <TrendingUp className="h-3 w-3" />
            {study.metric}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900">{study.title}</h3>

        <div className="mt-4 space-y-4 text-sm">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-rose-500">
              <Lightbulb className="h-3.5 w-3.5" /> The challenge
            </p>
            <p className="mt-1.5 text-slate-600">{study.challenge}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> The GrowBro-style solution
            </p>
            <p className="mt-1.5 text-slate-600">{study.solution}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" /> The result
            </p>
            <p className="mt-1.5 text-slate-600">{study.result}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Lightbulb className="h-3.5 w-3.5" /> The lesson
            </p>
            <p className="mt-1.5 text-sm text-slate-600">{study.lesson}</p>
          </div>
          <div className="rounded-xl bg-brand-50/70 p-3 border border-brand-100">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <ArrowRight className="h-3.5 w-3.5" /> How you could apply it
            </p>
            <p className="mt-1.5 text-sm text-slate-700">{study.apply}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
          {study.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500"
            >
              {t}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}