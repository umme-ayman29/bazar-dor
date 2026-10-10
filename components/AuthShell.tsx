import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto max-w-sm text-center">
        <h1 className="text-2xl font-bold text-[#14281d]">{title}</h1>
        <p className="mt-1 text-xs text-[#5b6b61] sm:text-sm">{subtitle}</p>
      </div>

      <div className="mx-auto mt-5 max-w-sm rounded-xl border border-[#e3ece3] bg-white p-5 shadow-sm">
        {children}
      </div>

      <p className="mt-4 text-center text-xs text-[#5b6b61]">
        <Link href="/" className="hover:text-[#00923f]">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </section>
  );
}