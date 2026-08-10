import { es, type Dict } from "@/content/es";
import { en } from "@/content/en";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDict(locale: string): Dict {
  return locale === "en" ? en : es;
}

export function localeHref(locale: string, path: string): string {
  return `/${locale}${path === "/" ? "" : path}` || `/${locale}`;
}

export type { Dict };
