"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { toBn } from "@/lib/format";
import ProductCard from "./ProductCard";
import SortDropdown, { type SortOption } from "./SortDropdown";

export default function CategoryView({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = useMemo(() => {
    if (sort === "default") return products;
    
    return [...products].sort((a, b) =>
      sort === "asc" ? a.today - b.today : b.today - a.today
    );
  }, [products, sort]);

  return (
    <>
      <div className="mt-4 flex justify-end rounded-xl border border-[#e3ece3] bg-[#fbfdfb] px-4 py-3">
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <p className="mt-4 text-xs text-[#5b6b61]">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}