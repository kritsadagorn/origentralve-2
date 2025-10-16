import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Inter for English (latin)
const inter = localFont({
  src: [
    { path: "../public/fonts/inter/Inter_18pt-Thin.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/inter/Inter_18pt-ThinItalic.woff2", weight: "100", style: "italic" },
    { path: "../public/fonts/inter/Inter_18pt-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/inter/Inter_18pt-ExtraLightItalic.woff2", weight: "200", style: "italic" },
    { path: "../public/fonts/inter/Inter_18pt-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/inter/Inter_18pt-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../public/fonts/inter/Inter_18pt-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/inter/Inter_18pt-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/inter/Inter_18pt-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/inter/Inter_18pt-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/inter/Inter_18pt-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/inter/Inter_18pt-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

// Prompt for Thai
const prompt = localFont({
  src: [
    { path: "../public/fonts/prompt/Prompt-Thin.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/prompt/Prompt-ThinItalic.woff2", weight: "100", style: "italic" },
    { path: "../public/fonts/prompt/Prompt-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/prompt/Prompt-ExtraLightItalic.woff2", weight: "200", style: "italic" },
    { path: "../public/fonts/prompt/Prompt-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/prompt/Prompt-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../public/fonts/prompt/Prompt-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/prompt/Prompt-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/prompt/Prompt-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/prompt/Prompt-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/prompt/Prompt-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/prompt/Prompt-BoldItalic.woff2", weight: "700", style: "italic" }
  ],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Origen Travel | Corporate, Study, Culture & Wellness Programs",
    template: "%s | Origen Travel",
  },
  description:
    "Origen Travel — ผู้เชี่ยวชาญทริปดูงาน, การศึกษา, แลกเปลี่ยนวัฒนธรรม และทริปเพื่อสุขภาพสำหรับองค์กร หน่วยงานรัฐ และสถาบันการศึกษา",
  metadataBase: new URL("https://www.example.com"),
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Origen Travel",
    type: "website",
    locale: "th_TH",
    title: "Origen Travel",
    description:
      "ผู้เชี่ยวชาญทริปดูงาน, การศึกษา, แลกเปลี่ยนวัฒนธรรม และทริปเพื่อสุขภาพสำหรับองค์กร",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${prompt.variable}`}>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
