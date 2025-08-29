import { useEffect, useMemo, useRef } from "react";
import "../styles/skills-planet.css";

type Word = { text: string; kind: "hard" | "soft" | "sport" | "trait" };

const WORDS: Word[] = [
  // Hard
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

  // Soft
  { text: "Leadership", kind: "soft" },
  { text: "Esprit d’équipe", kind: "soft" },
  { text: "Communication", kind: "soft" },
  { text: "Pédagogie", kind: "soft" },
  { text: "Gestion de projet", kind: "soft" },
  { text: "Autonomie", kind: "soft" },
  { text: "Rigueur", kind: "soft" },
  { text: "Empathie", kind: "soft" },
  { text: "Résolution de problèmes", kind: "soft" },
  { text: "Créativité", kind: "soft" },

  // Sports/activités
  { text: "Football américain", kind: "sport" },
  { text: "Basket", kind: "sport" },
  { text: "Capoeira", kind: "sport" },
  { text: "Badminton", kind: "sport" },
  { text: "Percussion", kind: "sport" },

  // Traits
  { text: "Persévérance", kind: "trait" },
  { text: "Curiosité", kind: "trait" },
  { text: "Adaptabilité", kind: "trait" },
];

function fibonacciSphere(n: number, radius = 200) {
  const pts: { x: number; y: number; z: number }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
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

  const RADIUS = 220; 
  const BASE = useMemo(() => fibonacciSphere(WORDS.length, RADIUS), []);
  const addRef = (el: HTMLSpanElement | null) => {
    if (el) tagRefs.current.push(el);
  };

  useEffect(() => {
    const wrap = wrapRef.current!;
    if (!wrap) return;

    let raf = 0;
    let ax = -8 * (Math.PI / 180);
    let ay = 16 * (Math.PI / 180);
    let vx = 0; 
    let vy = 0.004; 
    let targetVX = 0,
      targetVY = vy;
    let hovered = false;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width; 
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height; 
      targetVY = dx * 0.06 + (hovered ? 0 : vy); 
      targetVX = -dy * 0.06;
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
      targetVX = 0;
      targetVY = vy;
    };

    wrap.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    const loop = () => {
      vx += (targetVX - vx) * 0.05; 
      vy += (targetVY - vy) * 0.05;

      ax += vx;
      ay += vy;

      const cosX = Math.cos(ax),
        sinX = Math.sin(ax);
      const cosY = Math.cos(ay),
        sinY = Math.sin(ay);

      for (let i = 0; i < tagRefs.current.length; i++) {
        const el = tagRefs.current[i];
        const p = BASE[i];
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;
        const x1 = p.x;

        const z2 = z1 * cosY - x1 * sinY;
        const x2 = z1 * sinY + x1 * cosY;
        const y2 = y1;


        const front = Math.max(
          0,
          Math.min(1, (z2 + RADIUS / 3) / (RADIUS / 3))
        );
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
  }, [BASE]);

  return (
    <section
      className="sp-section"
      id="skills-planet"
      aria-label="Univers de compétences"
    >
     
        <div
          ref={wrapRef}
          className="sp-viewport"
          role="img"
          aria-label="Planète de mots interactive"
        >
          <div className="sp-ring sp-ring--1" aria-hidden />
          <div className="sp-ring sp-ring--2" aria-hidden />
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

        {/* <ul className="sp-legend">
          <li>
            <span className="dot hard" /> Hard skills
          </li>
          <li>
            <span className="dot soft" /> Soft skills
          </li>
          <li>
            <span className="dot sport" /> Sports/activités
          </li>
          <li>
            <span className="dot trait" /> Traits
          </li>
        </ul> */}
    </section>
  );
}
