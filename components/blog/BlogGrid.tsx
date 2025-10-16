"use client";

import React from "react";
import BlogCard, { type BlogPost } from "./BlogCard";
import type { BlogCategory } from "./BlogTabs";

export default function BlogGrid({ posts, active, readLabel }: { posts: BlogPost[]; active: BlogCategory; readLabel: string }) {
  const filtered = active === "all" ? posts : posts.filter((p) => p.category === active);
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((p, i) => (
        <BlogCard key={`${p.title}-${i}`} post={p} index={i} readLabel={readLabel} />
      ))}
    </div>
  );
}
