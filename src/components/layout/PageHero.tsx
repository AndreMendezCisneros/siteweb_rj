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
    <section className="relative overflow-hidden border-b border-white/10 bg-ink">
      <div className="hero-atmosphere absolute inset-0 opacity-90" aria-hidden />
      <div className="tech-grid-light absolute inset-0 opacity-30" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.1) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 90% at 70% 0%, black, transparent)",
        }}
        aria-hidden
      />

      <Container className="relative py-10 sm:py-12 lg:py-14">
        {eyebrow ? <p className="tech-eyebrow-light">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/72">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}
