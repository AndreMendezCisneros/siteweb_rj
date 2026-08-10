export function SectorMarquee({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  const list = [...items, ...items];

  return (
    <section className="border-y border-border bg-surface/70 py-8" aria-label={title}>
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {title}
      </p>
      <div className="marquee-mask relative overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-3">
          {list.map((item, index) => (
            <span
              key={`${item}-${index}`}
              aria-hidden={index >= items.length}
              className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
