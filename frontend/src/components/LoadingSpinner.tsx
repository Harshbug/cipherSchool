export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  };

  return (
    <div
      className={`${dimensions[size]} animate-spin rounded-full border-dracula-current-line border-t-dracula-purple`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function FullPageSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <LoadingSpinner size="lg" />
      {message && <p className="text-dracula-foreground/60 text-sm">{message}</p>}
    </div>
  );
}
