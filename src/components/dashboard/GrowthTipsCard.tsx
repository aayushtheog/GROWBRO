import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { GROWTH_TIPS } from '../../data/content';

export function GrowthTipsCard() {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Growth Tricks & Tips</h3>
        </div>
        {GROWTH_TIPS.slice(0, 4).map((tip) => (
          <div key={tip.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-slate-800">{tip.title}</h4>
              <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                {tip.tag}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{tip.body}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
