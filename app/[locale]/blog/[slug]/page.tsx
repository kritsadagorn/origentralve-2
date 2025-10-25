import type { Metadata } from "next";
import PageBackground from "@/components/decor/PageBackground";
import BlogHero from "@/components/blog/BlogHero";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import en from "../../../../messages/en.json";
import { locales } from "@/i18n/config";

// Build-time static params (slugs shared across locales)
export function generateStaticParams() {
  const slugs = (en.blogPage.posts as any[]).map((p) => p.slug).filter(Boolean);
  return locales.flatMap((locale) => slugs.map((slug: string) => ({ locale, slug })));
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const messages = await getMessages();
  const posts = ((messages as any)?.blogPage?.posts ?? []) as any[];
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <PageBackground variant="blog">
      <article className="mx-auto max-w-3xl px-3 sm:px-4 py-10 sm:py-14">
        <nav className="mb-6 text-sm">
          <Link href={`/${locale}/blog`} className="text-[#7B1FA2] hover:underline">← Back to Blog</Link>
        </nav>
        <BlogHero heading={post.title} intro={post.excerpt} />
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <Image src="/images/placeholder600x400.svg" alt={post.imageAlt} fill className="object-cover" />
          </div>
          <div className="p-5">
            <div className="text-sm text-gray-600">
              <span className="rounded bg-gray-100 px-2 py-0.5 font-medium text-gray-800">{post.category}</span>
              <span className="mx-2">•</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(locale)}</time>
              <span className="mx-2">•</span>
              <span>{post.readTime} {(messages as any)?.blogPage?.labels?.read ?? "min read"}</span>
            </div>
            <div className="prose prose-gray mt-4 max-w-none">
              <p>{post.excerpt}</p>
              <p>
                This is a sample article page generated from your messages. Replace with real content or connect a CMS.
                We keep the structure simple: intro, image, and a few paragraphs/bullets for readability.
              </p>
              <ul>
                <li>Key point one relevant to the topic</li>
                <li>Key point two with a short explanation</li>
                <li>Key point three that ties back to your services</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </PageBackground>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const messages = await getMessages();
  const posts = ((messages as any)?.blogPage?.posts ?? []) as any[];
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: { images: [{ url: "https://img5.pic.in.th/file/secure-sv1/origenmetadata.png" }] },
    twitter: { card: "summary_large_image", images: ["https://img5.pic.in.th/file/secure-sv1/origenmetadata.png"] },
  };
}
