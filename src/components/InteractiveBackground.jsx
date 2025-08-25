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

    const pointer = { x: w / 2, y: h / 2, active: false };

    const particles = [];
    const BASE_COUNT = Math.max(30, Math.floor((w * h) / 140000));
    let PARTICLE_COUNT = BASE_COUNT;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function makeParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: rand(-0.4, 0.4),
        vy: rand(-0.4, 0.4),
        r: rand(0.8, 3.2),
        hue: Math.floor(rand(170, 210)),
      };
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(makeParticle());

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      PARTICLE_COUNT = Math.max(20, Math.floor((w * h) / 140000));
      while (particles.length < PARTICLE_COUNT) particles.push(makeParticle());
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

    function onClick(e) {
      // burst: create a handful of temporary particles
      const x = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || w / 2;
      const y = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || h / 2;
      for (let i = 0; i < 10; i++) {
        const p = makeParticle();
        p.x = x + rand(-8, 8);
        p.y = y + rand(-8, 8);
        p.vx = rand(-3, 3);
        p.vy = rand(-3, 3);
        p.r = rand(1.2, 4.5);
        particles.push(p);
      }
      // trim if too many
      if (particles.length > PARTICLE_COUNT * 2) particles.splice(0, particles.length - PARTICLE_COUNT);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", resize);
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onClick);

    // subtle noise function for drifting velocities
    function noise(n) {
      return Math.sin(n * 12.9898) * 43758.5453 - Math.floor(Math.sin(n * 12.9898) * 43758.5453);
    }

    let t = 0;

    function step() {
      t += 0.005;

      // draw faded background to create trails
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(2,6,23,0.24)";
      ctx.fillRect(0, 0, w, h);

      // subtle ambient gradient
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(6,182,212,0.03)");
      g.addColorStop(1, "rgba(30,41,59,0.05)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // slow drift from noise
        p.vx += (noise(p.x * 0.01 + t) - 0.5) * 0.02;
        p.vy += (noise(p.y * 0.01 + t + 5) - 0.5) * 0.02;

        // pointer repulsion/attraction (soft)
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const reach = 180;
          if (dist < reach) {
            const force = (1 - dist / reach) * 0.9;
            p.vx += (dx / dist) * force * 0.6;
            p.vy += (dy / dist) * force * 0.6;
          } else {
            // gentle pull toward center to keep field cohesive
            p.vx += (w / 2 - p.x) * 0.00002;
            p.vy += (h / 2 - p.y) * 0.00002;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // additive glow
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        const alpha = Math.max(0.03, Math.min(0.22, (p.r / 4) * 0.12 + 0.02));
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${alpha})`;
        ctx.arc(p.x, p.y, p.r * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // nearest-neighbor lines (limit checks for perf)
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 0.6;
      let maxNeighbors = 3;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        // find a few closest neighbors
        const neighbors = [];
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          neighbors.push({ d2, b });
        }
        neighbors.sort((x, y) => x.d2 - y.d2);
        for (let k = 0; k < Math.min(maxNeighbors, neighbors.length); k++) {
          const b = neighbors[k].b;
          const d2 = neighbors[k].d2;
          if (d2 > 1600) continue;
          const alpha = 0.12 * (1 - d2 / 1600);
          ctx.strokeStyle = `rgba(100,200,220,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(step);
    }

    step();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}
