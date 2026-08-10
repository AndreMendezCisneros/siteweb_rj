import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { getDict } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale).pages.legalPrivacidad;
  return { title: t.metaTitle };
}

export default async function PrivacidadPage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).pages.legalPrivacidad;

  return (
    <>
      <PageHero eyebrow="Legal" title={t.heroTitle} description={t.heroDescription} />
      <Section>
        <div className="max-w-3xl space-y-6 text-base leading-relaxed text-muted">
          <p>{t.intro}</p>
          {t.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-ink">
                {section.heading}
              </h2>
              <p className="mt-3">{section.body}</p>
            </div>
          ))}
          <p className="text-sm">{t.updated}</p>
        </div>
      </Section>
    </>
  );
}
