import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?next=/profile");
  }

  const { user } = session;
  const initial = user.name?.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[#14281d]">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-[#5b6b61]">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e3ece3] bg-[#fbfdfb] p-4">
        <div className="flex items-center gap-3">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00923f] text-xl font-bold text-white">
              {initial}
            </div>
          )}
          <div>
            <p className="font-semibold text-[#14281d]">{user.name}</p>
            <p className="text-sm text-[#5b6b61]">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-5 rounded-xl border border-[#e3ece3] bg-[#fbfdfb] p-4">
        <h2 className="font-semibold text-[#14281d]">তথ্য</h2>
        <p className="mt-3 text-sm text-[#5b6b61]">নাম</p>
        <p className="mt-1 rounded-lg border border-[#e3ece3] bg-white px-3 py-2 text-[#14281d]">
          {user.name}
        </p>
        <Link
          href="/profile/update"
          className="mt-4 block w-full rounded-lg bg-[#00923f] py-2.5 text-center font-medium text-white transition hover:bg-[#007a35]"
        >
          আপডেট
        </Link>
      </div>
    </div>
  );
}
