import ProblemCard from '@/components/ProblemCard';
import type { Problem } from '@/types';

export default function ProblemList({ problems }: { problems: Problem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
