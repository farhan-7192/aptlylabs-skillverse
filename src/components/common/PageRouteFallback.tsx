import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function PageRouteFallback() {
  return (
    <div
      className="bg-background flex min-h-dvh w-full flex-col"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading page"
    >
      <span className="sr-only">Loading page content</span>

      <header className="border-border border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Skeleton className="h-7 w-36" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-16 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-16">
          <div className="max-w-2xl space-y-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-11 w-full max-w-lg" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-4/5" />
            <div className="flex flex-wrap gap-3 pt-2">
              <Skeleton className="h-11 w-32 rounded-md" />
              <Skeleton className="h-11 w-28 rounded-md" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(['card-a', 'card-b'] as const).map((id) => (
              <div
                key={id}
                className="border-border bg-card space-y-4 rounded-xl border p-6 shadow-sm"
              >
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="mt-2 h-20 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-border border-t py-8">
        <div className="mx-auto flex justify-center px-4">
          <Skeleton className="h-4 w-64" />
        </div>
      </footer>
    </div>
  )
}
