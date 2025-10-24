"use client";

import { useState } from "react";
import { useMessages, useTranslations } from "next-intl";
import PageBackground from "@/components/decor/PageBackground";
import BlogHero from "@/components/blog/BlogHero";
import BlogTabs, { type BlogCategory } from "@/components/blog/BlogTabs";
import BlogGrid from "@/components/blog/BlogGrid";

export default function ClientPage() {
  // Read messages object to avoid throwing when a key is missing
  const t = useTranslations();
  const messages = useMessages() as any;
  const blog = (messages?.blogPage as any) || {};
  const heading: string = blog.heading ?? "Blog / Insights";
  const intro: string = blog.intro ??
    "Perspectives on travel trends, educational journeys, and corporate learning.";
  const labels = (blog.labels as Record<BlogCategory, string> & { read: string }) ?? {
    all: "All",
    trends: "Trends",
    edu: "Educational Travel",
    corp: "Corporate Learning",
    read: "min read",
  } as any;
  const posts = Array.isArray(blog.posts) ? (blog.posts as any[]) : [];
  const [active, setActive] = useState<BlogCategory>("all");

  return (
    <PageBackground variant="blog">
      <section className="mx-auto max-w-7xl px-3 sm:px-4 py-10 sm:py-14">
        <BlogHero heading={heading} intro={intro} />
        <div className="mt-6">
          <BlogTabs
            labels={{ all: labels.all, trends: labels.trends, edu: labels.edu, corp: labels.corp }}
            active={active}
            onChange={setActive}
          />
        </div>
        <div className="mt-6">
          <BlogGrid posts={posts as any} active={active} readLabel={labels.read} />
        </div>
      </section>
    </PageBackground>
  );
}
