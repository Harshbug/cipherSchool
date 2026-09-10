import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, ListChecks, AlertCircle, BookOpen } from 'lucide-react';
import SubmissionForm from '@/components/SubmissionForm';
import { FullPageSpinner } from '@/components/LoadingSpinner';
import { startAttempt, submitAttempt } from '@/api/attempts';
import { fetchProblem } from '@/api/problems';
import type { Problem } from '@/types';

export default function AttemptPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProblem(id!);
        if (!cancelled) setProblem(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Problem not found.');
          setProblem(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <FullPageSpinner message="Loading problem..." />;
  }

  if (!problem) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="card p-8 text-center">
          <p className="text-sm text-dracula-foreground/50">
            {error ?? 'Problem not found.'}
          </p>
          <button onClick={() => navigate('/')} className="btn-secondary text-sm mt-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (answer: string) => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      const attempt = await startAttempt(problem.id);
      await submitAttempt(attempt._id, answer);
      navigate(`/attempts/${attempt._id}/result`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit attempt');
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-dracula-foreground/50 transition-colors hover:text-dracula-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Problems
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Problem Details */}
        <div className="space-y-5">
          {/* Problem Statement */}
          <div className="card p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dracula-purple/10 border border-dracula-purple/20">
                <FileText className="h-4 w-4 text-dracula-purple" />
              </div>
              <span className="text-xs font-medium text-dracula-foreground/40 tracking-wider uppercase">
                Problem #{problem.id.slice(-4)}
              </span>
            </div>
            <h1 className="text-xl font-bold text-dracula-foreground mb-3 leading-snug">
              {problem.title}
            </h1>
            <p className="text-sm leading-relaxed text-dracula-foreground/65">
              {problem.statement}
            </p>
          </div>

          {/* Requirements */}
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-dracula-accent" />
              <h3 className="text-sm font-semibold text-dracula-foreground">Requirements</h3>
            </div>
            <ul className="space-y-2.5">
              {problem.requirements.map((req, idx) => (
                <li key={idx} className="flex gap-2.5 text-sm leading-relaxed text-dracula-foreground/65">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-dracula-accent" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Constraints */}
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-dracula-warning" />
              <h3 className="text-sm font-semibold text-dracula-foreground">Constraints</h3>
            </div>
            <ul className="space-y-2.5">
              {problem.constraints.map((con, idx) => (
                <li key={idx} className="flex gap-2.5 text-sm leading-relaxed text-dracula-foreground/65">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dracula-warning/60" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Submission Form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SubmissionForm
            problemTitle={problem.title}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
          {submitError && (
            <p className="mt-3 text-sm text-dracula-error">{submitError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
