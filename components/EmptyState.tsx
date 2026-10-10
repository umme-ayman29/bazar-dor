import Link from "next/link";

type Props = {
  title?: string;
  message?: string;
};

export default function EmptyState({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।",
}: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-[#e3ece3] bg-white px-6 py-10 text-center">
        <p className="text-5xl font-bold text-[#00923f]">৪০৪</p>
        <h1 className="mt-3 text-xl font-bold text-[#14281d]">{title}</h1>
        <p className="mt-2 text-sm text-[#5b6b61]">{message}</p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-lg bg-[#00923f] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#007a35]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}