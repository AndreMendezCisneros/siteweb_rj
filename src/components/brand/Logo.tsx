import Image from "next/image";
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
      <Image
        src="/images/logo_ryjec_figura_sf.png"
        alt=""
        width={40}
        height={40}
        className={`h-10 w-10 object-contain ${light ? "brightness-0 invert" : ""}`}
        priority
      />
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
