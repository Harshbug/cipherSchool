import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import type { Problem } from '@/types';

export default function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <div className="card group flex flex-col p-5 transition-all hover:border-dracula-purple/40 hover:shadow-soft-lg">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dracula-selection/80 border border-dracula-current-line/30">
          <FileText className="h-4 w-4 text-dracula-accent" />
        </div>
        <span className="text-xs font-medium text-dracula-foreground/40 tracking-wider uppercase">
          Problem #{problem.id.slice(-4)}
        </span>
      </div>

      <h3 className="mb-2 text-base font-semibold text-dracula-foreground leading-snug">
        {problem.title}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-dracula-foreground/55 line-clamp-3">
        {problem.excerpt}
      </p>

      <Link
        to={`/problems/${problem.id}/attempt`}
        className="btn-primary text-sm w-full"
      >
        Start Practice
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
