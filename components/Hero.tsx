import Image from "next/image";
import { banglaDate } from "@/lib/format";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="grid items-center gap-6 rounded-2xl border border-[#e3ece3] bg-[#fbfdfb] p-6 sm:p-8 md:grid-cols-2">
       
        <div className="order-2 md:order-1">
         
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dff1e4] px-3 py-1 text-xs font-medium text-[#00923f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00923f]" />
            {banglaDate()}
          </span>

         
          <h1 className="mt-3 text-3xl font-bold leading-tight text-[#14281d] sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5b6b61] sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          
          <a
            href="#সব-পণ্য"
            className="mt-5 inline-block rounded-lg bg-[#00923f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#007a35]"
          >
            সব পণ্য দেখুন
          </a>
        </div>

       
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের তাজা সবজি ও ফলের ঝুড়ি"
            width={420}
            height={320}
            priority
            className="h-auto w-full max-w-[260px] object-contain sm:max-w-[340px] md:max-w-[400px]"
          />
        </div>
      </div>
    </section>
  );
}