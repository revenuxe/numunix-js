"use client";
import { useEffect, useRef } from "react";

type Props = {
  active?: boolean;
  className?: string;
  intensity?: number;
  /** external boost 0..1 (click and hold) */
  boostRef?: { current: number };
  ribbons?: number;
};

type Ribbon = {
  phase: number;
  speed: number;
  amp: number;
  yBase: number;
  width: number;
  twist: number;
  hue: number;
  tilt: number;
};

export function NumunixRibbonScene({
  active = true,
  className,
  intensity = 1,
  boostRef,
  ribbons = 5,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let drawStaticFrame: (() => void) | undefined;
    const parent = canvas.parentElement!;

    const resize = () => {
      const r = parent.getBoundingClientRect();
      const nextDpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const nextWidth = Math.max(320, r.width);
      const nextHeight = Math.max(320, r.height);
      if (w === nextWidth && h === nextHeight && dpr === nextDpr) return;
      dpr = nextDpr;
      w = nextWidth;
      h = nextHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) drawStaticFrame?.();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const count = w < 720 ? Math.max(3, ribbons - 2) : ribbons;
    const bands: Ribbon[] = Array.from({ length: count }, (_, i) => ({
      phase: i * 1.37,
      speed: 0.018 + i * 0.006,
      amp: 0.18 + (i % 3) * 0.07,
      yBase: 0.16 + i * (0.72 / Math.max(1, count - 1)),
      width: 90 + ((i * 53) % 150),
      twist: 0.7 + (i % 4) * 0.35,
      hue: i / Math.max(1, count - 1),
      tilt: -0.55 - (i % 3) * 0.18,
    }));

    const particles = Array.from({ length: w < 720 ? 26 : 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.3,
      s: Math.random() * 0.00006 + 0.00002,
      o: Math.random() * 0.5 + 0.15,
    }));

    let t = 0;
    let raf = 0;
    let visible = true;
    let lastFrame = 0;
    let previousFrame = 0;
    const scheduleFrame = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(render);
    };
    const syncActivity = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      lastFrame = 0;
      previousFrame = 0;
      scheduleFrame();
    };
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        syncActivity();
      },
      { threshold: 0.01 },
    );
    io.observe(parent);
    const updateMotion = () => {
      reduced = motionQuery.matches;
      syncActivity();
    };
    motionQuery.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", syncActivity);

    type RGB = readonly [number, number, number];
    const mix = (a: RGB, b: RGB, k: number) =>
      `rgb(${Math.round(a[0] + (b[0] - a[0]) * k)},${Math.round(
        a[1] + (b[1] - a[1]) * k,
      )},${Math.round(a[2] + (b[2] - a[2]) * k)})`;

    const NAVY: RGB = [8, 20, 44];
    const ROYAL: RGB = [23, 71, 184];
    const ELECTRIC: RGB = [59, 130, 246];

    const steps = 46;
    const n = steps + 1;
    const geometry = new Map(
      bands.map((band) => [
        band,
        {
          tx: new Float32Array(n),
          ty: new Float32Array(n),
          bx: new Float32Array(n),
          by: new Float32Array(n),
          shade: new Float32Array(n),
        },
      ]),
    );
    const drawRibbon = (b: Ribbon, time: number, boost: number) => {
      const { tx, ty, bx, by, shade } = geometry.get(b)!;

      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x = -0.25 * w + u * 1.5 * w;
        const curve =
          Math.sin(u * 2.1 + b.phase + time * b.speed) * b.amp * h + (u - 0.5) * b.tilt * h;
        const y = b.yBase * h + curve;

        const tw = Math.sin(u * 3.1 * b.twist + b.phase + time * b.speed * 1.4);
        const half = (b.width * (0.35 + Math.abs(tw) * 0.9)) / 2;
        const nx = 0.18;
        tx[i] = x + nx * half;
        ty[i] = y - half;
        bx[i] = x - nx * half;
        by[i] = y + half;
        shade[i] = tw;
      }

      // body
      ctx.beginPath();
      ctx.moveTo(tx[0]!, ty[0]!);
      for (let i = 1; i < n; i++) ctx.lineTo(tx[i]!, ty[i]!);
      for (let i = n - 1; i >= 0; i--) ctx.lineTo(bx[i]!, by[i]!);
      ctx.closePath();

      const g = ctx.createLinearGradient(0, b.yBase * h - 260, w, b.yBase * h + 260);
      g.addColorStop(0, mix(NAVY, ROYAL, 0.15 + b.hue * 0.2));
      g.addColorStop(0.42, mix(ROYAL, ELECTRIC, 0.25 + b.hue * 0.35));
      g.addColorStop(0.68, mix(NAVY, ROYAL, 0.5));
      g.addColorStop(1, mix(NAVY, ROYAL, 0.08));
      ctx.fillStyle = g;
      ctx.shadowColor = "rgba(4,8,20,0.85)";
      ctx.shadowBlur = 50;
      ctx.shadowOffsetY = 26;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // glossy highlight following the twist
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const k = 0.5 + shade[i]! * 0.34;
        const x = tx[i]! + (bx[i]! - tx[i]!) * k;
        const y = ty[i]! + (by[i]! - ty[i]!) * k;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(150,205,255,${0.28 + 0.22 * boost})`;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // edge light
      ctx.beginPath();
      ctx.moveTo(tx[0]!, ty[0]!);
      for (let i = 1; i < n; i++) ctx.lineTo(tx[i]!, ty[i]!);
      const eg = ctx.createLinearGradient(0, 0, w, 0);
      eg.addColorStop(0, "rgba(56,189,248,0.05)");
      eg.addColorStop(0.5, `rgba(96,171,255,${0.5 + 0.3 * boost})`);
      eg.addColorStop(1, "rgba(56,189,248,0.05)");
      ctx.strokeStyle = eg;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // dark underside
      ctx.beginPath();
      ctx.moveTo(bx[0]!, by[0]!);
      for (let i = 1; i < n; i++) ctx.lineTo(bx[i]!, by[i]!);
      ctx.strokeStyle = "rgba(3,6,14,0.75)";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const render = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      // Cap decorative work at 30fps while preserving motion speed across displays.
      if (!reduced && lastFrame && now - lastFrame < 1000 / 30) {
        scheduleFrame();
        return;
      }
      const delta = previousFrame ? Math.min((now - previousFrame) / (1000 / 60), 4) : 1;
      lastFrame = now;
      previousFrame = now;
      const boost = Math.min(1, boostRef?.current ?? 0);
      t += reduced ? 0 : delta * (1 + boost * 2.2);

      ctx.clearRect(0, 0, w, h);

      // atmospheric background glow
      const bg = ctx.createRadialGradient(
        w * 0.62,
        h * 0.4,
        0,
        w * 0.62,
        h * 0.4,
        Math.max(w, h) * 0.8,
      );
      bg.addColorStop(0, `rgba(23,71,184,${(0.26 + boost * 0.18) * intensity})`);
      bg.addColorStop(0.45, "rgba(11,27,56,0.35)");
      bg.addColorStop(1, "rgba(5,7,12,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (const b of bands) drawRibbon(b, t, boost);

      // cyan bloom
      ctx.globalCompositeOperation = "lighter";
      const bloom = ctx.createRadialGradient(
        w * 0.72,
        h * 0.28,
        0,
        w * 0.72,
        h * 0.28,
        Math.max(w, h) * 0.45,
      );
      bloom.addColorStop(0, `rgba(56,189,248,${0.08 + boost * 0.1})`);
      bloom.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        if (!reduced) p.y -= p.s * (1 + boost * 3) * 16 * delta;
        if (p.y < -0.02) p.y = 1.02;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,215,255,${p.o * (0.6 + boost * 0.6)})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      if (boostRef && boostRef.current > 0) {
        boostRef.current = Math.max(0, boostRef.current - 0.012 * delta);
      }
      if (!reduced) scheduleFrame();
    };
    drawStaticFrame = syncActivity;
    scheduleFrame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      motionQuery.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", syncActivity);
    };
  }, [active, intensity, boostRef, ribbons]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={className} style={{ display: "block" }} />
  );
}

export default NumunixRibbonScene;
