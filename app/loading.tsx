export default function Loading() {
  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="h-10 w-64 bg-muted rounded-lg mb-2 animate-pulse" />
          <div className="h-6 w-96 bg-muted rounded-lg animate-pulse" />
        </div>

        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4 mb-12">
            <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5].map((j) => (
                <div
                  key={j}
                  className="h-80 w-60 flex-shrink-0 bg-muted rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
