import type { Product } from "@/lib/types";
import { changeClass, formatChange, formatPrice, unitShort } from "@/lib/format";

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;

  // দুইবার বসানো, যাতে অনন্ত লুপ মসৃণ হয়
  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-[#e3ece3] bg-white">
      <div className="ticker-track flex w-max py-2 text-[13px]">
        {items.map((p, i) => (
          <span
            key={`${p.id}-${i}`}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap pr-8"
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-[#5b6b61]">
              {formatPrice(p.today)}/{unitShort(p.unit)}
            </span>
            <span className={`font-medium ${changeClass(p.change.dir)}`}>
              {formatChange(p.change.pct)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}