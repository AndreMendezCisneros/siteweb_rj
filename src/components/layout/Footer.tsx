import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import type { Dict } from "@/lib/i18n";

export function Footer({ locale, dict }: { locale: string; dict: Dict }) {
  const { site, nav, footer, products, services } = dict;

  function localized(href: string) {
    return `/${locale}${href === "/" ? "" : href}`;
  }

  return (
    <footer className="mt-auto px-2 pt-4 sm:px-4">
      <div className="rounded-t-[2.5rem] bg-ink text-white">
        <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo light href={`/${locale}`} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {site.definition}
            </p>
            <p className="mt-4 font-[family-name:var(--font-syne)] text-sm font-semibold text-white/90">
              {site.tagline}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/55">
              {footer.navTitle}
            </h2>
            <ul className="mt-4 space-y-2">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localized(link.href)}
                    className="text-sm text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/55">
              {footer.productsTitle}
            </h2>
            <ul className="mt-4 space-y-2">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={localized(`/soluciones/${product.slug}`)}
                    className="text-sm text-white/80 transition hover:text-white"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-white/55">
              {footer.servicesTitle}
            </h2>
            <ul className="mt-4 space-y-2">
              {services.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={localized(`/soluciones/${service.slug}`)}
                    className="text-sm text-white/80 transition hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={localized("/soluciones")}
                  className="text-sm text-white/80 transition hover:text-white"
                >
                  {footer.seeAll}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/55">
              {footer.contactTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={`mailto:${site.emails.contact}`}
                  className="transition hover:text-white"
                >
                  {site.emails.contact}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.emails.support}`}
                  className="transition hover:text-white"
                >
                  {site.emails.support}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition hover:text-white">
                  {site.phone}
                </a>
              </li>
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="transition hover:text-white">
                    {phone}
                  </a>
                </li>
              ))}
              <li>{footer.location}</li>
            </ul>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <Link href={localized("/legal/privacidad")} className="text-white/65 hover:text-white">
                {footer.privacy}
              </Link>
              <Link href={localized("/legal/cookies")} className="text-white/65 hover:text-white">
                {footer.cookies}
              </Link>
            </div>
          </div>
        </Container>

        <div className="border-t border-white/10">
          <Container className="flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} RYJEC. {footer.rights}
            </p>
            <p>{site.philosophy}</p>
          </Container>
        </div>
      </div>
    </footer>
  );
}
