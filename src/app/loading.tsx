import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-12 pb-10">
      <div className="mb-10">
        <Skeleton className="h-12 w-3/4 max-w-md bg-white/5 mb-4" />
        <Skeleton className="h-6 w-1/2 max-w-xs bg-white/5" />
      </div>

      {[1, 2, 3, 4].map((section) => (
        <section key={section}>
          <Skeleton className="h-8 w-48 bg-white/5 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((card) => (
              <div key={card} className="h-64 rounded-xl bg-white/5 border border-white/5 animate-pulse" />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
