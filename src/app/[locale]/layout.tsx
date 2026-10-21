import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Source_Sans_3, Syne } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getDict, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  const { site } = dict;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.definition,
    icons: {
      icon: [
        { url: "/favicon.ico?v=3", sizes: "any" },
        { url: "/favicon-32.png?v=3", type: "image/png", sizes: "32x32" },
        { url: "/favicon.png?v=3", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180" }],
      shortcut: "/favicon.ico?v=3",
    },
    openGraph: {
      type: "website",
      locale: site.ogLocale,
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: `${site.name} — ${site.tagline}`,
      description: site.definition,
      images: [
        {
          url: "/images/logo_ryjec_figura_sf.png",
          width: 512,
          height: 512,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.tagline}`,
      description: site.definition,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDict(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dict.site.name,
    url: dict.site.url,
    email: dict.site.emails.contact,
    description: dict.site.definition,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ayacucho",
      addressCountry: "PE",
    },
  };

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${sourceSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-md)] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          {dict.ui.skipToContent}
        </a>
        <Header
          locale={locale}
          nav={dict.nav}
          socials={dict.site.socials}
          ctaLabel={dict.cta.talk}
          openMenuLabel={dict.ui.openMenu}
          closeMenuLabel={dict.ui.closeMenu}
        />
        <main id="contenido-principal" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppFloat
          digits={dict.site.whatsappDigits}
          label={dict.whatsappFloat.label}
          message={dict.whatsappFloat.message}
        />
      </body>
    </html>
  );
}
