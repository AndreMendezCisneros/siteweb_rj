import Image from "next/image";

function isPhoneScreenshot(src: string) {
  return src.includes("app_asistencia") || src.includes("page_portal_padres");
}

export function ProductScreenshot({
  src,
  alt,
  caption,
  variant = "default",
  device,
  url = "panel.asiscole.com",
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  variant?: "hero" | "default";
  device?: "browser" | "phone";
  url?: string;
  className?: string;
  priority?: boolean;
}) {
  const isHero = variant === "hero";
  const isPhone = device === "phone" || (device !== "browser" && isPhoneScreenshot(src));

  if (isPhone) {
    return (
      <figure className={`relative mx-auto w-full max-w-[12.5rem] sm:max-w-[14rem] ${className}`}>
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-ink p-[0.4rem] shadow-md ring-1 ring-black/5">
          <div className="relative overflow-hidden rounded-[1.35rem] bg-surface">
            <span
              className="absolute left-1/2 top-1.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-ink/15"
              aria-hidden
            />
            <Image
              src={src}
              alt={alt}
              width={390}
              height={844}
              priority={priority}
              className="h-auto w-full object-cover object-top"
              sizes="(max-width: 640px) 200px, 224px"
            />
          </div>
        </div>
        {caption ? (
          <figcaption className={`mt-3 text-center text-xs ${isHero ? "text-white/55" : "text-muted"}`}>
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={`relative ${className}`}>
      {isHero ? (
        <div
          className="pointer-events-none absolute -inset-4 rounded-[1.5rem] bg-accent/20 blur-3xl"
          aria-hidden
        />
      ) : null}
      <div
        className={`tech-browser relative overflow-hidden rounded-[1rem] border shadow-lg ${
          isHero
            ? "border-white/15 bg-ink/40 shadow-black/30 backdrop-blur-md"
            : "border-border bg-surface shadow-md"
        }`}
      >
        <div
          className={`flex items-center gap-2 border-b px-3 py-2.5 sm:px-4 ${
            isHero ? "border-white/10 bg-ink/70" : "border-border bg-ink/[0.03]"
          }`}
        >
          <span className="flex gap-1.5" aria-hidden>
            <span className={`h-2.5 w-2.5 rounded-full ${isHero ? "bg-white/20" : "bg-border"}`} />
            <span className={`h-2.5 w-2.5 rounded-full ${isHero ? "bg-white/15" : "bg-border"}`} />
            <span className={`h-2.5 w-2.5 rounded-full ${isHero ? "bg-white/10" : "bg-border"}`} />
          </span>
          <span
            className={`min-w-0 flex-1 truncate rounded-md px-3 py-1 font-mono text-[0.65rem] sm:text-xs ${
              isHero ? "bg-white/10 text-white/55" : "bg-primary-soft/80 text-muted"
            }`}
          >
            {url}
          </span>
          <span
            className={`hidden rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider sm:inline ${
              isHero ? "bg-accent/25 text-accent" : "bg-primary-soft text-primary"
            }`}
          >
            Live
          </span>
        </div>
        <Image
          src={src}
          alt={alt}
          width={1280}
          height={800}
          priority={priority}
          className="h-auto w-full object-cover object-top"
          sizes={isHero ? "(max-width: 1024px) 100vw, 560px" : "(max-width: 1024px) 100vw, 36rem"}
        />
      </div>
      {caption ? (
        <figcaption className={`mt-3 text-xs ${isHero ? "text-white/55" : "text-muted"}`}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export { isPhoneScreenshot };
