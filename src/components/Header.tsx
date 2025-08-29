import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/header.css";

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language || "fr";
  const next = lang === "fr" ? "en" : "fr";
  const label = next === "fr" ? t("header.lang_fr") : t("header.lang_en");

  const toggle = () => {
    i18n.changeLanguage(next);
    document.documentElement.setAttribute("lang", next);
  };

  return (
    <button className="lang-toggle" onClick={toggle} aria-label="Changer de langue">
      {label}
    </button>
  );
}

function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const title = theme === "dark" ? t("header.toggle_to_light") : t("header.toggle_to_dark");

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={title}
      title={title}
    >
      {theme === "dark" ? (
        // soleil
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.79 1.41 1.41-1.79 1.8-1.41-1.42zM12 4V1h-0v3h0zm0 19v-3h0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zm12.69-1.79l1.41 1.41-1.79 1.8-1.41-1.42 1.79-1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        // lune
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.74 2.01a9 9 0 109.25 12.2 8 8 0 01-9.25-12.2z"
          />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  const items = [
    { to: "/", label: t("header.home") },
    { to: "/a-propos", label: t("header.about") },
    { to: "/services", label: t("header.services") },
    { to: "/projets", label: t("header.projects") },
    { to: "/contact", label: t("header.contact") },
  ];

  return (
    <header className="header-jc">
      <div className="inner">
        <Link to="/" className="logo" aria-label="Retour à l'accueil">
          <span className="logo-badge">MC</span>
          <span className="logo-text">Malika</span>
        </Link>

        <nav className={`nav-jc ${open ? "open" : ""}`} aria-label="Navigation principale">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}
              end
            >
              {item.label}
            </NavLink>
          ))}

          <LanguageSwitcher />
          <ThemeToggle />
        </nav>

        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir/fermer le menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
