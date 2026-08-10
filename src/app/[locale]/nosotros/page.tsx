import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ValueIcon } from "@/components/visuals/Icons";
import { getDict } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale).pages.nosotros;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function NosotrosPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { site, history, values } = dict;
  const t = dict.pages.nosotros;

  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} description={t.heroDescription} />

      {/* Quiénes somos: texto + imagen con decoración */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionHeading title={t.whoTitle} description={site.definition} />
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">{t.whoText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {dict.positioning.map((point) => (
                <span
                  key={point.title}
                  className="rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {point.title}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure className="relative">
              <div
                className="absolute -left-4 -top-4 h-20 w-20 rounded-2xl border-2 border-accent/40"
                aria-hidden
              />
              <div
                className="absolute -bottom-5 -right-5 h-28 w-28 rounded-2xl bg-primary/10"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[var(--radius-lg)] shadow-md">
                <Image
                  src="/images/showcase-team.png"
                  alt={dict.home.showcase.caption}
                  width={1024}
                  height={768}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="mt-3 text-xs text-muted">
                {dict.home.showcase.caption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Historia: línea de tiempo vertical */}
      <Section band>
        <SectionHeading eyebrow={t.historyEyebrow} title={history.title} />
        <ol className="relative mt-12 max-w-3xl space-y-10 border-l-2 border-primary/15 pl-8 sm:pl-10">
          {history.paragraphs.map((paragraph, index) => (
            <li key={paragraph.slice(0, 32)} className="relative">
              <span
                className={`absolute -left-[2.65rem] top-0.5 flex h-9 w-9 items-center justify-center rounded-full font-[family-name:var(--font-syne)] text-sm font-bold sm:-left-[3.15rem] ${
                  index === history.paragraphs.length - 1
                    ? "bg-accent text-white shadow-md"
                    : "border-2 border-primary/25 bg-surface text-primary"
                }`}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <Reveal delay={index * 80}>
                <p className="text-base leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Filosofía: panel oscuro con atmósfera de marca */}
      <Section>
        <Reveal>
          <div className="hero-atmosphere relative overflow-hidden rounded-[var(--radius-lg)] px-6 py-14 sm:px-12 lg:px-16">
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.1) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.1) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
              aria-hidden
            />
            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                {t.philosophyEyebrow}
              </p>
              <p className="mt-5 font-[family-name:var(--font-syne)] text-3xl font-semibold leading-snug text-white sm:text-4xl">
                “{site.philosophy}”
              </p>
              <p className="mt-6 text-lg leading-relaxed text-white/80">{site.promise}</p>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-10 bg-accent" aria-hidden />
                <p className="font-[family-name:var(--font-syne)] text-base font-semibold text-white/90">
                  {site.differential}
                </p>
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65">
                {site.origin}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Valores con iconos */}
      <Section band>
        <SectionHeading
          eyebrow={t.valuesEyebrow}
          title={t.valuesTitle}
          description={t.valuesDescription}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <li key={value.title}>
              <Reveal
                delay={index * 70}
                className="group h-full rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-primary-soft text-primary transition duration-300 group-hover:bg-accent group-hover:text-white">
                  <ValueIcon index={index} />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-syne)] text-lg font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
