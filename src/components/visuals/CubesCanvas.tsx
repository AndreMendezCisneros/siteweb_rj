"use client";

import { useEffect, useRef } from "react";

type Cube = {
  x: number;
  y: number;
  size: number;
  rx: number;
  ry: number;
  vrx: number;
  vry: number;
  vy: number;
  color: string;
  lineWidth: number;
};

const COLORS = [
  "rgba(255, 255, 255, 0.32)",
  "rgba(255, 255, 255, 0.18)",
  "rgba(94, 210, 222, 0.4)",
  "rgba(94, 210, 222, 0.25)",
  "rgba(230, 126, 60, 0.5)",
];

const VERTICES: [number, number, number][] = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

function drawCube(ctx: CanvasRenderingContext2D, cube: Cube) {
  const cosX = Math.cos(cube.rx);
  const sinX = Math.sin(cube.rx);
  const cosY = Math.cos(cube.ry);
  const sinY = Math.sin(cube.ry);

  const projected = VERTICES.map(([vx, vy, vz]) => {
    const y1 = vy * cosX - vz * sinX;
    const z1 = vy * sinX + vz * cosX;
    const x2 = vx * cosY + z1 * sinY;
    const depth = 3.2 - (vx * -sinY + z1 * cosY);
    const scale = (cube.size * 2.6) / depth;
    return [cube.x + x2 * scale, cube.y + y1 * scale] as const;
  });

  ctx.strokeStyle = cube.color;
  ctx.lineWidth = cube.lineWidth;
  ctx.beginPath();
  for (const [a, b] of EDGES) {
    ctx.moveTo(projected[a][0], projected[a][1]);
    ctx.lineTo(projected[b][0], projected[b][1]);
  }
  ctx.stroke();
}

export function CubesCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cubes: Cube[] = [];
    let raf = 0;

    function seed() {
      const count = Math.max(8, Math.min(16, Math.floor(width / 110)));
      cubes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 14 + Math.random() * 34,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        vrx: (Math.random() - 0.5) * 0.006,
        vry: (Math.random() - 0.5) * 0.008,
        vy: -(0.08 + Math.random() * 0.25),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        lineWidth: Math.random() > 0.7 ? 1.4 : 1,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (cubes.length === 0) seed();
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height);
      for (const cube of cubes) {
        cube.rx += cube.vrx;
        cube.ry += cube.vry;
        cube.y += cube.vy;
        if (cube.y < -cube.size * 2) {
          cube.y = height + cube.size * 2;
          cube.x = Math.random() * width;
        }
        drawCube(ctx!, cube);
      }
      raf = requestAnimationFrame(frame);
    }

    resize();

    if (reduceMotion) {
      // Un solo frame estático como textura
      for (const cube of cubes) drawCube(ctx, cube);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const observer = new ResizeObserver(() => resize());
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
