import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/skills-planet.css";

type Word = { text: string; kind: "hard" | "soft" | "sport" | "trait" };

const WORDS: Word[] = [
  { text: "Angular", kind: "hard" },
  { text: "React", kind: "hard" },
  { text: "Vue", kind: "hard" },
  { text: "TypeScript", kind: "hard" },
  { text: "Java", kind: "hard" },
  { text: "Spring Boot", kind: "hard" },
  { text: "NestJS", kind: "hard" },
  { text: "Next.js", kind: "hard" },
  { text: "HTML5", kind: "hard" },
  { text: "CSS3", kind: "hard" },
  { text: "Tailwind", kind: "hard" },
  { text: "Styled Components", kind: "hard" },
  { text: "Jest", kind: "hard" },
  { text: "Cypress", kind: "hard" },
  { text: "Docker", kind: "hard" },
  { text: "PostgreSQL", kind: "hard" },
  { text: "MongoDB", kind: "hard" },
  { text: "MySQL", kind: "hard" },
  { text: "Figma", kind: "hard" },
  { text: "Leadership", kind: "soft" },
  { text: "Team spirit", kind: "soft" },
  { text: "Communication", kind: "soft" },
  { text: "Pedagogy", kind: "soft" },
  { text: "Project management", kind: "soft" },
  { text: "Autonomy", kind: "soft" },
  { text: "Rigor", kind: "soft" },
  { text: "Empathy", kind: "soft" },
  { text: "Problem solving", kind: "soft" },
  { text: "Creativity", kind: "soft" },
  { text: "American football", kind: "sport" },
  { text: "Basketball", kind: "sport" },
  { text: "Capoeira", kind: "sport" },
  { text: "Badminton", kind: "sport" },
  { text: "Percussion", kind: "sport" },
  { text: "Perseverance", kind: "trait" },
  { text: "Curiosity", kind: "trait" },
  { text: "Adaptability", kind: "trait" },
];

function fibonacciSphere(n: number, radius: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  if (n <= 1) return [{ x: 0, y: 0, z: 0 }];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    pts.push({ x: x * radius, y: y * radius, z: z * radius });
  }
  return pts;
}

export default function SkillsPlanet() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tagRefs = useRef<HTMLSpanElement[]>([]);
  tagRefs.current = [];

  const [radius, setRadius] = useState(220);
  const BASE = useMemo(() => fibonacciSphere(WORDS.length, radius), [radius]);
  const addRef = (el: HTMLSpanElement | null) => { if (el) tagRefs.current.push(el); };

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const computeRadius = () => {
      const { width, height } = wrap.getBoundingClientRect();
      const minSide = Math.max(0, Math.min(width, height));
      const r = Math.floor(minSide * 0.42); 
      setRadius(Math.max(90, Math.min(r, 260)));
    };

    computeRadius();
    const ro = new ResizeObserver(computeRadius);
    ro.observe(wrap);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let ax = -8 * (Math.PI / 180);
    let ay = 16 * (Math.PI / 180);

    const small = window.matchMedia && window.matchMedia("(max-width: 560px)").matches;
    let vx = 0;
    let vy = small ? 0.0025 : 0.004; 
    let targetVX = 0, targetVY = vy;
    let hovered = false;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      targetVY = dx * (small ? 0.05 : 0.06) + (hovered ? 0 : vy);
      targetVX = -dy * (small ? 0.05 : 0.06);
    };
    const onEnter = () => { hovered = true; };
    const onLeave = () => { hovered = false; targetVX = 0; targetVY = vy; };

    wrap.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    const loop = () => {
      vx += (targetVX - vx) * 0.05;
      vy += (targetVY - vy) * 0.05;

      ax += vx;
      ay += vy;

      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const cosY = Math.cos(ay), sinY = Math.sin(ay);

      for (let i = 0; i < tagRefs.current.length; i++) {
        const el = tagRefs.current[i];
        const p = BASE[i];

        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;
        const x1 = p.x;

        const z2 = z1 * cosY - x1 * sinY;
        const x2 = z1 * sinY + x1 * cosY;
        const y2 = y1;

        const front = Math.max(0, Math.min(1, (z2 + radius / 3) / (radius / 3)));
        const opacity = Math.pow(front, 1.2);
        const scale = 0.92 + 0.12 * opacity;
        const blur = 2 * (1 - opacity);

        el.style.transform = `translate(-50%, -50%) translate3d(${x2}px, ${y2}px, ${z2}px) scale(${scale})`;
        el.style.opacity = String(opacity);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el.style as any).filter = `blur(${blur}px)`;
        el.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [BASE, radius]);

  return (
    <section className="sp-section" id="skills-planet" aria-label="Univers de compétences">
      <div ref={wrapRef} className="sp-viewport" role="img" aria-label="Planète de mots interactive">
        <div className="sp-stars" aria-hidden />
        {WORDS.map((w, i) => (
          <span
            key={i}
            ref={addRef}
            className={`sp-tag sp-${w.kind}`}
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {w.text}
          </span>
        ))}
      </div>
    </section>
  );
}
