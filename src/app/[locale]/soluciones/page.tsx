import type { Metadata } from "next";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionCard } from "@/components/soluciones/SolutionCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SolutionIcon } from "@/components/visuals/Icons";
import { getDict } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale).pages.soluciones;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function SolucionesPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.pages.soluciones;

  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} description={dict.site.promise} />

      <Section>
        <SectionHeading
          eyebrow={t.productsEyebrow}
          title={t.productsTitle}
          description={t.productsDescription}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dict.products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 90} className="h-full">
              <SolutionCard
                href={`/${locale}/soluciones/${product.slug}`}
                name={product.name}
                summary={product.summary}
                meta={`${product.category} · ${product.audience}`}
                ctaLabel={dict.ui.knowMore}
                icon={<SolutionIcon slug={product.slug} />}
                image={product.image}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section band>
        <SectionHeading
          eyebrow={t.servicesEyebrow}
          title={t.servicesTitle}
          description={t.servicesDescription}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 90} className="h-full">
              <SolutionCard
                href={`/${locale}/soluciones/${service.slug}`}
                name={service.name}
                summary={service.summary}
                meta={dict.ui.service}
                ctaLabel={dict.ui.knowMore}
                icon={<SolutionIcon slug={service.slug} />}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-[var(--radius-lg)] border border-dashed border-primary/30 bg-primary-soft/40 px-6 py-10 sm:px-10">
          <SectionHeading title={t.emptyTitle} description={t.emptyDescription} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={`/${locale}/contacto`} variant="primary">
              {dict.cta.talk}
            </Button>
            <Button href={`/${locale}/como-trabajamos`} variant="ghost">
              {dict.cta.howWeWork}
            </Button>
          </div>
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
