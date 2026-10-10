"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
          setLoading(false);
        },
      },
    });
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#e11d2e] px-3 py-1.5 text-sm font-medium text-[#e11d2e] transition hover:bg-[#e11d2e] hover:text-white disabled:opacity-60"
    >
      <span aria-hidden>↩</span>
      {loading ? "অপেক্ষা করুন..." : "সাইন আউট"}
    </button>
  );
}