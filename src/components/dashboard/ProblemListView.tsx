import { AlertTriangle, Target, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge, toneForSeverity } from '../ui/Badge';
import type { BusinessProblem } from '../../types';

export function ProblemListView({ problems }: { problems: BusinessProblem[] }) {
  return (
    <Card>
      <CardHeader
        title="Identified Problems"
        description="Auto-detected from your business profile"
        action={<Badge tone="brand">{problems.length} found</Badge>}
      />
      <CardContent className="space-y-3">
        {problems.length === 0 && (
          <p className="py-4 text-sm text-slate-500">
            We haven't detected clear problems yet. Add more detail to your profile and re-run
            the analysis.
          </p>
        )}
        {problems.map((p) => (
          <div
            key={p.id}
            className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5"
          >
            <div className="mt-0.5 shrink-0">
              {p.source === 'stated' ? (
                <Quote className="h-5 w-5 text-brand-500" />
              ) : p.source === 'inferred' ? (
                <Target className="h-5 w-5 text-slate-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-semibold text-slate-800">
                  {p.source === 'stated' ? 'Stated — ' : ''}
                  {p.title}
                </h4>
                <Badge tone={toneForSeverity(p.severity)}>{p.severity}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">{p.description}</p>
              {p.evidence && (
                <p className="mt-1.5 text-xs italic text-slate-400">{p.evidence}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
