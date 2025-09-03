import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/EmailRounded";
import HeroImage from "../assets/malika-hero.png";
import "../styles/home.css";
import AboutExperience from "../components/About";
import Projects from "../components/Projects";

const EMAIL_ADDR = "malikachoubri@gmail.com";
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(
  EMAIL_ADDR
)}&su=${encodeURIComponent("Hello Malika")}&body=${encodeURIComponent(
  "Bonjour Malika,\n\nJe vous contacte à propos de ..."
)}`;

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <section className="hero-wrapper">
        <motion.div
          className="hero-blob"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="hero-content">
          <motion.span
            className="hero-badge"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {t("home.hello")}
          </motion.span>

          <motion.h1
            className="hero-title"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Trans
              i18nKey="home.i_am"
              components={{ strong: <span className="highlight-orange" /> }}
            />
            <br />
            <span className="hero-role">{t("home.role")}</span>
          </motion.h1>

          <motion.p
            className="hero-desc"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t("home.desc")}
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <a
              href="https://www.linkedin.com/in/malika-choubri"
              className="btn linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon style={{ fontSize: 20 }} />
            </a>

            <a
              href="https://github.com/malikakika"
              className="btn github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon style={{ fontSize: 20 }} />
            </a>

            <a
              href={GMAIL_COMPOSE}
              className="btn email"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.cta_email") || "Open Gmail"}
              title={t("footer.cta_email") || "Open Gmail"}
            >
              <EmailIcon style={{ fontSize: 20 }} />
            </a>

            <a href="#projects" className="btn primary">
              {t("home.cta_projects")}
            </a>
          </motion.div>

          <motion.ul
            className="hero-stats"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
            }}
          >
            {[
              { k: "4+", v: t("home.stat_years") },
              { k: "25+", v: t("home.stat_projects") },
              { k: "FullStack", v: t("home.stat_stack") },
            ].map((s) => (
              <motion.li
                key={s.k + s.v}
                className="stat"
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.03 }}
              >
                <strong>{s.k}</strong>
                <span>{s.v}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="hero-stack"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <span>{t("home.stack_label")}</span> React • Angular • Next.js • NestJS • Spring Boot • PostgreSQL • Docker ...
          </motion.div>
        </div>

        <motion.div
          className="hero-image"
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          whileHover={{ y: -6 }}
        >
          <img src={HeroImage} alt="Malika Choubri" />
          <motion.div
            className="hero-badge-exp"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <strong>4+</strong> {t("home.stat_years")}
          </motion.div>
        </motion.div>
      </section>

      <AboutExperience />
      <Projects />
    </>
  );
}
