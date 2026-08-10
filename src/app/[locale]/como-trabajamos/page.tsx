import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/home/CtaBand";
import { MethodSteps } from "@/components/home/MethodSteps";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getDict } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale).pages.comoTrabajamos;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ComoTrabajamosPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.pages.comoTrabajamos;

  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} description={t.heroDescription} />

      <Section>
        <SectionHeading title={t.stagesTitle} description={t.stagesDescription} />
        <MethodSteps steps={dict.methodology} />
      </Section>

      {/* Detalle de etapas: línea de tiempo alternada */}
      <Section band>
        <SectionHeading title={t.detailTitle} />
        <ol className="relative mt-10 space-y-0">
          {/* Línea central en desktop, lateral en móvil */}
          <span
            className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-primary/10 via-primary/25 to-accent/40 lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden
          />
          {dict.methodology.map((item, index) => {
            const isLast = index === dict.methodology.length - 1;
            const alignRight = index % 2 === 1;
            return (
              <li key={item.step} className="relative pb-12 pl-16 last:pb-0 lg:pl-0">
                <span
                  className={`absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full font-[family-name:var(--font-syne)] text-sm font-bold shadow-sm lg:left-1/2 lg:-translate-x-1/2 ${
                    isLast
                      ? "bg-accent text-white"
                      : "border-2 border-primary/30 bg-surface text-primary"
                  }`}
                  aria-hidden
                >
                  {item.step}
                </span>
                <div
                  className={`lg:w-[calc(50%-3.5rem)] ${
                    alignRight ? "lg:ml-auto lg:pl-0" : "lg:mr-auto"
                  }`}
                >
                  <Reveal delay={index * 60}>
                    <article
                      className={`rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-sm transition duration-300 hover:border-primary/30 hover:shadow-md ${
                        alignRight ? "" : "lg:text-right"
                      }`}
                    >
                      <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Transparencia: panel oscuro con imagen */}
      <Section>
        <Reveal>
          <div className="grid overflow-hidden rounded-[var(--radius-lg)] bg-ink lg:grid-cols-[1.1fr_0.9fr]">
            <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/55">
                {t.heroEyebrow}
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {t.transparencyTitle}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                {t.transparencyDescription}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-10 bg-accent" aria-hidden />
                <p className="text-sm leading-relaxed text-white/65">{dict.site.promise}</p>
              </div>
            </div>
            <div className="relative min-h-[16rem]">
              <Image
                src="/images/video-poster.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
