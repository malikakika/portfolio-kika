import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import EmailIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import DownloadIcon from "@mui/icons-material/Download";

import "../styles/footer.css";
import i18n from "../i18n";

function getHeaderOffset(): number {
  const header = document.querySelector(".header-jc") as HTMLElement | null;
  return header ? header.offsetHeight : 72;
}

function getScrollableAncestor(el: HTMLElement): HTMLElement | null {
  let p: HTMLElement | null = el.parentElement;
  while (p) {
    const style = getComputedStyle(p);
    const canScrollY =
      /(auto|scroll|overlay)/.test(style.overflowY) &&
      p.scrollHeight > p.clientHeight;
    if (canScrollY) return p;
    p = p.parentElement;
  }
  return null;
}

function scrollToElement(el: HTMLElement, smooth = true) {
  const headerOffset = getHeaderOffset();
  const scrollable = getScrollableAncestor(el);
  if (!scrollable) {
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  } else {
    const containerTop = scrollable.getBoundingClientRect().top;
    const targetTop = el.getBoundingClientRect().top;
    const top = targetTop - containerTop + scrollable.scrollTop - headerOffset;
    scrollable.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  }
}

function assetUrl(relPath: string) {
  const base = import.meta.env.BASE_URL || "/";
  return new URL(relPath, window.location.origin + base).toString();
}

async function downloadFile(url: string, filename: string) {
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

const EMAIL_ADDR = "malikachoubri@gmail.com";
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(
  EMAIL_ADDR
)}&su=${encodeURIComponent("Hello Malika")}&body=${encodeURIComponent(
  "Bonjour Malika,\n\nJe vous contacte à propos de ..."
)}`;

const CV_FILES: Record<string, { path: string; filename: string }> = {
  fr: {
    path: "assets/cv/Malika_Choubri_CV_FR.pdf",
    filename: "Malika_Choubri_CV_FR.pdf",
  },
  en: {
    path: "assets/cv/Malika_Choubri_CV_EN.pdf",
    filename: "Malika_Choubri_CV_EN.pdf",
  },
};

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const lang = (i18n.resolvedLanguage || i18n.language || "fr")
    .slice(0, 2)
    .toLowerCase();
  const cv = CV_FILES[lang] ?? CV_FILES.en;
  const cvUrl = assetUrl(cv.path);

  const goToHash = (hash: string) => {
    const isHome = location.pathname === "/";
    if (isHome) {
      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) scrollToElement(el, true);
      else navigate({ pathname: "/", hash });
    } else {
      navigate({ pathname: "/", hash });
    }
  };

  const handleHashNav =
    (hash: string): React.MouseEventHandler<HTMLAnchorElement> =>
    (e) => {
      e.preventDefault();
      goToHash(hash);
    };

  const handleHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isHome = location.pathname === "/";
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ pathname: "/", hash: "" });
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
                <EmailIcon style={{ fontSize: 18 }} />{" "}
                {t("footer.cta_email") || "Open Gmail"}
              </a>

              <a
                href="/#projects"
                className="btn ghost"
                onClick={handleHashNav("#projects")}
              >
                {t("footer.view_work")}
              </a>

              <button
                className="btn secondary"
                onClick={() => downloadFile(cvUrl, cv.filename)}
                aria-label={t("home.cta_cv") || "Download CV"}
                title={t("home.cta_cv") || "Download CV"}
              >
                <DownloadIcon style={{ fontSize: 20, marginRight: 8 }} />
                <span>{t("home.cta_cv")}</span>
              </button>

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

        <nav
          className="foot-links"
          aria-label={t("footer.quick_links_aria") as string}
        >
          <Link to="/" onClick={handleHome}>
            {t("header.home")}
          </Link>
          <Link
            to={{ pathname: "/", hash: "#about" }}
            onClick={handleHashNav("#about")}
          >
            {t("header.about")}
          </Link>
          <Link
            to={{ pathname: "/", hash: "#projects" }}
            onClick={handleHashNav("#projects")}
          >
            {t("header.projects")}
          </Link>
          <Link
            to={{ pathname: "/", hash: "#footer" }}
            onClick={handleHashNav("#footer")}
          >
            {t("header.contact")}
          </Link>
        </nav>

        <div className="foot-meta">
          <span>© {new Date().getFullYear()} Malika Choubri.</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
