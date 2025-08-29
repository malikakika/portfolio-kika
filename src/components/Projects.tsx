import {  useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../styles/projects.css";

type Project = {
  id: string;
  title: string;
  period?: string;         
  brief: string;          
  stack: string[];         
  category: "web" | "platform" | "pwa" | "ecommerce" | "mobile" | "game" | "contrib" | "other";
  live?: string;           
  repo?: string;           
  cover?: string;           
};

const easeOutExpo = [0.17, 0.84, 0.44, 1] as const;

const sectionV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};
const listV: Variants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: .5, ease: easeOutExpo } },
};

export default function Projects() {
  const { t } = useTranslation();

  const items = (t("projects.items", { returnObjects: true }) || []) as Project[];



  const [cat,] = useState<"all" | Project["category"]>("all");

  const visible = items.filter(p => (cat === "all" ? true : p.category === cat));

  return (
    <section className="pj-section" id="projects">
      <div className="pj-container">
        <motion.div
          className="pj-head"
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="pj-h2">
            {t("projects.title", "Mes projets")}
            <span className="pj-underline" aria-hidden />
          </h2>
          <p className="pj-sub">{t("projects.subtitle", "Une sélection de réalisations récentes.")}</p>

        
        </motion.div>

        <motion.ul
          className="pj-grid"
          variants={listV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {visible.map((p) => (
            <motion.li
              key={p.id}
              className="pj-card"
              variants={itemV}
              whileHover={{ y: -3 }}
              onMouseMove={(e) => {
                const el = e.currentTarget as HTMLElement;
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                el.style.setProperty("--rx", `${(-py) * 3}deg`);
                el.style.setProperty("--ry", `${(px) * 4}deg`);
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.setProperty("--rx", "0deg");
                el.style.setProperty("--ry", "0deg");
              }}
              style={{ transform: "perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0))" } as React.CSSProperties}
            >
              <div className="pj-cover">
                {p.cover ? (
                  <img src={p.cover} alt={p.title} loading="lazy"
                       onError={(e) => (e.currentTarget.style.display = "none")} />
                ) : (
                  <div className="pj-fallback" aria-hidden />
                )}
                {p.period && <span className="pj-period">{p.period}</span>}
                <span className={`pj-cat cat-${p.category}`}>{t(`projects.categories.${p.category}`, p.category)}</span>
              </div>

              <div className="pj-body">
                <h3 className="pj-title">{p.title}</h3>
                <p className="pj-brief">{p.brief}</p>
                <div className="pj-tags">
                  {p.stack?.slice(0, 8).map(tag => <span key={tag} className="pj-tag">{tag}</span>)}
                </div>
              </div>

              {(p.live || p.repo) && (
                <div className="pj-actions">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn small primary">
                      {t("projects.view", "Voir le projet")}
                      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5V3H3v7h2V5zm0 14h5v2H3v-7h2v5zm14 0v-5h2v7h-7v-2h5z"/>
                      </svg>
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="btn small">
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
