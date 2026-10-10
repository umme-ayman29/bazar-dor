import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import {
  changeClass,
  formatChange,
  formatPrice,
  formatPriceFixed,
  toBn,
  unitLabel,
  unitShort,
} from "@/lib/format";

const badgeBg = {
  up: "bg-red-50",
  down: "bg-green-50",
  flat: "bg-gray-100",
} as const;

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const p = await getProduct(slug);
  if (!p) notFound();

 
  const lowest = p.markets.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = p.markets.reduce((a, b) => (b.max > a.max ? b : a));
  const marketAvgs = p.markets.map((m) => (m.min + m.max) / 2);
  const avgPrice = marketAvgs.reduce((a, b) => a + b, 0) / marketAvgs.length;

  const diff = Math.abs(p.today - p.yesterday);
  const summary =
    p.change.dir === "up"
      ? `গতকালের তুলনায় ${toBn(diff)} টাকা বেড়েছে`
      : p.change.dir === "down"
      ? `গতকালের তুলনায় ${toBn(diff)} টাকা কমেছে`
      : "গতকালের দামই আজও বহাল আছে";

  return (
    <section className="mx-auto max-w-6xl px-4 pt-5">
      
      <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-[#5b6b61]">
        <Link href="/" className="hover:text-[#00923f]">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${p.category}`}
          className="hover:text-[#00923f]"
        >
          {p.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-[#14281d]">{p.nameBn}</span>
      </nav>

      
      <div className="flex flex-col gap-4 rounded-xl border border-[#e3ece3] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[#eef5ee] text-4xl">
            {p.image}
          </span>
          <div>
            <h1 className="text-xl font-bold text-[#14281d] sm:text-2xl">
              {p.nameBn}
            </h1>
            <p className="mt-0.5 text-xs text-[#5b6b61] sm:text-sm">
              {summary}। {toBn(p.markets.length)}টি বাজারের তথ্যের ভিত্তিতে।
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Link
                href={`/category/${p.category}`}
                className="rounded-full bg-[#dff1e4] px-2.5 py-0.5 text-xs font-medium text-[#00923f]"
              >
                {p.categoryIcon} {p.categoryNameBn}
              </Link>
              <span className="rounded-full bg-[#eef5ee] px-2.5 py-0.5 text-xs text-[#5b6b61]">
                {unitLabel(p.unit)}
              </span>
            </div>
          </div>
        </div>

        
        <div className="rounded-lg bg-[#eef5ee] px-5 py-3 text-center sm:min-w-36">
          <p className="text-[11px] text-[#5b6b61]">আজকের দাম</p>
          <p className="text-2xl font-bold text-[#14281d]">
            {toBn(p.today.toLocaleString("en-US"))}
          </p>
          <p className="text-[11px] text-[#5b6b61]">
            টাকা/{unitShort(p.unit)}
          </p>
          <span
            className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
              badgeBg[p.change.dir]
            } ${changeClass(p.change.dir)}`}
          >
            {formatChange(p.change.pct)}
          </span>
        </div>
      </div>

      
      <div className="mt-4 rounded-xl border border-[#e3ece3] bg-white p-4 sm:p-5">
        <h2 className="mb-3 text-base font-bold text-[#14281d]">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[#e3ece3] p-3">
            <p className="text-xs text-[#5b6b61]">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-xl font-bold text-[#00923f]">
              {formatPrice(lowest.min)}
            </p>
            <p className="mt-1 text-[11px] text-[#5b6b61]">
              সবচেয়ে কম: {lowest.market}
            </p>
          </div>

          <div className="rounded-lg border border-[#e3ece3] p-3">
            <p className="text-xs text-[#5b6b61]">সর্বোচ্চ দাম</p>
            <p className="mt-1 text-xl font-bold text-[#e11d2e]">
              {formatPrice(highest.max)}
            </p>
            <p className="mt-1 text-[11px] text-[#5b6b61]">
              সবচেয়ে বেশি: {highest.market}
            </p>
          </div>

          <div className="rounded-lg border border-[#e3ece3] p-3">
            <p className="text-xs text-[#5b6b61]">গড় দাম</p>
            <p className="mt-1 text-xl font-bold text-[#14281d]">
              {formatPriceFixed(avgPrice)}
            </p>
            <p className="mt-1 text-[11px] text-[#5b6b61]">
              {unitLabel(p.unit)}, সব বাজারের গড়
            </p>
          </div>
        </div>
      </div>

      
      <div className="mt-4 rounded-xl border border-[#e3ece3] bg-white p-4 sm:p-5">
        <h2 className="mb-3 text-base font-bold text-[#14281d]">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-[#e3ece3] text-xs text-[#5b6b61]">
                <th className="py-2 text-left font-medium">বাজার</th>
                <th className="py-2 text-left font-medium">বিভাগ</th>
                <th className="py-2 text-right font-medium">সর্বনিম্ন</th>
                <th className="py-2 text-right font-medium">সর্বোচ্চ</th>
                <th className="py-2 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {p.markets.map((m, i) => (
                <tr
                  key={`${m.market}-${i}`}
                  className={i % 2 === 1 ? "bg-[#f3f8f3]" : ""}
                >
                  <td className="px-1 py-2.5">{m.market}</td>
                  <td className="py-2.5 text-[#5b6b61]">{m.division}</td>
                  <td className="py-2.5 text-right">{formatPrice(m.min)}</td>
                  <td className="py-2.5 text-right">{formatPrice(m.max)}</td>
                  <td className="py-2.5 pr-1 text-right font-semibold">
                    {formatPriceFixed((m.min + m.max) / 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}