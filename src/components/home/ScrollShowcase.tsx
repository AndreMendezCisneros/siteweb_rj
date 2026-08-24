"use client";

import { useEffect, useRef } from "react";
import { TechImageFrame } from "@/components/visuals/TechImageFrame";

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function apply(progress: number) {
      const eased = Math.min(1, Math.max(0, progress));
      if (imageRef.current) {
        const scale = 0.94 + eased * 0.06;
        imageRef.current.style.transform = `scale(${scale})`;
        imageRef.current.style.opacity = String(0.88 + eased * 0.12);
      }
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
    <div ref={containerRef} className="relative">
      <div ref={imageRef} className="will-change-transform" style={{ transform: "scale(0.94)", opacity: 0.88 }}>
        <TechImageFrame src={image} alt={alt} caption={caption} />
      </div>
    </div>
  );
}
