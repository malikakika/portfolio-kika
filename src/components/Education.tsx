import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../styles/education.css";

type Edu = {
  id: string;
  period: string;
  degree: string;
  school: string;
  location: string;
  logo?: string;
};

const STARTS = [
  { x: -120, y: -60, r: -12, s: 0.96 }, 
  { x:  120, y: -40, r:  12, s: 0.96 }, 
  { x:    0, y: -140, r:   0, s: 0.95 }, 
  { x:  -80, y: -30, r:   8, s: 0.97 } 
];

export default function Education() {
  const { t } = useTranslation();
  const items = (t("education.items", { returnObjects: true }) || []) as Edu[];
  const title = (t("education.section_title") as string) || "Education";

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="edu-section" id="education">
      <div className="edu-container">
        <div className="edu-headline">
          <h2 className="edu-h2">
            {title}
            <span className="edu-underline" aria-hidden />
          </h2>
          <div className="edu-orb" aria-hidden />
        </div>

        <ul className="edu-stack">
          {items.map((it, i) => {
            const s = STARTS[i % STARTS.length];

            return (
              <motion.li
                key={it.id}
                className="edu-card"
                initial={{
                  x: s.x, y: s.y, rotate: s.r, scale: s.s, opacity: 0
                }}
                whileInView={{
                  x: [s.x, s.x * 0.4, 0],
                  y: [s.y, 12, 0],
                  rotate: [s.r, s.r * 0.3, 0],
                  scale: [s.s, 1.02, 1],
                  opacity: [0, 0.9, 1]
                }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 2.1 + i * 0.12,  
                  ease: [0.17, 0.84, 0.44, 1] 
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="edu-card-inner">
                  <div className="edu-logo-wrap">
                    {it.logo ? (
                      <img
                        className="edu-logo"
                        src={it.logo}
                        alt={it.school}
                        loading="lazy"
                        onError={(e) => ((e.currentTarget.style.display = "none"))}
                      />
                    ) : null}
                  </div>

                  <div className="edu-info">
                    <span className="edu-period">{it.period}</span>
                    <h3 className="edu-degree">{it.degree}</h3>
                    <p className="edu-school">
                      {it.school} <span className="edu-loc">— {it.location}</span>
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
