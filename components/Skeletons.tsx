export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-[#e3ece3] bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-[#e3ece3]" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-2/3 rounded bg-[#e3ece3]" />
          <div className="h-2.5 w-1/3 rounded bg-[#e3ece3]" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-2.5 w-14 rounded bg-[#e3ece3]" />
          <div className="h-5 w-24 rounded bg-[#e3ece3]" />
        </div>
        <div className="h-5 w-14 rounded bg-[#e3ece3]" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}