import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CubesCanvas } from "@/components/visuals/CubesCanvas";
import { ProductScreenshot } from "@/components/visuals/ProductScreenshot";
import { siteImages } from "@/lib/productScreenshots";
import type { Dict } from "@/lib/i18n";

export function Hero({ locale, dict }: { locale: string; dict: Dict }) {
  const { site, cta, pages, home } = dict;

  return (
    <section className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden">
      <Image
        src={siteImages.ayacucho}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="hero-atmosphere absolute inset-0 opacity-80" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 60% 40%, black, transparent)",
        }}
        aria-hidden
      />
      <CubesCanvas />

      <Container className="relative grid min-h-[calc(100svh-4.25rem)] items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="max-w-xl">
          <p className="animate-fade-in tech-eyebrow-light">{site.differential}</p>
          <h1 className="animate-fade-up mt-4 font-[family-name:var(--font-syne)] text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {site.tagline}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            {site.description}
          </p>
          <ul
            className="animate-fade-up mt-6 flex flex-wrap gap-2"
            style={{ animationDelay: "180ms" }}
            aria-label="Áreas de RYJEC"
          >
            {home.heroTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/75 backdrop-blur-sm sm:text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div
            className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "220ms" }}
          >
            <Button href={`/${locale}/contacto`} variant="primary" className="min-w-[16rem]">
              {cta.primary}
            </Button>
            <Button href={`/${locale}/soluciones`} variant="onDark" className="min-w-[14rem]">
              {cta.secondary}
            </Button>
          </div>
        </div>

        <div
          className="animate-fade-up w-full max-w-xl justify-self-end lg:max-w-none"
          style={{ animationDelay: "280ms" }}
        >
          <ProductScreenshot
            src={siteImages.dashboard}
            alt={pages.soluciones.screenshotCaptions.dashboard}
            caption={pages.soluciones.screenshotCaptions.dashboard}
            variant="hero"
            url="panel.asiscole.com"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
