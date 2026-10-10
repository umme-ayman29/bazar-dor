import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

export default async function HomePage() {
  const products = await getProducts();

  if (!products) {
    return (
      <>
        <Hero />
        <p className="mx-auto max-w-6xl px-4 py-16 text-center text-[#5b6b61]">
          ডেটা লোড করা যায়নি। একটু পরে পেজটি রিফ্রেশ করুন।
        </p>
      </>
    );
  }

  
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Hero />

      <ProductSection
        title="আজ দাম বেড়েছে"
        marker="▲"
        markerClass="text-[#e11d2e]"
        products={risers}
      />

      <ProductSection
        title="আজ দাম কমেছে"
        marker="▼"
        markerClass="text-[#00923f]"
        products={fallers}
      />

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </>
  );
}