import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  products: Product[];
  id?: string;
  subtitle?: string;
  marker?: string;
  markerClass?: string;
};

export default function ProductSection({
  title,
  products,
  id,
  subtitle,
  marker,
  markerClass = "",
}: Props) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-4 px-4 pt-8">
      <div className="mb-3">
        <h2 className="flex items-center gap-1.5 text-lg font-bold text-[#14281d]">
          {marker && (
            <span className={`text-sm ${markerClass}`}>{marker}</span>
          )}
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-[#5b6b61] sm:text-sm">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}