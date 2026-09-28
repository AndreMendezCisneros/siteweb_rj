"use client";

import { useRef, useState } from "react";
import peruMapData from "./peruMapData.json";

type MapPoint = {
  id: string;
  name: string;
  description: string;
  type: string;
};

type MapLabels = {
  zoomIn: string;
  zoomOut: string;
  reset: string;
  legendHq: string;
  legendFuture: string;
  legendRegion: string;
  ocean: string;
};

const HQ_DEPT = "AYACUCHO";
const FUTURE_DEPTS = new Set(["LIMA", "CALLAO", "CUSCO", "AREQUIPA"]);

const LABEL_LAYOUT: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  lima: { dx: -12, dy: 4, anchor: "end" },
  ayacucho: { dx: 0, dy: -30, anchor: "middle" },
  cusco: { dx: 14, dy: 5, anchor: "start" },
  arequipa: { dx: 14, dy: 5, anchor: "start" },
};

const ROUTE_BULGE: Record<string, { x: number; y: number }> = {
  lima: { x: -18, y: -28 },
  cusco: { x: 12, y: -22 },
  arequipa: { x: -8, y: 18 },
};

function deptFill(name: string) {
  if (name === HQ_DEPT) return "rgba(196,92,38,0.42)";
  if (FUTURE_DEPTS.has(name)) return "rgba(255,255,255,0.13)";
  return "rgba(255,255,255,0.055)";
}

function deptStroke(name: string) {
  if (name === HQ_DEPT) return "rgba(255,210,170,0.85)";
  if (FUTURE_DEPTS.has(name)) return "rgba(255,255,255,0.38)";
  return "rgba(255,255,255,0.2)";
}

