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

    // Nodes will look like small chips; traces connect nearby nodes
  const nodes = [];
  const pulses = []; // animated signals running along traces

  // cursor trail (lagging neon orb and trail)
  const cursorTrail = [];
  const TRAIL_LEN = 10;
  for (let i = 0; i < TRAIL_LEN; i++) cursorTrail.push({ x: w / 2, y: h / 2 });

    const BASE_NODES = Math.max(24, Math.floor((w * h) / 220000));

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function makeNode() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: rand(-0.25, 0.25),
        vy: rand(-0.25, 0.25),
        size: rand(6, 14),
        hue: 190 + Math.floor(rand(-8, 8)),
      };
    }

    for (let i = 0; i < BASE_NODES; i++) nodes.push(makeNode());

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const desired = Math.max(18, Math.floor((w * h) / 220000));
      while (nodes.length < desired) nodes.push(makeNode());
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
      // create a pulse traveling between two nearby nodes (or from click to center)
      const x = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || w / 2;
      const y = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || h / 2;
      // find nearest node
      let nearest = null;
      let nd = Infinity;
      for (const n of nodes) {
        const dx = n.x - x;
        const dy = n.y - y;
        const d = dx * dx + dy * dy;
        if (d < nd) {
          nd = d;
          nearest = n;
        }
      }
      if (!nearest) return;
      // pick a partner node within range
      const partners = nodes.filter((n) => n !== nearest && Math.hypot(n.x - nearest.x, n.y - nearest.y) < 260);
      const target = partners.length ? partners[Math.floor(Math.random() * partners.length)] : { x: w / 2, y: h / 2 };
      pulses.push({ sx: nearest.x, sy: nearest.y, ex: target.x, ey: target.y, t: 0, speed: rand(0.01, 0.03) });
      // limit pulses
      if (pulses.length > 24) pulses.shift();
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", resize);
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onClick);

    // draw subtle tech grid
    function drawGrid() {
      ctx.save();
      ctx.strokeStyle = "rgba(140,110,200,0.018)"; /* more subtle purple-tint grid */
      ctx.lineWidth = 1;
      const gap = Math.max(40, Math.floor(Math.min(w, h) / 18));
      for (let x = 0; x < w; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
        ctx.stroke();
      }
  for (let y = 0; y < h; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
        ctx.stroke();
      }
      ctx.restore();
    }

    // render a node as a small chip (square with inner rectangle and glow)
    function drawNode(n) {
      const x = n.x;
      const y = n.y;
      const s = Math.max(4, n.size);

  // glow
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(x, y, 0, x, y, s * 6);
  g.addColorStop(0, `rgba(155,92,255,0.08)`); // purple core
  g.addColorStop(0.35, `rgba(46,230,167,0.05)`); // green wash
  g.addColorStop(0.7, `rgba(20,24,40,0.03)`);
      g.addColorStop(1, `rgba(2,6,23,0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, s * 6, 0, Math.PI * 2);
      ctx.fill();

      // chip body (rounded square)
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = `rgba(110,60,200,0.04)`; /* muted purple (subtle) */
      roundRect(ctx, x - s, y - s, s * 2, s * 2, 3);
      ctx.fill();

      // inner core
  ctx.fillStyle = `rgba(155,92,255,0.9)`;
      roundRect(ctx, x - s * 0.6, y - s * 0.6, s * 1.2, s * 1.2, 2);
      ctx.fill();

      // tiny pin marks
      ctx.fillStyle = `rgba(255,255,255,0.06)`;
      ctx.fillRect(x - s + 2, y - s + 2, 2, 2);
      ctx.fillRect(x + s - 4, y + s - 4, 2, 2);
      ctx.restore();
    }

    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function step() {
      // fade background slightly for subtle trails
  ctx.globalCompositeOperation = "source-over";
  // much lower background alpha so page text clearly stands out
  ctx.fillStyle = "rgba(2,6,23,0.06)";
      ctx.fillRect(0, 0, w, h);

      // ambient gradient wash
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(6,182,212,0.02)");
      g.addColorStop(1, "rgba(3,10,20,0.06)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // grid
      drawGrid();

      // update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // gentle drift
        n.vx += (Math.sin((n.x + n.y) * 0.0005) - 0.5) * 0.02;
        n.vy += (Math.cos((n.x - n.y) * 0.0004) - 0.5) * 0.02;

        // pointer influence: attract slightly so nodes cluster near cursor
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const reach = 260;
          if (dist < reach) {
            const pull = (1 - dist / reach) * 0.06;
            n.vx += (dx / dist) * pull;
            n.vy += (dy / dist) * pull;
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        // gentle bounds wrap
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;

        // damping
        n.vx *= 0.94;
        n.vy *= 0.94;
      }

  // draw traces (nearest 2 neighbors) to resemble PCB traces
      ctx.lineWidth = 1.0;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        // find neighbors (cheap: sample next N indices to limit cost)
        for (let j = i + 1; j < Math.min(nodes.length, i + 8); j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 90000) {
            const alpha = 0.04 * (1 - d2 / 90000);
            // blend purple/green along traces by using gradient stroke
            const traceG = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            traceG.addColorStop(0, `rgba(155,92,255,${alpha})`);
            traceG.addColorStop(1, `rgba(46,230,167,${alpha * 0.9})`);
            ctx.strokeStyle = traceG;
            ctx.beginPath();
            // draw a slightly curved trace
            const mx = (a.x + b.x) / 2 + (Math.sin((a.x + b.x) * 0.001 + (a.y + b.y) * 0.001) * 8);
            ctx.moveTo(a.x, a.y);
            ctx.quadraticCurveTo(mx, (a.y + b.y) / 2, b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw nodes on top
      for (let i = 0; i < nodes.length; i++) drawNode(nodes[i]);

      // update and draw pulses
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        pulse.t += pulse.speed;
        if (pulse.t > 1) {
          pulses.splice(p, 1);
          p--;
          continue;
        }
        const x = pulse.sx + (pulse.ex - pulse.sx) * pulse.t;
        const y = pulse.sy + (pulse.ey - pulse.sy) * pulse.t;
        ctx.beginPath();
        const pulseAlpha = 0.9 * (1 - Math.abs(0.5 - pulse.t) * 2);
        const pg = ctx.createRadialGradient(x, y, 0, x, y, 12);
        pg.addColorStop(0, `rgba(155,92,255,${pulseAlpha})`);
        pg.addColorStop(0.5, `rgba(46,230,167,${pulseAlpha * 0.6})`);
        pg.addColorStop(1, `rgba(2,6,23,0)`);
        ctx.fillStyle = pg;
        ctx.arc(x, y, 4.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // update cursor trail positions (smooth lerp)
      const lerp = 0.22;
      for (let i = 0; i < cursorTrail.length; i++) {
        const t = cursorTrail[i];
        // target is pointer for first, else previous trail point
        const target = i === 0 ? pointer : cursorTrail[i - 1];
        t.x += (target.x - t.x) * lerp;
        t.y += (target.y - t.y) * lerp;
      }

      // draw cursor trail (glowing line)
      ctx.save();
      for (let i = cursorTrail.length - 1; i >= 0; i--) {
        const p = cursorTrail[i];
        const alpha = (i + 1) / cursorTrail.length * (pointer.active ? 0.9 : 0.12);
        const size = 8 * (1 + i * 0.06);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 1.8);
        grad.addColorStop(0, `rgba(155,92,255,${0.8 * alpha})`);
        grad.addColorStop(0.45, `rgba(46,230,167,${0.45 * alpha})`);
        grad.addColorStop(1, `rgba(2,6,23,0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }
      // connecting stroke for trailing path
      ctx.beginPath();
      for (let i = 0; i < cursorTrail.length - 1; i++) {
        const a = cursorTrail[i];
        const b = cursorTrail[i + 1];
        const alpha = 0.32 * (1 - i / cursorTrail.length);
        const gline = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        gline.addColorStop(0, `rgba(155,92,255,${alpha})`);
        gline.addColorStop(1, `rgba(46,230,167,${alpha * 0.9})`);
        ctx.strokeStyle = gline;
        ctx.lineWidth = 2 * (1 - i / cursorTrail.length);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.restore();

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
