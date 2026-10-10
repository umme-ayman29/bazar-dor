"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Category } from "@/lib/types";
import { banglaDate } from "@/lib/format";

type User = { name: string; email: string; image?: string };

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [user] = useState<User | null>(null);

  return (
    <header className="border-b border-[#e3ece3] bg-[#fbfdfb]">
      <div className="mx-auto max-w-6xl px-4">
        {/* সারি ১: লোগো + অথ বাটন */}
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2.5">
           <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#00923f]">
  <Image
    src="/logo-icon.png"
    alt="বাজার দর লোগো"
    width={20}
    height={20}
    priority
    className="h-5 w-5 object-contain"
  />
</span>
            <span className="leading-tight">
              <span className="block text-lg font-bold text-[#14281d]">
                বাজার দর
              </span>
              <span
                className="block text-[11px] text-[#5b6b61]"
                suppressHydrationWarning
              >
                {banglaDate()}
              </span>
            </span>
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#eef5ee]"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt=""
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#00923f] text-xs text-white">
                    {user.name[0]}
                  </span>
                )}
                <span className="hidden text-sm sm:inline">{user.name}</span>
                <span className="text-[10px] text-[#5b6b61]">▾</span>
              </button>

              {open && (
                <div className="absolute right-0 z-30 mt-2 w-60 rounded-xl border border-[#e3ece3] bg-white p-3 shadow-lg">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="mb-2 text-xs text-[#5b6b61]">{user.email}</p>
                  <div className="flex flex-col gap-1 border-t border-[#e3ece3] pt-2">
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-2 py-1.5 text-sm hover:bg-[#eef5ee]"
                    >
                      👤 আমার প্রোফাইল
                    </Link>
                    <button className="rounded-lg px-2 py-1.5 text-left text-sm text-[#e11d2e] hover:bg-red-50">
                      ↩ সাইন আউট
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#14281d] hover:bg-[#eef5ee] sm:px-4"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-[#00923f] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#007a35] sm:px-4"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        {/* সারি ২: ক্যাটাগরি লিংক (লোগোর নিচ থেকে বাঁ দিক ঘেঁষে) */}
        <nav className="flex gap-1 overflow-x-auto pb-3">
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={c.id}
                href={href}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[13px] transition ${
                  active
                    ? "bg-[#00923f] font-medium text-white"
                    : "text-[#14281d] hover:bg-[#eef5ee]"
                }`}
              >
                <span className="text-xs">{c.icon}</span>
                {c.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}