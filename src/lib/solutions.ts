import type { Dict } from "@/lib/i18n";

export type SolutionEntry =
  | {
      kind: "product";
      slug: string;
      name: string;
      summary: string;
      description: string;
      audience: string;
      benefits: readonly string[];
      image?: string;
      siteUrl?: string;
    }
  | {
      kind: "service";
      slug: string;
      name: string;
      summary: string;
      description: string;
    };

export function getAllSolutions(dict: Dict): SolutionEntry[] {
  const productEntries: SolutionEntry[] = dict.products.map((product) => ({
    kind: "product",
    slug: product.slug,
    name: product.name,
    summary: product.summary,
    description: product.description,
    audience: product.audience,
    benefits: product.benefits,
    image: product.image,
    siteUrl: product.siteUrl,
  }));

  const serviceEntries: SolutionEntry[] = dict.services.map((service) => ({
    kind: "service",
    slug: service.slug,
    name: service.name,
    summary: service.summary,
    description: `${service.summary} ${dict.serviceExtra}`,
  }));

  return [...productEntries, ...serviceEntries];
}

export function getSolution(dict: Dict, slug: string): SolutionEntry | undefined {
  return getAllSolutions(dict).find((item) => item.slug === slug);
}

export function getSolutionSlugs(dict: Dict): string[] {
  return getAllSolutions(dict).map((item) => item.slug);
}
