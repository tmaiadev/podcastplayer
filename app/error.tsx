'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-muted-foreground mb-6">
          {error.message || 'Failed to load podcasts'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
