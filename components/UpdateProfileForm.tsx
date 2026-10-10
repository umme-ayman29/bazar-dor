"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({
  currentName,
}: {
  currentName: string;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const trimmed = (inputRef.current?.value ?? "").trim();

    if (trimmed.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }
    if (trimmed === currentName) {
      toast.error("নাম আগের মতোই আছে, নতুন নাম লিখুন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="relative z-10 mt-6 rounded-xl border border-[#e3ece3] bg-[#fbfdfb] p-4">
      <label
        htmlFor="name"
        className="mb-1 block text-sm font-medium text-[#14281d]"
      >
        নাম
      </label>
      <input
        id="name"
        ref={inputRef}
        type="text"
        defaultValue={currentName}
        placeholder="আপনার নাম লিখুন"
        autoComplete="name"
        className="w-full rounded-lg border border-[#e3ece3] bg-white px-3 py-2 text-[#14281d] outline-none focus:border-[#00923f]"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 w-full rounded-lg bg-[#00923f] py-2.5 font-medium text-white transition hover:bg-[#007a35] disabled:opacity-60"
      >
        {loading ? "আপডেট হচ্ছে..." : "Update Information"}
      </button>

      <Link
        href="/profile"
        className="mt-3 block text-center text-sm text-[#5b6b61] hover:text-[#00923f]"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}