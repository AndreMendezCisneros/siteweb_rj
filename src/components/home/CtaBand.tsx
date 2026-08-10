import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dict } from "@/lib/i18n";

export function CtaBand({
  locale,
  dict,
  title,
  description,
}: {
  locale: string;
  dict: Dict;
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-10 sm:py-12 lg:py-14">
      <Container>
        <div className="overflow-hidden rounded-[var(--radius-lg)] bg-primary px-6 py-12 sm:px-10 lg:px-14">
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title ?? dict.cta.bandTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              {description ?? dict.cta.bandDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`/${locale}/contacto`} variant="primary">
                {dict.cta.advice}
              </Button>
              <Button href={`/${locale}/como-trabajamos`} variant="onDark">
                {dict.cta.howWeWork}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
