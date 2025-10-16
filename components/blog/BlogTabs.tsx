"use client";

import React from "react";

export type BlogCategory = "all" | "trends" | "edu" | "corp";

export default function BlogTabs({
  labels,
  active,
  onChange,
}: {
  labels: Record<BlogCategory, string>;
  active: BlogCategory;
  onChange: (c: BlogCategory) => void;
}) {
  const cats: BlogCategory[] = ["all", "trends", "edu", "corp"];
  return (
    <div className="w-full overflow-x-auto">
      <div className="-mx-1 inline-flex gap-2 p-1">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              active === c
                ? "border-[#7B1FA2]/30 bg-[#7B1FA2]/10 text-[#7B1FA2]"
                : "border-black/10 bg-white text-gray-900 hover:bg-gray-50"
            }`}
          >
            {labels[c]}
          </button>
        ))}
      </div>
    </div>
  );
}
