import { useRef, useEffect } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // pointer state updated via window events so canvas can be pointer-events:none
    const pointer = { x: w / 2, y: h / 2, active: false };

    const particles = [];
    const PARTICLE_COUNT = Math.max(40, Math.floor((w * h) / 90000));

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: rand(-0.3, 0.3),
        vy: rand(-0.3, 0.3),
        r: rand(1, 3),
        hue: Math.floor(rand(160, 200)),
      });
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function onMove(e) {
      const x = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
      const y = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY);
      if (typeof x === "number" && typeof y === "number") {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
      }
    }

    function onLeave() {
      pointer.active = false;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", resize);

    function step() {
      ctx.clearRect(0, 0, w, h);

      // background gradient
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(6,182,212,0.06)");
      g.addColorStop(0.5, "rgba(14,45,67,0.12)");
      g.addColorStop(1, "rgba(2,6,23,0.25)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // subtle parallax radial glow under cursor
      if (pointer.active) {
        const rad = Math.max(120, Math.min(280, (w + h) * 0.06));
        const grd = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, rad);
        grd.addColorStop(0, "rgba(6,182,212,0.14)");
        grd.addColorStop(0.4, "rgba(6,182,212,0.06)");
        grd.addColorStop(1, "rgba(2,6,23,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }

      // draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // motion
        p.x += p.vx;
        p.y += p.vy;

        // wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // repel from pointer
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 160);
          if (influence > 0) {
            const force = influence * 0.8;
            p.vx += (dx / dist) * force || 0;
            p.vy += (dy / dist) * force || 0;
          }
        }

        // gentle damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // draw soft circle with additive blend
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, 0.08)`;
        ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // connecting lines (close neighbors)
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 1600) {
            const alpha = 0.12 * (1 - d2 / 1600);
            ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.stroke();

      rafRef.current = requestAnimationFrame(step);
    }

    step();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}
