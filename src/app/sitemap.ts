import type { MetadataRoute } from "next";
import { es } from "@/content/es";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/nosotros",
    "/soluciones",
    "/como-trabajamos",
    "/impacto",
    "/contacto",
    "/legal/privacidad",
    "/legal/cookies",
  ];

  const solutionRoutes = [
    ...es.products.map((p) => `/soluciones/${p.slug}`),
    ...es.services.map((s) => `/soluciones/${s.slug}`),
  ];

  const now = new Date();
  const allPaths = [...staticRoutes, ...solutionRoutes];

  return locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: `${es.site.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/soluciones/") ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${es.site.url}/${alt}${path}`]),
        ),
      },
    })),
  );
}
