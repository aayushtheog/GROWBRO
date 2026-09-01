import { TrendingUp, Building2, CheckCircle2, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { CaseStudy } from '../../types';

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Card hover className="flex flex-col overflow-hidden">
      <CardContent className="flex flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between gap-2">
          <Badge tone="neutral">
            <Building2 className="h-3 w-3" /> {study.industry}
          </Badge>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
            <TrendingUp className="h-3 w-3" />
            {study.metric}
          </span>
        </div>

        <h4 className="text-sm font-bold text-slate-900">{study.title}</h4>

        <div className="mt-3 space-y-3 text-sm">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-rose-500">
              <Lightbulb className="h-3.5 w-3.5" /> Challenge
            </p>
            <p className="mt-1 text-slate-600">{study.challenge}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> GrowBro solution
            </p>
            <p className="mt-1 text-slate-600">{study.solution}</p>
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
