import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, AlertCircle, MinusCircle } from 'lucide-react';
import type { AttemptHistoryItem as AttemptHistoryItemType } from '@/types';

export default function AttemptHistoryItem({ attempt }: { attempt: AttemptHistoryItemType }) {
  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      color: 'text-dracula-success',
      bg: 'bg-dracula-success/10',
      label: 'Completed',
    },
    failed: {
      icon: AlertCircle,
      color: 'text-dracula-error',
      bg: 'bg-dracula-error/10',
      label: 'Failed',
    },
    evaluating: {
      icon: MinusCircle,
      color: 'text-dracula-warning',
      bg: 'bg-dracula-warning/10',
      label: 'Evaluating',
    },
  } as const;

  const config = statusConfig[attempt.status];
  const StatusIcon = config.icon;

  const scoreColor =
    attempt.score === null
      ? 'text-dracula-foreground/30'
      : attempt.score >= 75
        ? 'text-dracula-success'
        : attempt.score >= 50
          ? 'text-dracula-warning'
          : 'text-dracula-error';

  return (
    <tr className="border-b border-dracula-selection/60 transition-colors hover:bg-dracula-selection/30 last:border-0">
      <td className="px-4 py-4">
        <span className="text-sm font-medium text-dracula-foreground">
          {attempt.problemTitle}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-dracula-foreground/60 tabular-nums">
          {new Date(attempt.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {config.label}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className={`text-sm font-bold tabular-nums ${scoreColor}`}>
          {attempt.score !== null ? `${attempt.score}/${attempt.maxScore}` : '—'}
        </span>
      </td>
      <td className="px-4 py-4 text-right">
        <Link
          to={`/attempts/${attempt.id}/result`}
          className="btn-ghost text-xs"
        >
          View Result
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </td>
    </tr>
  );
}
