"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const BOXES = [
  { top: "6%", left: "4%", size: 88, delayFactor: 0.0 },
  { top: "12%", right: "8%", size: 120, delayFactor: 0.12 },
  { top: "42%", left: "12%", size: 72, delayFactor: 0.22 },
  { bottom: "14%", right: "16%", size: 104, delayFactor: 0.08 },
  { bottom: "6%", left: "30%", size: 64, delayFactor: 0.3 },
  { top: "30%", right: "34%", size: 56, delayFactor: 0.18 },
] as const;

export function ScrollShowcase({
  image,
  alt,
  caption,
}: {
  image: string;
  alt: string;
  caption: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function apply(progress: number) {
      const eased = Math.min(1, Math.max(0, progress));
      if (imageRef.current) {
        const scale = 0.9 + eased * 0.1;
        imageRef.current.style.transform = `scale(${scale})`;
        imageRef.current.style.borderRadius = `${28 - eased * 12}px`;
      }
      boxRefs.current.forEach((box, index) => {
        if (!box) return;
        const factor = BOXES[index]?.delayFactor ?? 0;
        const local = Math.min(1, Math.max(0, (eased - factor) / (1 - factor || 1)));
        box.style.opacity = String(1 - local);
        box.style.transform = `translateY(${local * -36}px) scale(${1 - local * 0.35})`;
      });
    }

    if (reduceMotion) {
      apply(1);
      return;
    }

    let raf = 0;
    function update() {
      raf = 0;
      const rect = container!.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 cuando el elemento entra por abajo, 1 cuando su centro pasa el centro del viewport
      const progress = (viewport - rect.top) / (viewport * 0.9);
      apply(progress);
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure ref={containerRef} className="relative">
      <div
        ref={imageRef}
        className="relative overflow-hidden shadow-md will-change-transform"
        style={{ borderRadius: 28, transform: "scale(0.9)" }}
      >
        <Image
          src={image}
          alt={alt}
          width={1024}
          height={768}
          className="h-auto w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {BOXES.map((box, index) => (
        <div
          key={index}
          ref={(el) => {
            boxRefs.current[index] = el;
          }}
          aria-hidden
          className="pointer-events-none absolute rounded-xl border border-white/50 bg-primary/20 backdrop-blur-[2px] will-change-transform"
          style={{
            width: box.size,
            height: box.size,
            top: "top" in box ? box.top : undefined,
            bottom: "bottom" in box ? box.bottom : undefined,
            left: "left" in box ? box.left : undefined,
            right: "right" in box ? box.right : undefined,
          }}
        />
      ))}

      <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}
