export default function Loading() {
  return (
    <div className="animate-pulse bg-background min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative h-[50vh] md:h-[65vh] w-full bg-muted/20">
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <div className="container mx-auto space-y-4">
            <div className="h-4 w-24 bg-primary/20 rounded-full" />
            <div className="h-10 md:h-14 w-3/4 md:w-1/2 bg-primary/20 rounded-lg" />
            <div className="flex gap-3">
              <div className="h-8 w-24 bg-primary/10 rounded-full" />
              <div className="h-8 w-24 bg-primary/10 rounded-full" />
              <div className="h-8 w-24 bg-primary/10 rounded-full" />
            </div>
            <div className="h-10 w-32 bg-primary/20 rounded-lg mt-4" />
          </div>
        </div>
      </div>

      {/* Info Section Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass rounded-2xl p-6 md:p-8 h-64" />
          <div className="glass rounded-2xl p-6 md:p-8 h-80" />
        </div>
      </div>
    </div>
  );
}
