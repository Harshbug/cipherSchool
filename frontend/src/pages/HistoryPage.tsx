import { useEffect, useState } from 'react';
import { History as HistoryIcon, Inbox } from 'lucide-react';
import AttemptHistoryItem from '@/components/AttemptHistoryItem';
import { FullPageSpinner } from '@/components/LoadingSpinner';
import { fetchAttemptHistory } from '@/api/attempts';
import type { AttemptHistoryItem as AttemptHistoryItemType } from '@/types';

export default function HistoryPage() {
  const [history, setHistory] = useState<AttemptHistoryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAttemptHistory();
        if (!cancelled) setHistory(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load history');
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
    return <FullPageSpinner message="Loading history..." />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="card p-8 text-center">
          <p className="text-sm text-dracula-foreground/50">{error}</p>
        </div>
      </div>
    );
  }

  const completedCount = history.filter((a) => a.status === 'completed').length;
  const scored = history.filter((a) => a.score !== null);
  const avgScore = Math.round(
    scored.reduce((sum, a) => sum + (a.score ?? 0), 0) / (scored.length || 1)
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-dracula-purple/10 border border-dracula-purple/20">
            <HistoryIcon className="h-5 w-5 text-dracula-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dracula-foreground">Attempt History</h1>
            <p className="text-xs text-dracula-foreground/40 mt-0.5">
              {history.length} total attempts · {completedCount} completed · {avgScore} avg score
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      {history.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dracula-selection/60">
            <Inbox className="h-6 w-6 text-dracula-foreground/30" />
          </div>
          <p className="text-sm text-dracula-foreground/50">
            No attempts yet. Start practicing to see your history here.
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dracula-selection bg-dracula-bg/40">
                <th className="px-4 py-3 text-left text-xs font-medium text-dracula-foreground/40 tracking-wider uppercase">
                  Problem
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dracula-foreground/40 tracking-wider uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dracula-foreground/40 tracking-wider uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dracula-foreground/40 tracking-wider uppercase">
                  Score
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-dracula-foreground/40 tracking-wider uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((attempt) => (
                <AttemptHistoryItem key={attempt.id} attempt={attempt} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
