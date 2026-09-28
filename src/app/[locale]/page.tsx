import Link from "next/link";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { InsightsCarousel, type CarouselSlide } from "@/components/home/InsightsCarousel";
import { MethodSteps } from "@/components/home/MethodSteps";
import { ScrollShowcase } from "@/components/home/ScrollShowcase";
import { SectorMarquee } from "@/components/home/SectorMarquee";
import { VideoSection } from "@/components/home/VideoSection";
import { SolutionCard } from "@/components/soluciones/SolutionCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SolutionIcon } from "@/components/visuals/Icons";
import { PeruMap } from "@/components/visuals/PeruMap";
import { siteImages } from "@/lib/productScreenshots";
import { getDict } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { site, home } = dict;

  const carouselSlides: CarouselSlide[] = [
    ...dict.products.map((product) => ({
      eyebrow: `${product.category} · ${product.audience}`,
      title: product.name,
      description: product.summary,
      href: `/${locale}/soluciones/${product.slug}`,
      cta: dict.ui.knowMore,
      image: product.image,
    })),
    {
      eyebrow: home.method.eyebrow,
      title: home.method.title,
      description: home.method.description,
      href: `/${locale}/como-trabajamos`,
      cta: dict.ui.viewMethodology,
      image: siteImages.team,
    },
    {
      eyebrow: home.map.eyebrow,
      title: home.map.title,
      description: home.map.description,
      href: `/${locale}/impacto`,
      cta: dict.ui.knowMore,
      image: siteImages.ayacucho,
    },
  ];

  return (
    <>
      {/* 1. Hero animado */}
      <Hero locale={locale} dict={dict} />

      {/* 2. Marquee de sectores */}
      <SectorMarquee title={dict.sectorsTitle} items={dict.sectors} />

      {/* 3. Qué es RYJEC + ScrollShowcase */}
      <Section id="que-es">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow={home.whatIs.eyebrow}
              title={home.whatIs.title}
              description={site.definition}
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {site.philosophy} {home.whatIs.extra}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {home.showcase.description}
            </p>
          </Reveal>
          <ScrollShowcase
            image={siteImages.team}
            alt={home.showcase.caption}
            caption={home.showcase.caption}
          />
        </div>
      </Section>

      {/* 4. Soluciones (grid glow) */}
      <Section band id="soluciones">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={home.solutions.eyebrow}
            title={home.solutions.title}
            description={home.solutions.description}
          />
          <Link href={`/${locale}/soluciones`} className="text-link text-sm">
            {home.solutions.seeAll}
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
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

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.services.slice(0, 3).map((service, index) => (
            <Reveal key={service.slug} delay={index * 90} className="h-full">
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

      {/* 5. Carrusel de exploración */}
      <Section id="explora">
        <SectionHeading eyebrow={home.insights.eyebrow} title={home.insights.title} />
        <div className="mt-8">
          <InsightsCarousel
            slides={carouselSlides}
            prevLabel={dict.ui.prev}
            nextLabel={dict.ui.next}
          />
        </div>
      </Section>

      {/* 6. Video institucional */}
      <VideoSection
        eyebrow={home.video.eyebrow}
        title={home.video.title}
        description={home.video.description}
        comingSoon={home.video.comingSoon}
      />

      {/* Diferencial */}
      <Section band id="diferencial">
        <Reveal>
          <SectionHeading
            eyebrow={home.differential.eyebrow}
            title={site.differential}
            description={home.differential.description}
          />
        </Reveal>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {dict.positioning.map((point, index) => (
            <li key={point.title}>
              <Reveal delay={index * 100} className="border-l-2 border-accent pl-5">
                <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Metodología */}
      <Section id="como-trabajamos">
        <SectionHeading
          eyebrow={home.method.eyebrow}
          title={home.method.title}
          description={home.method.description}
        />
        <MethodSteps steps={dict.methodology} />
        <div className="mt-8">
          <Link href={`/${locale}/como-trabajamos`} className="text-link text-sm">
            {home.method.link}
          </Link>
        </div>
      </Section>

      {/* 8. Mapa del Perú resumido */}
      <Section band id="origen">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow={home.map.eyebrow}
              title={home.map.title}
              description={site.origin}
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {home.map.description}
            </p>
            <Link href={`/${locale}/impacto`} className="text-link mt-6 inline-block text-sm">
              {home.map.link}
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <PeruMap
              compact
              points={dict.map.points}
              labels={{
                zoomIn: dict.map.zoomIn,
                zoomOut: dict.map.zoomOut,
                reset: dict.map.reset,
                legendHq: dict.map.legendHq,
                legendRegion: dict.map.legendRegion,
                legendFuture: dict.map.legendFuture,
                ocean: dict.map.ocean,
              }}
            />
          </Reveal>
        </div>
      </Section>

      {/* 9. CTA final */}
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
