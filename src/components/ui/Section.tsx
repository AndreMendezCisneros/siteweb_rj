import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  id,
  band = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  band?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-10 sm:py-12 lg:py-14 ${band ? "section-band" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-[0.14em] ${
            light ? "text-white/70" : "text-primary-hover"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/80" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
