import type { Change, Unit } from "./types";

const BN = "০১২৩৪৫৬৭৮৯";

export const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => BN[Number(d)]);

export const formatPrice = (n: number) =>
  `${toBn(n.toLocaleString("en-US", { maximumFractionDigits: 2 }))} টাকা`;

export const formatChange = (pct: number) => {
  const v = toBn(Math.abs(pct).toFixed(1));
  if (pct > 0) return `▲ ${v}%`;
  if (pct < 0) return `▼ ${v}%`;
  return `— ${v}%`;
};


export const changeClass = (dir: Change["dir"]) =>
  dir === "up"
    ? "text-error"
    : dir === "down"
    ? "text-success"
    : "text-base-content/50";

export const unitLabel = (u: Unit) =>
  ({ kg: "প্রতি কেজি", litre: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস" })[u];

export const unitShort = (u: Unit) =>
  ({ kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" })[u];

export const banglaDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });