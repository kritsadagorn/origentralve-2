import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export default function BlogPage() {
  return <ClientPage />;
}

export const metadata: Metadata = {
  title: "บล็อก & อินไซต์การท่องเที่ยว | Origen Travel",
  description:
    "อัปเดตเทรนด์ท่องเที่ยวเชิงการเรียนรู้ ทริปองค์กร และ Study Tour ในเอเชียและญี่ปุ่น พร้อมเคสจริงและบทวิเคราะห์",
  keywords: [
    "บล็อกท่องเที่ยว",
    "Study Tour",
    "Corporate Learning",
    "เทรนด์ท่องเที่ยว",
    "ญี่ปุ่น",
    "เอเชีย",
  ],
  openGraph: {
    title: "บล็อก Origen Travel",
    description:
      "มุมมองและบทความจากประสบการณ์จริง สู่การออกแบบทริปที่มีคุณค่า",
    images: [{ url: "https://img5.pic.in.th/file/secure-sv1/origenmetadata.png" }],
  },
  twitter: { card: "summary_large_image", images: ["https://img5.pic.in.th/file/secure-sv1/origenmetadata.png"] },
};
