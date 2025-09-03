import {  useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import EmailIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { scrollWow } from "../utils/scrollWow";
import "../styles/footer.css";

const EMAIL_ADDR = "malikachoubri@gmail.com";
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(
  EMAIL_ADDR
)}&su=${encodeURIComponent("Hello Malika")}&body=${encodeURIComponent(
  "Bonjour Malika,\n\nJe vous contacte à propos de ..."
)}`;

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();

  const opts = { duration: 1100, overshoot: 100 };

  const handleHashNav =
    (hash: string): React.MouseEventHandler<HTMLAnchorElement> =>
    (e) => {
      const isHome = location.pathname === "/";
      if (isHome) {
        e.preventDefault();
        scrollWow(hash, opts);
      }
    };

  const handleHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isHome = location.pathname === "/";
    if (isHome) {
      e.preventDefault();
      try {
        scrollWow("body", opts);
      } catch {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="site-footer" id="footer">
      <motion.div
        className="foot-glow"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        aria-hidden
      />

      <div className="foot-inner">
        <div className="foot-cta">
          <div className="foot-left">
            <h2 className="foot-title">
              {t("footer.title")}
              <span className="foot-underline" aria-hidden />
            </h2>
            <p className="foot-tagline">{t("footer.tagline")}</p>

            <div className="foot-actions">
              <a
                href={GMAIL_COMPOSE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary"
              >
                <EmailIcon style={{ fontSize: 18 }} /> {t("footer.cta_email") || "Open Gmail"}
              </a>

              <a
                href="/#projects"
                className="btn ghost"
                onClick={handleHashNav("#projects")}
              >
                {t("footer.view_work")}
              </a>

              <a
                href="https://www.linkedin.com/in/malika-choubri"
                target="_blank"
                rel="noopener noreferrer"
                className="btn linkedin"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon style={{ fontSize: 18 }} />
              </a>
              <a
                href="https://github.com/malikakika"
                target="_blank"
                rel="noopener noreferrer"
                className="btn github"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHubIcon style={{ fontSize: 18 }} />
              </a>
            </div>
          </div>

          <motion.div
            className="foot-card"
            initial={{ y: 14, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <div className="foot-card-head">
              <span className="ping" aria-hidden />
              <span className="chip">{t("footer.available")}</span>
            </div>
            <p className="foot-card-text">{t("footer.pitch")}</p>
            <div className="foot-card-actions">
              <a
                href={GMAIL_COMPOSE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn tiny"
              >
                {t("footer.email_me") || "Email me"}
              </a>
            
            </div>
          </motion.div>
        </div>

        <nav className="foot-links" aria-label={t("footer.quick_links_aria") as string}>
          <a href="/" onClick={handleHome}>{t("header.home")}</a>
          <a href="/#about" onClick={handleHashNav("#about")}>{t("header.about")}</a>
          <a href="/#projects" onClick={handleHashNav("#projects")}>{t("header.projects")}</a>
          <a href="/#footer" onClick={handleHashNav("#footer")}>{t("header.contact")}</a>
        </nav>

        <div className="foot-meta">
          <span>© {new Date().getFullYear()} Malika Choubri.</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
