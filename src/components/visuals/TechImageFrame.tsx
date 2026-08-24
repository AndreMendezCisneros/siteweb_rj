import Image from "next/image";
import type { ReactNode } from "react";

export function TechImageFrame({
  src,
  alt,
  caption,
  priority = false,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <figure className={`tech-frame ${className}`}>
      <div className="tech-frame-inner relative overflow-hidden">
        <span className="tech-corner tech-corner-tl" aria-hidden />
        <span className="tech-corner tech-corner-tr" aria-hidden />
        <span className="tech-corner tech-corner-bl" aria-hidden />
        <span className="tech-corner tech-corner-br" aria-hidden />
        <Image
          src={src}
          alt={alt}
          width={1024}
          height={768}
          priority={priority}
          className="h-auto w-full object-cover saturate-[0.92] contrast-[1.04]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-ink/15"
          aria-hidden
        />
        <div className="tech-scanline pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />
        {children}
      </div>
      {caption ? <figcaption className="tech-caption">{caption}</figcaption> : null}
    </figure>
  );
}
