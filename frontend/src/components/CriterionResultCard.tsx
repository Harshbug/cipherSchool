import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import type { CriterionResult } from '@/types';

export default function CriterionResultCard({ criterion }: { criterion: CriterionResult }) {
  const percentage = (criterion.score / criterion.maxScore) * 100;
  const isHighScore = percentage >= 75;
  const isMidScore = percentage >= 50 && percentage < 75;

  const scoreColor = isHighScore
    ? 'text-dracula-success'
    : isMidScore
      ? 'text-dracula-warning'
      : 'text-dracula-error';

  const barColor = isHighScore
    ? 'bg-dracula-success'
    : isMidScore
      ? 'bg-dracula-warning'
      : 'bg-dracula-error';

  return (
    <div className="card p-5 transition-all hover:border-dracula-current-line/60">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h4 className="text-sm font-semibold text-dracula-foreground leading-snug">
          {criterion.name}
        </h4>
        <div className="flex items-baseline gap-1 whitespace-nowrap">
          <span className={`text-lg font-bold tabular-nums ${scoreColor}`}>
            {criterion.score}
          </span>
          <span className="text-xs text-dracula-foreground/40 font-medium tabular-nums">
            / {criterion.maxScore}
          </span>
        </div>
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-dracula-bg/60">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="space-y-3">
        <div className="flex gap-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-dracula-success" />
          <div>
            <p className="text-xs font-medium text-dracula-success mb-0.5">Evidence</p>
            <p className="text-xs leading-relaxed text-dracula-foreground/70">
              {criterion.evidence}
            </p>
          </div>
        </div>

        <div className="flex gap-2.5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-dracula-warning" />
          <div>
            <p className="text-xs font-medium text-dracula-warning mb-0.5">Concern</p>
            <p className="text-xs leading-relaxed text-dracula-foreground/70">
              {criterion.concern}
            </p>
          </div>
        </div>

        <div className="flex gap-2.5">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-dracula-accent" />
          <div>
            <p className="text-xs font-medium text-dracula-accent mb-0.5">Suggestion</p>
            <p className="text-xs leading-relaxed text-dracula-foreground/70">
              {criterion.suggestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
