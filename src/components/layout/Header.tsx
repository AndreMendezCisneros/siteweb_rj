"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

type NavLink = { href: string; label: string };

export function Header({
  locale,
  nav,
  ctaLabel,
  openMenuLabel,
  closeMenuLabel,
}: {
  locale: string;
  nav: readonly NavLink[];
  ctaLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function localized(href: string) {
    return `/${locale}${href === "/" ? "" : href}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/95 shadow-sm backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <Logo href={`/${locale}`} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {nav.map((link) => {
            const target = localized(link.href);
            const active =
              link.href === "/" ? pathname === `/${locale}` : pathname.startsWith(target);
            return (
              <Link
                key={link.href}
                href={target}
                className={`rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-foreground/80 hover:bg-primary-soft/70 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle current={locale} />
          <Button
            href={localized("/contacto")}
            variant="primary"
            className="!py-2.5 !text-[0.8125rem]"
          >
            {ctaLabel}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle current={locale} />
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-border text-ink transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? closeMenuLabel : openMenuLabel}</span>
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {open ? (
        <div id={menuId} className="border-t border-border bg-surface lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((link, index) => (
              <Link
                key={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={localized(link.href)}
                className="rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium text-foreground hover:bg-primary-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {link.label}
              </Link>
            ))}
            <Button href={localized("/contacto")} className="mt-2 w-full">
              {ctaLabel}
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
