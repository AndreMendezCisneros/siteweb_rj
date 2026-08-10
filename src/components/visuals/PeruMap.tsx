"use client";

import { useRef, useState } from "react";

type MapPoint = {
  id: string;
  name: string;
  description: string;
  type: string;
};

// Coordenadas proyectadas desde lon/lat reales al viewBox 420x560
const COORDS: Record<string, { x: number; y: number }> = {
  ayacucho: { x: 233, y: 392 },
  lima: { x: 152, y: 358 },
  cusco: { x: 301, y: 402 },
  arequipa: { x: 310, y: 476 },
};

// Silueta simplificada del Perú basada en puntos reales de su frontera
const PERU_PATH =
  "M51 116 L21 152 L27 187 L63 215 L89 249 L102 277 L116 305 L146 361 L171 411 L205 454 L279 491 L319 519 L348 539 L372 509 L378 478 L390 444 L400 373 L372 330 L342 291 L291 291 L264 274 L243 226 L249 190 L273 167 L345 144 L361 140 L351 127 L303 85 L255 62 L231 47 L201 23 L192 45 L159 93 L111 116 L90 144 L57 142 L45 130 Z";

export function PeruMap({
  points,
  labels,
  compact = false,
}: {
  points: readonly MapPoint[];
  labels: { zoomIn: string; zoomOut: string; reset: string; legendHq: string; legendFuture: string };
  compact?: boolean;
}) {
  const [view, setView] = useState({ scale: 1, tx: 0, ty: 0 });
  const [active, setActive] = useState<MapPoint | null>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ down: false, startX: 0, startY: 0, baseTx: 0, baseTy: 0 });

  function clampView(next: { scale: number; tx: number; ty: number }) {
    const limit = 220 * next.scale;
    return {
      scale: Math.min(3, Math.max(1, next.scale)),
      tx: Math.min(limit, Math.max(-limit, next.tx)),
      ty: Math.min(limit, Math.max(-limit, next.ty)),
    };
  }

  function zoom(delta: number) {
    setView((v) => clampView({ ...v, scale: v.scale + delta }));
  }

  function onPointerDown(event: React.PointerEvent) {
    drag.current = {
      down: true,
      startX: event.clientX,
      startY: event.clientY,
      baseTx: view.tx,
      baseTy: view.ty,
    };
    setDragging(true);
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!drag.current.down) return;
    const dx = event.clientX - drag.current.startX;
    const dy = event.clientY - drag.current.startY;
    setView((v) =>
      clampView({ scale: v.scale, tx: drag.current.baseTx + dx, ty: drag.current.baseTy + dy }),
    );
  }

  function onPointerUp() {
    drag.current.down = false;
    setDragging(false);
  }

  const height = compact ? "h-[22rem]" : "h-[28rem] sm:h-[32rem]";

  return (
    <div className="relative">
      <div
        className={`relative ${height} touch-pan-y overflow-hidden rounded-[var(--radius-lg)] border border-border bg-primary [cursor:grab] active:[cursor:grabbing]`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <svg viewBox="0 0 420 560" className="h-full w-full" role="img" aria-label="Perú">
          <defs>
            <linearGradient id="peru-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.07)" />
              <stop offset="100%" stopColor="rgba(196,92,38,0.12)" />
            </linearGradient>
          </defs>
          <g
            transform={`translate(${view.tx} ${view.ty}) scale(${view.scale})`}
            style={{ transformOrigin: "210px 280px", transition: dragging ? "none" : "transform 0.25s ease" }}
          >
            <path
              d={PERU_PATH}
              fill="url(#peru-fill)"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {points.map((point) => {
              const coord = COORDS[point.id];
              if (!coord) return null;
              const isHq = point.type === "hq";
              return (
                <g key={point.id}>
                  {isHq ? (
                    <circle cx={coord.x} cy={coord.y} r="14" className="map-pulse" fill="rgba(196,92,38,0.35)" />
                  ) : null}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={isHq ? 7 : 5}
                    fill={isHq ? "#C45C26" : "rgba(255,255,255,0.25)"}
                    stroke={isHq ? "#fff" : "rgba(255,255,255,0.8)"}
                    strokeWidth={isHq ? 2 : 1.5}
                    tabIndex={0}
                    role="button"
                    aria-label={point.name}
                    className="cursor-pointer outline-none focus-visible:stroke-accent"
                    onPointerEnter={() => setActive(point)}
                    onPointerLeave={() => setActive(null)}
                    onFocus={() => setActive(point)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(point)}
                  />
                  <text
                    x={coord.x + 12}
                    y={coord.y + 4}
                    fill="rgba(255,255,255,0.85)"
                    fontSize="13"
                    fontWeight={isHq ? 700 : 400}
                    className="pointer-events-none select-none"
                  >
                    {point.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {active ? (
          <div
            role="status"
            className="absolute left-4 top-4 max-w-[16rem] rounded-[var(--radius-md)] border border-white/20 bg-ink/85 p-4 backdrop-blur-sm"
          >
            <p className="font-[family-name:var(--font-syne)] text-sm font-semibold text-white">
              {active.name}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/75">{active.description}</p>
          </div>
        ) : null}

        <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => zoom(0.4)}
            aria-label={labels.zoomIn}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-white/15 text-lg font-bold text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => zoom(-0.4)}
            aria-label={labels.zoomOut}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-white/15 text-lg font-bold text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setView({ scale: 1, tx: 0, ty: 0 })}
            aria-label={labels.reset}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" strokeLinecap="round" />
              <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-white bg-accent shadow-sm" aria-hidden />
          {labels.legendHq}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border border-primary/60 bg-primary/20" aria-hidden />
          {labels.legendFuture}
        </span>
      </div>
    </div>
  );
}
