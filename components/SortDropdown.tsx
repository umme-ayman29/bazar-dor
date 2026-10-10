"use client";

export type SortOption = "default" | "asc" | "desc";

type Props = {
  value: SortOption;
  onChange: (v: SortOption) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-[#5b6b61]">
      সাজান
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none rounded-lg border border-[#e3ece3] bg-white py-1.5 pl-3 pr-8 text-sm text-[#14281d] outline-none focus:border-[#00923f]"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5b6b61]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </label>
  );
}