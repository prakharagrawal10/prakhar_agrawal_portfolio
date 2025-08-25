import { useEffect, useRef, useState } from "react";
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiOpencv,
  SiKeras,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGit,
} from "react-icons/si";
import styles from "../pages/Home/Home.module.css";

const ICONS = [
  { Comp: SiPython, label: "Python" },
  { Comp: SiPytorch, label: "PyTorch" },
  { Comp: SiTensorflow, label: "TensorFlow" },
  { Comp: SiScikitlearn, label: "scikit-learn" },
  { Comp: SiOpencv, label: "OpenCV" },
  { Comp: SiKeras, label: "Keras" },
  { Comp: SiReact, label: "React" },
  { Comp: SiNextdotjs, label: "Next.js" },
  { Comp: SiTypescript, label: "TypeScript" },
  { Comp: SiJavascript, label: "JavaScript" },
  { Comp: SiNodedotjs, label: "Node.js" },
  { Comp: SiDocker, label: "Docker" },
  { Comp: SiKubernetes, label: "Kubernetes" },
  { Comp: SiPostgresql, label: "Postgres" },
  { Comp: SiMongodb, label: "MongoDB" },
  { Comp: SiRedis, label: "Redis" },
  { Comp: SiGit, label: "Git" },
];

export default function SkillCloud() {
  const containerRef = useRef(null);
  const rafRef = useRef();
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5, active: false });

  // typing label
  const [typed, setTyped] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    let mounted = true;
    let charIndex = 0;
    const word = ICONS[wordIndex].label;
    function tick() {
      if (!mounted) return;
      charIndex++;
      setTyped(word.slice(0, charIndex));
      if (charIndex >= word.length) {
        setTimeout(() => {
          // clear then next word
          setTyped("");
          setWordIndex((w) => (w + 1) % ICONS.length);
        }, 900);
      } else {
        setTimeout(tick, 80);
      }
    }
    const start = setTimeout(tick, 400 + Math.random() * 300);
    return () => {
      mounted = false;
      clearTimeout(start);
    };
  }, [wordIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = () => el.getBoundingClientRect();
    const items = Array.from(el.querySelectorAll(".skillIcon"));
    // initialize positions (larger radii for a bigger cloud)
    const total = items.length;
    const nodes = items.map((node, i) => {
      const angle = (Math.PI * 2 * i) / total;
      const layer = i % 3;
      const base = 56;
      const radius = base + layer * 40 + (Math.floor(i / 3) * 6);
      const speed = 0.003 + (i % 5) * 0.0009 + (Math.floor(i / 4) * 0.0002);
      return { node, angle, radius, speed };
    });

    function onMove(e) {
      const r = rect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      setCursor({ x, y, active: true });
    }
    function onLeave() {
      setCursor((c) => ({ ...c, active: false }));
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    let t = 0;
    function loop() {
      t += 1;
      const r = rect();
      nodes.forEach((n, i) => {
        n.angle += n.speed * (1 + Math.sin(t * 0.002 + i));
        const cx = r.width / 2 + Math.cos(n.angle) * n.radius + (cursor.x - 0.5) * 40;
        const cy = r.height / 2 + Math.sin(n.angle) * n.radius + (cursor.y - 0.5) * 26;
        const scale = 1 + ((i % 2) ? 0.06 : 0.12) * (cursor.active ? 1 : 0);
        n.node.style.transform = `translate(${cx}px, ${cy}px) scale(${scale})`;
      });
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursor]);

  return (
    <div className={styles.skillCloudWrap} ref={containerRef} aria-hidden>
      <div className={styles.skillCloud}>
        {ICONS.map(({ Comp, label }) => (
          <div key={label} className={`skillIcon ${styles.iconBubble}`} title={label}>
            <Comp size={28} style={{ filter: 'drop-shadow(0 6px 18px rgba(106,90,255,0.18))' }} />
          </div>
        ))}
      </div>

      <div className={styles.typingLabel}>
        <span className={styles.typingText}>{typed}</span>
        <span className={styles.cursor}>|</span>
      </div>
    </div>
  );
}
