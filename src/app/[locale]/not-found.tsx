import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { es } from "@/content/es";

// El segmento not-found no recibe params: usamos español (locale por defecto)
export default function NotFound() {
  const t = es.ui.notFound;

  return (
    <Container className="flex flex-col items-start py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-hover">
        {t.code}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-syne)] text-4xl font-semibold text-ink">
        {t.title}
      </h1>
      <p className="mt-4 max-w-md text-muted">{t.text}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/es" variant="secondary">
          {t.home}
        </Button>
        <Button href="/es/contacto">{es.cta.primary}</Button>
      </div>
    </Container>
  );
}
