import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?next=/profile/update");
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[#14281d]">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm text-[#5b6b61]">
        আপনার নাম বদলে নতুন নাম সংরক্ষণ করুন।
      </p>
      <UpdateProfileForm currentName={session.user.name} />
    </div>
  );
}