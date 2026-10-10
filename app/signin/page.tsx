"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

const input =
  "w-full rounded-lg border border-[#e3ece3] bg-white px-3 py-2 text-sm outline-none placeholder:text-[#9aa8a0] focus:border-[#00923f]";


const getNext = () => {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
};

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("next")) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দুটোই দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(getNext());
    router.refresh();
  };

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজারের তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন"
    >
      <form onSubmit={onSubmit} className="space-y-3">
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

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#00923f] py-2 text-sm font-medium text-white transition hover:bg-[#007a35] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-[11px] text-[#9aa8a0]">
        <span className="h-px flex-1 bg-[#e3ece3]" />
        অথবা
        <span className="h-px flex-1 bg-[#e3ece3]" />
      </div>

      <SocialButtons />

      <p className="mt-4 text-center text-xs text-[#5b6b61]">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-medium text-[#00923f]">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthShell>
  );
}