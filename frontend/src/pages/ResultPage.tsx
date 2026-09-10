import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EvaluationResults from '@/components/EvaluationResults';
import { FullPageSpinner } from '@/components/LoadingSpinner';
import { fetchEvaluationResult } from '@/api/attempts';
import type { EvaluationResult } from '@/types';

const POLL_INTERVAL_MS = 2000;

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function load() {
      try {
        const data = await fetchEvaluationResult(id!);
        if (cancelled) return;
        setResult(data);
        setError(null);

        if (data.status === 'evaluating') {
          timer = setTimeout(load, POLL_INTERVAL_MS);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load evaluation');
        }
      }
    }

    load();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [id]);

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-dracula-foreground/50 transition-colors hover:text-dracula-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="card p-8 text-center">
          <p className="text-sm text-dracula-foreground/50">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return <FullPageSpinner message="Loading evaluation..." />;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-dracula-foreground/50 transition-colors hover:text-dracula-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <EvaluationResults result={result} />
    </div>
  );
}
