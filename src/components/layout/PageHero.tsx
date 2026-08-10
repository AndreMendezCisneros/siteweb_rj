import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary-soft/40">
      {/* Decoración: rejilla + brillos de marca */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(11 58 74 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(11 58 74 / 0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 75% 90% at 70% 10%, black, transparent)",
        }}
        aria-hidden
      />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-28 right-40 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute right-10 top-10 hidden h-16 w-16 rotate-12 rounded-xl border border-primary/20 lg:block"
        aria-hidden
      />
      <div
        className="absolute right-32 top-24 hidden h-9 w-9 -rotate-6 rounded-lg border border-accent/30 lg:block"
        aria-hidden
      />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        {eyebrow ? (
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary-hover">
            <span className="h-1.5 w-6 rounded-full bg-accent" aria-hidden />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}
