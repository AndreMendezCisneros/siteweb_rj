type Variant = "hero" | "asiscole" | "academy" | "service";

const rows = [
  { label: "Entrada", time: "07:42", state: "OK" },
  { label: "Salida", time: "13:05", state: "OK" },
  { label: "Incidencia", time: "13:18", state: "Rev." },
  { label: "Notificación", time: "13:19", state: "Env." },
];

export function ProductMock({
  variant = "hero",
  caption = "Ilustración conceptual",
  className = "",
}: {
  variant?: Variant;
  caption?: string;
  className?: string;
}) {
  const title =
    variant === "academy"
      ? "Asis Academy"
      : variant === "service"
        ? "Solución RYJEC"
        : variant === "asiscole"
          ? "AsisCole"
          : "Operación en evolución";

  const isHero = variant === "hero";

  return (
    <figure className={`relative ${className}`}>
      <div
        className={`overflow-hidden rounded-[1.1rem] border shadow-md ${
          isHero
            ? "border-white/15 bg-white/10 backdrop-blur-md"
            : "border-border bg-surface"
        }`}
        aria-hidden
      >
        <div
          className={`flex items-center justify-between border-b px-4 py-3 ${
            isHero ? "border-white/10" : "border-border"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span
              className={`font-[family-name:var(--font-syne)] text-sm font-semibold ${
                isHero ? "text-white" : "text-ink"
              }`}
            >
              {title}
            </span>
          </div>
          <span className={`text-xs ${isHero ? "text-white/55" : "text-muted"}`}>
            Vista conceptual
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-[1fr_0.85fr]">
          <div className="space-y-2">
            {rows.map((row) => (
              <div
                key={`${row.label}-${row.time}`}
                className={`flex items-center justify-between rounded-[0.65rem] px-3 py-2.5 ${
                  isHero ? "bg-white/8" : "bg-primary-soft/70"
                }`}
              >
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isHero ? "text-white" : "text-ink"
                    }`}
                  >
                    {row.label}
                  </p>
                  <p className={`text-xs ${isHero ? "text-white/55" : "text-muted"}`}>
                    {row.time}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${
                    isHero
                      ? "bg-white/12 text-white/85"
                      : "bg-surface text-primary"
                  }`}
                >
                  {row.state}
                </span>
              </div>
            ))}
          </div>

          <div
            className={`flex flex-col justify-between rounded-[0.75rem] p-4 ${
              isHero ? "bg-ink/35" : "bg-primary text-white"
            }`}
          >
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                  isHero ? "text-white/55" : "text-white/70"
                }`}
              >
                Hoy
              </p>
              <p
                className={`mt-2 font-[family-name:var(--font-syne)] text-2xl font-semibold ${
                  isHero ? "text-white" : "text-white"
                }`}
              >
                Procesos claros
              </p>
              <p className={`mt-2 text-sm leading-relaxed ${isHero ? "text-white/70" : "text-white/80"}`}>
                Tecnología útil para entender, operar y evolucionar.
              </p>
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-2/3 rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </div>
      <figcaption
        className={`mt-3 text-xs ${isHero ? "text-white/55" : "text-muted"}`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
