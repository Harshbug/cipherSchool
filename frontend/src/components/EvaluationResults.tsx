import { TrendingUp, Award, CheckCircle2, AlertCircle, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import CriterionResultCard from '@/components/CriterionResultCard';
import { FullPageSpinner } from '@/components/LoadingSpinner';
import type { EvaluationResult } from '@/types';

export default function EvaluationResults({ result }: { result: EvaluationResult }) {
  if (result.status === 'evaluating') {
    return <FullPageSpinner message="AI is evaluating your submission..." />;
  }

  if (result.status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="card max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-dracula-error/10 border border-dracula-error/30">
            <AlertCircle className="h-7 w-7 text-dracula-error" />
          </div>
          <h2 className="text-lg font-semibold text-dracula-foreground mb-2">
            Evaluation Failed
          </h2>
          <p className="text-sm text-dracula-foreground/50 mb-6 leading-relaxed">
            We couldn't evaluate your submission. This may be due to a temporary
            service issue. Please try again.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary text-sm">
            <RotateCw className="h-4 w-4" />
            Retry Evaluation
          </button>
        </div>
      </div>
    );
  }

  const percentage = (result.overallScore / result.maxOverallScore) * 100;
  const grade =
    percentage >= 85
      ? 'Excellent'
      : percentage >= 70
        ? 'Good'
        : percentage >= 50
          ? 'Fair'
          : 'Needs Work';
  const gradeColor =
    percentage >= 85
      ? 'text-dracula-success'
      : percentage >= 70
        ? 'text-dracula-accent'
        : percentage >= 50
          ? 'text-dracula-warning'
          : 'text-dracula-error';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overall Score Header */}
      <div className="card p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-dracula-purple/10 border border-dracula-purple/30">
            <Award className="h-8 w-8 text-dracula-purple" />
          </div>
          <p className="text-xs font-medium text-dracula-foreground/40 tracking-wider uppercase mb-2">
            Overall Score
          </p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-5xl font-bold tabular-nums ${gradeColor}`}>
              {result.overallScore}
            </span>
            <span className="text-xl text-dracula-foreground/40 font-medium tabular-nums">
              / {result.maxOverallScore}
            </span>
          </div>
          <span className={`text-sm font-medium ${gradeColor}`}>{grade}</span>

          <div className="mt-5 flex items-center gap-2 text-xs text-dracula-foreground/40">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{result.problemTitle}</span>
            <span className="text-dracula-current-line">·</span>
            <span>{new Date(result.submittedAt).toLocaleDateString()}</span>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <Link to="/" className="btn-secondary text-sm">
              Back to Problems
            </Link>
            <Link to="/history" className="btn-ghost text-sm">
              View History
            </Link>
          </div>
        </div>
      </div>

      {/* Criterion Breakdown */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-dracula-foreground/50" />
          <h3 className="text-sm font-semibold text-dracula-foreground">
            Criterion Breakdown
          </h3>
          <span className="text-xs text-dracula-foreground/40">
            ({result.criteria.length} criteria)
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {result.criteria.map((criterion) => (
            <CriterionResultCard key={criterion.id} criterion={criterion} />
          ))}
        </div>
      </div>
    </div>
  );
}
