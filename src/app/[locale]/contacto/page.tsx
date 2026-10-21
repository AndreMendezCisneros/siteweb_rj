import type { Metadata } from "next";
import { ContactForm } from "@/components/contacto/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getDict } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale).pages.contacto;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { site } = dict;
  const t = dict.pages.contacto;
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(
    dict.whatsappFloat.message,
  )}`;

  return (
    <>
      <PageHero
        eyebrow={t.heroEyebrow}
        title={dict.cta.primary}
        description={t.heroDescription}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-ink">
              {t.formTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.formDescription}</p>
            <div className="mt-8">
              <ContactForm
                t={dict.form}
                submitLabel={dict.cta.submit}
                contactEmail={site.emails.contact}
              />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
              <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                {t.afterTitle}
              </h2>
              <ol className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
                {t.afterSteps.map((step) => (
                  <li key={step.title}>
                    <span className="font-semibold text-ink">{step.title}</span> {step.text}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                {t.phoneTitle}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-primary-hover">
                    {t.phoneCall}
                  </span>
                  <a
                    href={phoneHref}
                    className="mt-1 inline-block font-medium text-ink underline-offset-2 hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {site.phone}
                  </a>
                  <ul className="mt-2 space-y-1">
                    {site.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="font-medium text-ink underline-offset-2 hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-primary-hover">
                    WhatsApp
                  </span>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-medium text-ink underline-offset-2 hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {t.whatsappLabel} →
                  </a>
                </li>
              </ul>
            </div>

            <SocialLinks socials={site.socials} title={t.socialsTitle} />

            <div>
              <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                {t.emailsTitle}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-primary-hover">
                    {t.emailMain}
                  </span>
                  <a
                    href={`mailto:${site.emails.contact}`}
                    className="mt-1 inline-block font-medium text-ink underline-offset-2 hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {site.emails.contact}
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-primary-hover">
                    {t.emailSupport}
                  </span>
                  <a
                    href={`mailto:${site.emails.support}`}
                    className="mt-1 inline-block font-medium text-ink underline-offset-2 hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {site.emails.support}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                {t.whereTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.whereText}</p>
            </div>

            <div className="rounded-[var(--radius-lg)] bg-primary-soft p-6">
              <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-ink">
                {site.philosophy}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{site.differential}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
