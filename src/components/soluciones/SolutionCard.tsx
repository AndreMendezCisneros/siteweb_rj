import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { isPhoneScreenshot } from "@/components/visuals/ProductScreenshot";

export function SolutionCard({
  href,
  name,
  summary,
  meta,
  ctaLabel,
  icon,
  image,
}: {
  href: string;
  name: string;
  summary: string;
  meta?: string;
  ctaLabel: string;
  icon?: ReactNode;
  image?: string;
}) {
  const phonePreview = Boolean(image && isPhoneScreenshot(image));

  return (
    <Link
      href={href}
      className="solution-glow group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {image ? (
        <div
          className={`relative overflow-hidden border-b border-border ${
            phonePreview ? "flex h-52 items-end justify-center px-6 pt-6" : "h-44 bg-ink"
          }`}
        >
          {phonePreview ? (
            <>
              <Image
                src="/images/foto_pl.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-ink/45" aria-hidden />
              <div className="relative h-full w-[7.5rem] overflow-hidden rounded-t-[1.1rem] border border-b-0 border-white/25 bg-surface shadow-lg">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  sizes="120px"
                />
              </div>
            </>
          ) : (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          {!phonePreview ? (
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent"
              aria-hidden
            />
          ) : null}
          {meta ? (
            <span className="absolute right-3 top-3 rounded border border-white/15 bg-ink/70 px-2 py-0.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
              {meta}
            </span>
          ) : null}
          {icon && !phonePreview ? (
            <span className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-white/20 bg-white/10 text-accent-glow shadow-sm backdrop-blur-sm">
              {icon}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        {!image && icon ? (
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-primary-soft text-primary transition duration-300 group-hover:bg-accent group-hover:text-white">
            {icon}
          </span>
        ) : null}
        {meta && !image ? (
          <p className="tech-eyebrow text-primary-hover">{meta}</p>
        ) : null}
        <h3 className="mt-2 font-[family-name:var(--font-syne)] text-xl font-semibold text-ink transition group-hover:text-primary">
          {name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{summary}</p>
        <span className="mt-5 text-sm font-semibold text-accent transition group-hover:translate-x-0.5">
          {ctaLabel} →
        </span>
      </div>
    </Link>
  );
}
