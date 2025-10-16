import { redirect } from "next/navigation";
import { defaultLocale } from "../i18n/config";

// Redirect root path to the default locale (handled by [locale] segment)
export default function Home() {
  redirect(`/${defaultLocale}`);
}
