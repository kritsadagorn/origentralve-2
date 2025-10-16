"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "th";
  const localizedHref = `/${locale}${href}`;
  return (
    <Link
      href={localizedHref}
      className="text-[15px] font-medium text-gray-900 hover:text-[#7B1FA2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2185B]"
    >
      {label}
    </Link>
  );
}
