import { notFound } from "next/navigation";
import CategoryView from "@/components/CategoryView";
import EmptyState from "@/components/EmptyState";
import { getCategories, getProducts } from "@/lib/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);

  const category = categories?.find((c) => c.slug === slug);
  if (!category) notFound();

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="কোনো পণ্য পাওয়া যায়নি"
        message="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।"
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      
      <div className="flex items-center gap-3 rounded-xl border border-[#e3ece3] bg-[#fbfdfb] px-4 py-3">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#eef5ee] text-2xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-lg font-bold text-[#14281d]">{category.nameBn}</h1>
          <p className="text-xs text-[#5b6b61]">
            এই ক্যাটাগরির পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryView products={products} />
    </section>
  );
}