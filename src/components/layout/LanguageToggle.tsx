"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const locales = ["es", "en"] as const;

export function LanguageToggle({ current }: { current: string }) {
  const pathname = usePathname() || "/";
  const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "") || "";

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5 text-xs font-semibold"
      aria-label="Idioma / Language"
    >
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest}`}
          aria-current={current === locale ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary ${
            current === locale
              ? "bg-primary text-white"
              : "text-muted hover:text-primary"
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