export function PeruMap({
  points,
  labels,
  compact = false,
}: {
  points: readonly MapPoint[];
  labels: MapLabels;
  compact?: boolean;
}) {
  const [view, setView] = useState({ scale: 1, tx: 0, ty: 0 });
  const [active, setActive] = useState<MapPoint | null>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ down: false, startX: 0, startY: 0, baseTx: 0, baseTy: 0 });

  const hq = peruMapData.cities.ayacucho;
  const departments = Object.entries(peruMapData.departments).sort(([a], [b]) => {
    if (a === HQ_DEPT) return 1;
    if (b === HQ_DEPT) return -1;
    return 0;
  });

  function clampView(next: { scale: number; tx: number; ty: number }) {
    const limit = 240 * next.scale;
    return {
      scale: Math.min(3.2, Math.max(1, next.scale)),
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

  function pointById(id: string) {
    return points.find((item) => item.id === id) ?? null;
  }

  const height = compact ? "h-[22rem]" : "h-[28rem] sm:h-[34rem]";

  return (
    <div className="relative">
      <div
        className={`relative ${height} touch-pan-y overflow-hidden rounded-[var(--radius-lg)] border border-border bg-primary [cursor:grab] active:[cursor:grabbing]`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <svg
          viewBox={peruMapData.viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
          role="img"
          aria-label="Mapa del Perú con Ayacucho como base de RYJEC"
        >
          <defs>
            <filter id="peru-glow" x="-8%" y="-8%" width="116%" height="116%">
              <feDropShadow dx="0" dy="1" stdDeviation="2.2" floodColor="#06131c" floodOpacity="0.45" />
            </filter>
          </defs>

          <g
            transform={`translate(${view.tx} ${view.ty}) scale(${view.scale})`}
            style={{ transformOrigin: "240px 320px", transition: dragging ? "none" : "transform 0.25s ease" }}
            filter="url(#peru-glow)"
          >
            {departments.map(([name, d]) => (
              <path
                key={name}
                d={d}
                fill={deptFill(name)}
                stroke={deptStroke(name)}
                strokeWidth={name === HQ_DEPT ? 1.35 : 0.65}
                strokeLinejoin="round"
                className={name === HQ_DEPT ? "cursor-pointer" : undefined}
                onPointerEnter={() => {
                  if (name === HQ_DEPT) setActive(pointById("ayacucho"));
                }}
                onPointerLeave={() => {
                  if (name === HQ_DEPT) setActive(null);
                }}
                onClick={() => {
                  if (name === HQ_DEPT) setActive(pointById("ayacucho"));
                }}
              />
            ))}

            {points
              .filter((point) => point.type === "future")
              .map((point) => {
                const coord = peruMapData.cities[point.id as keyof typeof peruMapData.cities];
                const bulge = ROUTE_BULGE[point.id] ?? { x: 0, y: -16 };
                if (!coord) return null;
                const mx = (hq.x + coord.x) / 2 + bulge.x;
                const my = (hq.y + coord.y) / 2 + bulge.y;
                return (
                  <path
                    key={`route-${point.id}`}
                    d={`M ${hq.x} ${hq.y} Q ${mx} ${my} ${coord.x} ${coord.y}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth="1.15"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                    className="pointer-events-none"
                  />
                );
              })}

            <text
              x={peruMapData.pacific.x}
              y={peruMapData.pacific.y}
              fill="rgba(255,255,255,0.38)"
              fontSize="11"
              letterSpacing="1.6"
              transform={`rotate(-78 ${peruMapData.pacific.x} ${peruMapData.pacific.y})`}
              className="pointer-events-none select-none"
            >
              {labels.ocean}
            </text>

            {points.map((point) => {
              const coord = peruMapData.cities[point.id as keyof typeof peruMapData.cities];
              if (!coord) return null;
              const isHq = point.type === "hq";
              const layout = LABEL_LAYOUT[point.id] ?? { dx: 12, dy: 4, anchor: "start" as const };
              return (
                <g key={point.id}>
                  {isHq ? (
                    <>
                      <circle cx={coord.x} cy={coord.y} r="16" className="map-pulse" fill="rgba(196,92,38,0.4)" />
                      <path
                        d={`M ${coord.x} ${coord.y} c -7.2 -8.4 -11.5 -13.4 -11.5 -18.2 0 -6.4 5.1 -11.5 11.5 -11.5 s 11.5 5.1 11.5 11.5 c 0 4.8 -4.3 9.8 -11.5 18.2 z`}
                        fill="#C45C26"
                        stroke="#fff"
                        strokeWidth="1.6"
                        className="cursor-pointer"
                        tabIndex={0}
                        role="button"
                        aria-label={point.name}
                        onPointerEnter={() => setActive(point)}
                        onPointerLeave={() => setActive(null)}
                        onFocus={() => setActive(point)}
                        onBlur={() => setActive(null)}
                        onClick={() => setActive(point)}
                      />
                      <circle cx={coord.x} cy={coord.y - 16.5} r="3.2" fill="#fff" className="pointer-events-none" />
                    </>
                  ) : (
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={5}
                      fill="rgba(255,255,255,0.22)"
                      stroke="rgba(255,255,255,0.9)"
                      strokeWidth={1.5}
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
                  )}
                  <text
                    x={coord.x + layout.dx}
                    y={coord.y + layout.dy}
                    textAnchor={layout.anchor}
                    fill={isHq ? "#fff" : "rgba(255,255,255,0.86)"}
                    fontSize={isHq ? 13.5 : 12}
                    fontWeight={isHq ? 700 : 500}
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
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => zoom(0.4)}
            aria-label={labels.zoomIn}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-white/15 text-lg font-bold text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            +
          </button>
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => zoom(-0.4)}
            aria-label={labels.zoomOut}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-white/15 text-lg font-bold text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            −
          </button>
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
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
          <span className="h-3 w-3 rounded-[2px] border border-accent/50 bg-accent/30" aria-hidden />
          {labels.legendRegion}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border border-primary/60 bg-primary/20" aria-hidden />
          {labels.legendFuture}
        </span>
      </div>
    </div>
  );
}
