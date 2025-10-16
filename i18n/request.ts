import {getRequestConfig} from "next-intl/server";
import {locales, defaultLocale} from "./config";

export default getRequestConfig(async ({requestLocale}) => {
  const detected = await requestLocale; // requestLocale is a Promise<string | undefined>
  const supported = (locales as readonly string[]);
  const activeLocale = supported.includes(detected ?? "") ? (detected as string) : (defaultLocale as string);
  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default
  };
});
