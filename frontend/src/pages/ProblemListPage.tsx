import { useEffect, useState } from 'react';
import { Clock, Layers, Target } from 'lucide-react';
import ProblemList from '@/components/ProblemList';
import { FullPageSpinner } from '@/components/LoadingSpinner';
import { fetchAttemptHistory } from '@/api/attempts';
import { fetchProblems } from '@/api/problems';
import type { Problem } from '@/types';

export default function ProblemListPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [problemList, history] = await Promise.all([
          fetchProblems(),
          fetchAttemptHistory(),
        ]);
        if (cancelled) return;

        const scored = history.filter((a) => a.score !== null);
        const average =
          scored.length === 0
            ? 0
            : Math.round(scored.reduce((sum, a) => sum + (a.score ?? 0), 0) / scored.length);

        setProblems(problemList);
        setAttemptCount(history.length);
        setAvgScore(average);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load problems');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <FullPageSpinner message="Loading problems..." />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="card p-8 text-center">
          <p className="text-sm text-dracula-foreground/50">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dracula-foreground mb-2">
          Practice Problems
        </h1>
        <p className="text-sm text-dracula-foreground/50 max-w-2xl">
          Sharpen your low-level design skills. Choose a problem, write your solution,
          and get AI-powered evaluation with detailed feedback.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-dracula-purple/10 border border-dracula-purple/20">
              <Layers className="h-4 w-4 text-dracula-purple" />
            </div>
            <div>
              <p className="text-lg font-bold text-dracula-foreground tabular-nums">
                {problems.length}
              </p>
              <p className="text-xs text-dracula-foreground/40">Problems</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-dracula-accent/10 border border-dracula-accent/20">
              <Target className="h-4 w-4 text-dracula-accent" />
            </div>
            <div>
              <p className="text-lg font-bold text-dracula-foreground tabular-nums">
                {attemptCount}
              </p>
              <p className="text-xs text-dracula-foreground/40">Attempts</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-dracula-success/10 border border-dracula-success/20">
              <Clock className="h-4 w-4 text-dracula-success" />
            </div>
            <div>
              <p className="text-lg font-bold text-dracula-foreground tabular-nums">
                {avgScore}
              </p>
              <p className="text-xs text-dracula-foreground/40">Avg Score</p>
            </div>
          </div>
        </div>
      </div>

      <ProblemList problems={problems} />
    </div>
  );
}
