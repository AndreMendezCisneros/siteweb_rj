"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type CarouselSlide = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image?: string;
};

export function InsightsCarousel({
  slides,
  prevLabel,
  nextLabel,
}: {
  slides: CarouselSlide[];
  prevLabel: string;
  nextLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  function scrollByAmount(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.75, behavior: "smooth" });
  }

  function onPointerDown(event: React.PointerEvent) {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      down: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    };
  }

  function onPointerMove(event: React.PointerEvent) {
    const track = trackRef.current;
    const state = dragState.current;
    if (!track || !state.down) return;
    const delta = event.clientX - state.startX;
    if (Math.abs(delta) > 6) {
      state.moved = true;
      track.scrollLeft = state.startScroll - delta;
    }
  }

  function onPointerUp() {
    dragState.current.down = false;
  }

  function onClickCapture(event: React.MouseEvent) {
    if (dragState.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragState.current.moved = false;
    }
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="carousel-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [cursor:grab] active:[cursor:grabbing]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClickCapture={onClickCapture}
      >
        {slides.map((slide) => (
          <Link
            key={slide.title}
            href={slide.href}
            draggable={false}
            className="group relative flex min-w-[85%] snap-start flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-sm transition hover:shadow-md sm:min-w-[55%] lg:min-w-[38%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {slide.image ? (
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  draggable={false}
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 38vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" aria-hidden />
              </div>
            ) : (
              <div className="hero-atmosphere h-44" aria-hidden />
            )}
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-hover">
                {slide.eyebrow}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-syne)] text-xl font-semibold text-ink group-hover:text-primary">
                {slide.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{slide.description}</p>
              <span className="mt-4 text-sm font-semibold text-accent">{slide.cta} →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          aria-label={prevLabel}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          aria-label={nextLabel}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          →
        </button>
      </div>
    </div>
  );
}
