import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../styles/about.css";
import "../styles/education.css";
import SkillsPlanet from "../components/SkillsPlanet";

function HighlightedText({ text }: { text: string }) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "fr").slice(0, 2);

  type Token = { re: RegExp; cls: "hard" | "soft" | "trait" };

  const TOKENS: Token[] =
    lang === "en"
      ? [
          { re: /\bfull[-\s]?stack\b/gi, cls: "hard" },
          { re: /\bfront[-\s]?end\b/gi, cls: "hard" },
          { re: /\bAngular\b/g, cls: "hard" },
          { re: /\bReact(?:\.?js)?\b/g, cls: "hard" },
          { re: /\bVue(?:\.?js)?\b/g, cls: "hard" },
          { re: /\bNestJS\b/gi, cls: "hard" },
          { re: /\bJava\/?Spring\b/gi, cls: "hard" },
          { re: /\bJava\b/g, cls: "hard" },
          { re: /\bSpring\s?Boot\b/gi, cls: "hard" },

          { re: /\bleadership\b/gi, cls: "soft" },
          { re: /\bteam(?:\s?work|work)\b/gi, cls: "soft" },
          { re: /\bproject management\b/gi, cls: "soft" },
          { re: /\baccessible\b/gi, cls: "trait" },
          { re: /\bscalable\b/gi, cls: "trait" },
          { re: /\brobust\b/gi, cls: "trait" },
          { re: /\belegant\b/gi, cls: "trait" },
        ]
      : [
          { re: /\bfull[-\s]?stack\b/gi, cls: "hard" },
          { re: /\bfront[-\s]?end\b/gi, cls: "hard" },
          { re: /\bAngular\b/g, cls: "hard" },
          { re: /\bReact(?:\.?js)?\b/g, cls: "hard" },
          { re: /\bVue(?:\.?js)?\b/g, cls: "hard" },
          { re: /\bNestJS\b/gi, cls: "hard" },
          { re: /\bJava\/?Spring\b/gi, cls: "hard" },
          { re: /\bJava\b/g, cls: "hard" },
          { re: /\bSpring\s?Boot\b/gi, cls: "hard" },

          { re: /\bleadership\b/gi, cls: "soft" },
          { re: /\btravail d[’']équipe\b/gi, cls: "soft" },
          { re: /\bgestion de projet\b/gi, cls: "soft" },
          { re: /\baccessible(s)?\b/gi, cls: "trait" },
          { re: /\bévolutive(s)?\b/gi, cls: "trait" },
          { re: /\brobuste(s)?\b/gi, cls: "trait" },
          { re: /\bélegant(es)?\b/gi, cls: "trait" },
        ];

  const parts: React.ReactNode[] = [];
  let pos = 0;

  while (pos < text.length) {
    let nextIndex = Infinity;
    let hit: {
      start: number;
      end: number;
      cls: Token["cls"];
      match: string;
    } | null = null;

    for (const tok of TOKENS) {
      const re = new RegExp(tok.re.source, tok.re.flags.replace("g", "") + "g");
      re.lastIndex = pos;
      const m = re.exec(text);
      if (m && m.index < nextIndex) {
        nextIndex = m.index;
        hit = { start: m.index, end: re.lastIndex, cls: tok.cls, match: m[0] };
      }
    }

    if (!hit) {
      parts.push(text.slice(pos));
      break;
    }

    if (hit.start > pos) parts.push(text.slice(pos, hit.start));
    parts.push(
      <span key={pos} className={`kw kw-${hit.cls}`}>
        {hit.match}
      </span>
    );
    pos = hit.end;
  }

  return <>{parts}</>;
}

type Xp = {
  id: string;
  period: string;
  role: string;
  company: string;
  location?: string;
  mode?: string;
  bullets: string[];
  stack: string[];
};
type Edu = {
  id: string;
  period: string;
  degree: string;
  school: string;
  location: string;
  logo?: string;
};

const easeOutExpo = [0.17, 0.84, 0.44, 1] as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};
const listVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

