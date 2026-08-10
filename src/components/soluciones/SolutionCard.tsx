import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

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
  return (
    <Link
      href={href}
      className="solution-glow group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {image ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" aria-hidden />
          {icon ? (
            <span className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white/90 text-primary shadow-sm backdrop-blur-sm">
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
        {meta ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-hover">
            {meta}
          </p>
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
