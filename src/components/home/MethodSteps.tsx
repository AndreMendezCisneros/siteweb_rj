type Step = { step: string; title: string; description: string };

export function MethodSteps({
  steps,
  compact = false,
}: {
  steps: readonly Step[];
  compact?: boolean;
}) {
  return (
    <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((item, index) => (
        <li
          key={item.step}
          className="animate-step rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-sm"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <p className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-[0.16em] text-accent">
            {item.step}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
            {item.title}
          </h3>
          {!compact ? (
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
