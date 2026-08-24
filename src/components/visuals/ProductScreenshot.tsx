import Image from "next/image";

export function ProductScreenshot({
  src,
  alt,
  caption,
  variant = "default",
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  variant?: "hero" | "default";
  className?: string;
  priority?: boolean;
}) {
  const isHero = variant === "hero";

  return (
    <figure className={`relative ${className}`}>
      <div
        className={`overflow-hidden rounded-[1.1rem] border shadow-md ${
          isHero ? "border-white/15 bg-white/10 backdrop-blur-md" : "border-border bg-surface"
        }`}
      >
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
