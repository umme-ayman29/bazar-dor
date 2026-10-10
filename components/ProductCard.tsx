import Link from "next/link";
import type { Product } from "@/lib/types";
import {
  changeClass,
  formatChange,
  formatPrice,
  unitLabel,
} from "@/lib/format";

const badgeBg = {
  up: "bg-red-50",
  down: "bg-green-50",
  flat: "bg-gray-100",
} as const;

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-xl border border-[#e3ece3] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
     
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#eef5ee] text-xl">
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#14281d]">
            {p.nameBn}
          </h3>
          <p className="text-xs text-[#5b6b61]">{unitLabel(p.unit)}</p>
        </div>
      </div>

      
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-[#5b6b61]">আজকের দাম</p>
          <p className="text-lg font-bold text-[#14281d]">
            {formatPrice(p.today)}
          </p>
        </div>
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-medium ${
            badgeBg[p.change.dir]
          } ${changeClass(p.change.dir)}`}
        >
          {formatChange(p.change.pct)}
        </span>
      </div>
    </Link>
  );
}