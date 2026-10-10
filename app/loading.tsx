import { ProductGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <div className="mb-4 h-6 w-48 animate-pulse rounded bg-[#e3ece3]" />
      <ProductGridSkeleton count={6} />
    </section>
  );
}