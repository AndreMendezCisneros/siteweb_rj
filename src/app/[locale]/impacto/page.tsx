import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PeruMap } from "@/components/visuals/PeruMap";
import { getDict } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale).pages.impacto;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ImpactoPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.pages.impacto;

  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.title} description={t.intro} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading title={t.rootsTitle} description={dict.site.origin} />
            <ul className="mt-10 space-y-5">
              {t.items.map((item) => (
                <li
                  key={item.title}
                  className="rounded-[var(--radius-lg)] border border-border bg-surface p-6"
                >
                  <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <figure>
              <div className="overflow-hidden rounded-[var(--radius-lg)] shadow-md">
                <Image
                  src="/images/impacto-ayacucho.png"
                  alt={t.imageCaption}
                  width={1024}
                  height={768}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="mt-3 text-xs text-muted">{t.imageCaption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section band>
        <SectionHeading title={t.mapTitle} description={t.mapDescription} />
        <div className="mt-10">
          <PeruMap
            points={dict.map.points}
            labels={{
              zoomIn: dict.map.zoomIn,
              zoomOut: dict.map.zoomOut,
              reset: dict.map.reset,
              legendHq: dict.map.legendHq,
              legendFuture: dict.map.legendFuture,
            }}
          />
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading title={t.successTitle} description={t.successDescription} />
          <ul className="mt-8 max-w-2xl space-y-3 text-base leading-relaxed text-muted">
            {t.successPoints.map((point) => (
              <li key={point}>— {point}</li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">{t.successNote}</p>
        </Reveal>
      </Section>

      <CtaBand locale={locale} dict={dict} title={t.ctaTitle} description={t.ctaDescription} />
    </>
  );
}
