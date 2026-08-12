import { es, type Dict } from "@/content/es";
import { en } from "@/content/en";
import { quy } from "@/content/quy";

export const locales = ["es", "en", "quy"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDict(locale: string): Dict {
  if (locale === "quy") return quy;
  if (locale === "en") return en;
  return es;
}

export function localeHref(locale: string, path: string): string {
  return `/${locale}${path === "/" ? "" : path}` || `/${locale}`;
}

export type { Dict };
