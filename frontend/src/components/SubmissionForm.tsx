import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

const MAX_CHARS = 10000;
const MIN_CHARS = 50;

export default function SubmissionForm({
  problemTitle,
  onSubmit,
  submitting = false,
}: {
  problemTitle: string;
  onSubmit: (answer: string) => void | Promise<void>;
  submitting?: boolean;
}) {
  const [answer, setAnswer] = useState('');
  const [touched, setTouched] = useState(false);

  const charCount = answer.length;
  const isTooShort = touched && charCount > 0 && charCount < MIN_CHARS;
  const canSubmit = charCount >= MIN_CHARS && charCount <= MAX_CHARS && !submitting;

  const handleSubmit = () => {
    if (!canSubmit) {
      setTouched(true);
      return;
    }
    void onSubmit(answer);
  };

  return (
    <div className="card flex flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-dracula-foreground">Your Solution</h3>
          <p className="text-xs text-dracula-foreground/40 mt-0.5">
            Write your LLD for: {problemTitle}
          </p>
        </div>
        <span
          className={`text-xs font-mono font-medium tabular-nums ${
            charCount > MAX_CHARS * 0.9
              ? 'text-dracula-warning'
              : 'text-dracula-foreground/40'
          }`}
        >
          {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </span>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="Describe your system design approach...&#10;&#10;Include:&#10;- High-level architecture&#10;- Component breakdown&#10;- Data model&#10;- API design&#10;- Trade-offs and alternatives"
        className="flex-1 min-h-[400px] w-full resize-y rounded-lg border border-dracula-selection bg-dracula-bg/60 p-4 font-mono text-sm leading-relaxed text-dracula-foreground placeholder:text-dracula-foreground/25 focus:border-dracula-purple/50 focus:outline-none focus:ring-1 focus:ring-dracula-purple/30 transition-colors"
      />

      {isTooShort && (
        <div className="mt-3 flex items-center gap-2 text-xs text-dracula-warning">
          <AlertCircle className="h-3.5 w-3.5" />
          Please write at least {MIN_CHARS} characters before submitting.
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-dracula-foreground/35">
          {charCount < MIN_CHARS
            ? `${MIN_CHARS - charCount} more characters needed`
            : 'Ready to submit'}
        </p>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="btn-primary text-sm"
        >
          <Send className="h-4 w-4" />
          {submitting ? 'Submitting...' : 'Submit Solution'}
        </button>
      </div>
    </div>
  );
}
