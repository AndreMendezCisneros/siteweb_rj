import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProductScreenshot } from "@/components/visuals/ProductScreenshot";
import { getProductScreenshots } from "@/lib/productScreenshots";
import { getDict, locales } from "@/lib/i18n";
import { getAllSolutions, getSolution, getSolutionSlugs } from "@/lib/solutions";
import { es } from "@/content/es";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getSolutionSlugs(es).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = getSolution(getDict(locale), slug);
  if (!solution) return {};

  return {
    title: solution.name,
    description: solution.summary,
  };
}


function secondaryCaption(
  dict: ReturnType<typeof getDict>,
  slug: string,
  src: string,
) {
  const captions = dict.pages.soluciones.screenshotCaptions;
  if (src.endsWith("app_asistencia.jpg")) return captions.messagingApp;
  if (src.endsWith("page_portal_padres.png")) return captions.parentPortal;
  if (slug === "asiscole") return captions.dashboard;
  return captions.parentPortal;
}

export default async function SolutionPage({ params }: Props) {
  const { locale, slug } = await params;
  const dict = getDict(locale);
  const solution = getSolution(dict, slug);

  if (!solution) notFound();

  const t = dict.pages.soluciones;
  const related = getAllSolutions(dict)
    .filter((item) => item.slug !== solution.slug)
    .slice(0, 3);

  const screenshots = getProductScreenshots(solution.slug);

  return (
    <>
      <PageHero
        eyebrow={solution.kind === "product" ? dict.ui.product : dict.ui.service}
        title={solution.name}
        description={solution.summary}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <SectionHeading title={t.detailTitle} description={solution.description} />
            {solution.kind === "product" ? (
              <ul className="mt-8 space-y-3">
                {solution.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-base leading-relaxed text-muted">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-8 space-y-3 text-base leading-relaxed text-muted">
                {dict.serviceBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {solution.kind === "product" && solution.image ? (
              <figure className="mt-8 max-w-xl">
                <div className="overflow-hidden rounded-[var(--radius-lg)] shadow-md">
                  <Image
                    src={solution.image}
                    alt={solution.name}
                    width={1024}
                    height={768}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 36rem"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-muted">
                  {solution.audience} — {solution.name}
                </figcaption>
              </figure>
            ) : null}

            {screenshots ? (
              <div className="mt-8 max-w-xl">
                <ProductScreenshot
                  src={screenshots.secondary}
                  alt={secondaryCaption(dict, solution.slug, screenshots.secondary)}
                  caption={secondaryCaption(dict, solution.slug, screenshots.secondary)}
                />
              </div>
            ) : (
              <div className="mt-8 max-w-xl rounded-[var(--radius-lg)] border border-border bg-surface p-6 text-sm leading-relaxed text-muted">
                {t.illustrationCaption}
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 lg:sticky lg:top-24">
            {solution.kind === "product" ? (
              <p className="text-sm text-muted">
                {dict.ui.focusedOn}{" "}
                <span className="font-semibold text-ink">{solution.audience}</span>
              </p>
            ) : (
              <p className="text-sm text-muted">
                {dict.ui.brandService} <span className="font-semibold text-ink">RYJEC</span>
              </p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-muted">{dict.site.differential}</p>
            <div className="mt-6">
              <Button href={`/${locale}/contacto`} className="w-full">
                {dict.cta.talk}
              </Button>
            </div>
            <Link
              href={`/${locale}/como-trabajamos`}
              className="text-link mt-4 inline-block text-sm"
            >
              {dict.ui.viewMethodology} →
            </Link>
          </aside>
        </div>
      </Section>

      <Section band>
        <SectionHeading title={dict.ui.otherSolutions} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${locale}/soluciones/${item.slug}`}
                className="block rounded-[var(--radius-md)] border border-border bg-surface p-5 transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-hover">
                  {item.kind === "product" ? dict.ui.product : dict.ui.service}
                </p>
                <p className="mt-2 font-[family-name:var(--font-syne)] font-semibold text-ink">
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