function XpCard({ xp }: { xp: Xp }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <motion.li
      className={`ae-xp-card ${open ? "is-open" : ""}`}
      variants={itemVariants}
      whileHover={{ y: -2 }}
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLElement;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--rx", `${(py - 0.5) * 4}deg`);
        el.style.setProperty("--ry", `${(0.5 - px) * 6}deg`);
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.setProperty("--rx", `0deg`);
        el.style.setProperty("--ry", `0deg`);
      }}
    >
      <span className="ae-dot" aria-hidden />
      <span className="ae-line" aria-hidden />

      <div className="ae-card-inner">
        <div className="ae-head">
          <span className="ae-period">{xp.period}</span>
          <h3 className="ae-title">
            {xp.role} <span className="ae-company">@ {xp.company}</span>
          </h3>
          {(xp.location || xp.mode) && (
            <span className="ae-meta">
              {xp.location ? xp.location : ""}
              {xp.location && xp.mode ? " · " : ""}
              {xp.mode ? xp.mode : ""}
            </span>
          )}
        </div>

        <motion.div
          id={`xp-body-${xp.id}`}
          className="ae-details"
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.32, ease: easeOutExpo }}
        >
          <ul className="ae-bullets">
            {xp.bullets?.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="ae-tags">
            {xp.stack?.map((tag) => (
              <span className="ae-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <button
          className="ae-expand"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`xp-body-${xp.id}`}
        >
          <span className="ae-expand-label">
            {open
              ? t("experience.less")
              : t("experience.more")}
          </span>
          <span className={`ae-chevron ${open ? "open" : ""}`} aria-hidden />
        </button>
      </div>
    </motion.li>
  );
}

export default function AboutExperience() {
  const { t } = useTranslation();

  const title = (t("about.title") as string) || "Qui est Malika ?";
  const desc = (t("about.desc") as string) || "";

  const items = (t("experience.items", { returnObjects: true }) || []) as Xp[];
  const eduItems = (t("education.items", { returnObjects: true }) ||
    []) as Edu[];

  const xpRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: xpRef,
    offset: ["start 0.15", "end 0.2"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.3,
  });

  return (
    <section className="ae-section" id="about">
      <div className="ae-container">
        <motion.div
          className="ae-intro-grid"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.45 }}
        >
          <div className="ae-intro-left">
            <div className="ae-title-wrap">
              <h2 className="ae-h2">
                {title} <span className="ae-underline" aria-hidden />
              </h2>
            </div>
            <p className="ae-desc">
              <HighlightedText text={desc} />
            </p>
          </div>

          <div className="ae-intro-right">
            <SkillsPlanet />
          </div>
        </motion.div>

        <div className="ae-grid">
          <motion.div
            ref={xpRef}
            className="ae-xp-wrap"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="ae-title-wrap" style={{ marginBottom: 10 }}>
              <h2 className="ae-h2">
                {t("experience.title")}
                <span className="ae-underline" aria-hidden />
              </h2>
            </div>

            <motion.span
              className="ae-progress"
              style={{ scaleY: progress }}
              aria-hidden
            />

            <motion.ul
              className="ae-xp-list"
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {items.map((xp) => (
                <XpCard key={xp.id} xp={xp} />
              ))}
            </motion.ul>
          </motion.div>

          <motion.aside
            className="ae-edu"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ul className="edu-stack">
              {eduItems.map((ed, i) => {
                const starts = [
                  { x: -120, y: -60, r: -10, s: 0.96 },
                  { x: 120, y: -40, r: 10, s: 0.96 },
                  { x: 0, y: -120, r: 0, s: 0.95 },
                ];
                const s = starts[i % starts.length];
                return (
                  <motion.li
                    key={ed.id}
                    className="edu-card"
                    initial={{
                      x: s.x,
                      y: s.y,
                      rotate: s.r,
                      scale: s.s,
                      opacity: 0,
                    }}
                    whileInView={{
                      x: [s.x, s.x * 0.4, 0],
                      y: [s.y, 12, 0],
                      rotate: [s.r, s.r * 0.3, 0],
                      scale: [s.s, 1.02, 1],
                      opacity: [0, 0.9, 1],
                    }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 2.0 + i * 0.12, ease: easeOutExpo }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    whileHover={{ "--rx": "2deg" } as any}
                  >
                    <div className="edu-card-inner">
                      <div className="edu-logo-wrap">
                        {ed.logo ? (
                          <img
                            className="edu-logo"
                            src={ed.logo}
                            alt={ed.school}
                            loading="lazy"
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        ) : null}
                      </div>
                      <div className="edu-info">
                        <span className="edu-period">{ed.period}</span>
                        <h4 className="edu-degree">{ed.degree}</h4>
                        <p className="edu-school">
                          {ed.school}{" "}
                          <span className="edu-loc">— {ed.location}</span>
                        </p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
