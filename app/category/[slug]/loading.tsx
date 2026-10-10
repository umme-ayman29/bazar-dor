import { ProductGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="flex animate-pulse items-center gap-3 rounded-xl border border-[#e3ece3] bg-[#fbfdfb] px-4 py-3">
        <div className="h-11 w-11 rounded-lg bg-[#e3ece3]" />
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-[#e3ece3]" />
          <div className="h-3 w-48 rounded bg-[#e3ece3]" />
        </div>
      </div>
      <div className="mt-4 h-12 animate-pulse rounded-xl bg-[#e3ece3]" />
      <div className="mt-4">
        <ProductGridSkeleton count={6} />
      </div>
    </section>
  );
}