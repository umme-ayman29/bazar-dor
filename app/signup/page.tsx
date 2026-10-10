"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

const input =
  "w-full rounded-lg border border-[#e3ece3] bg-white px-3 py-2 text-sm outline-none placeholder:text-[#9aa8a0] focus:border-[#00923f]";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email,
      password,
    });
    setLoading(false);

    if (error) {
      const exists = error.message?.toLowerCase().includes("exist");
      toast.error(
        exists
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে"
          : "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন"
      );
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন"
    >
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            className={input}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">ইমেইল</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={input}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">পাসওয়ার্ড</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={input}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="আবার লিখুন"
            className={input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#00923f] py-2 text-sm font-medium text-white transition hover:bg-[#007a35] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-[11px] text-[#9aa8a0]">
        <span className="h-px flex-1 bg-[#e3ece3]" />
        অথবা
        <span className="h-px flex-1 bg-[#e3ece3]" />
      </div>

      <SocialButtons />

      <p className="mt-4 text-center text-xs text-[#5b6b61]">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-[#00923f]">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}