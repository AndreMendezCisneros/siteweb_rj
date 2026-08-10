import Link from "next/link";

export function Logo({
  className = "",
  light = false,
  href = "/",
}: {
  className?: string;
  light?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
      aria-label="RYJEC — Inicio"
    >
      <span
        className={`relative flex h-9 w-9 items-center justify-center rounded-[0.55rem] ${
          light ? "bg-white/15 text-white" : "bg-primary text-white"
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
          <path
            d="M6 22c4-8 8-12 10-12s6 4 10 12"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M8 16h16"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </span>
      <span
        className={`font-[family-name:var(--font-syne)] text-xl font-bold tracking-[0.04em] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        RYJEC
      </span>
    </Link>
  );
}
