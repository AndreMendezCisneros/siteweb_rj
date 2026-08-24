import Image from "next/image";
import type { ReactNode } from "react";
import { siteImages } from "@/lib/productScreenshots";

export function PhotoPanel({
  children,
  className = "",
  contentClassName = "relative px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16",
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-lg)] bg-ink ${className}`}>
      <Image
        src={siteImages.teamMember}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/65" aria-hidden />
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
