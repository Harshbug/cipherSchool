import { Link, useLocation } from 'react-router-dom';
import { Terminal, History } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isHistoryActive = location.pathname === '/history';

  return (
    <nav className="sticky top-0 z-50 border-b border-dracula-selection bg-dracula-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-dracula-purple/15 border border-dracula-purple/30">
            <Terminal className="h-5 w-5 text-dracula-purple" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-dracula-foreground tracking-tight">
              LLD Practice
            </span>
            <span className="text-[10px] text-dracula-foreground/40 font-medium tracking-wider uppercase">
              Low-Level Design
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className={`btn-ghost text-sm ${
              location.pathname === '/' ? 'text-dracula-foreground bg-dracula-selection/60' : ''
            }`}
          >
            Problems
          </Link>
          <Link
            to="/history"
            className={`btn-ghost text-sm ${
              isHistoryActive ? 'text-dracula-foreground bg-dracula-selection/60' : ''
            }`}
          >
            <History className="h-4 w-4" />
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}
