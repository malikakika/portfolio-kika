import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/header.css";

function getHeaderOffset(): number {
  const header = document.querySelector(".header-jc") as HTMLElement | null;
  return header ? header.offsetHeight : 72; 
}

function getScrollableAncestor(el: HTMLElement): HTMLElement | null {
  let p: HTMLElement | null = el.parentElement;
  while (p) {
    const style = getComputedStyle(p);
    const canScrollY =
      /(auto|scroll|overlay)/.test(style.overflowY) && p.scrollHeight > p.clientHeight;
    if (canScrollY) return p;
    p = p.parentElement;
  }
  return null;
}

function scrollToElement(el: HTMLElement, smooth = true) {
  const headerOffset = getHeaderOffset();
  const scrollable = getScrollableAncestor(el);

  if (!scrollable) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  } else {
    const containerTop = scrollable.getBoundingClientRect().top;
    const targetTop = el.getBoundingClientRect().top;
    const top = targetTop - containerTop + scrollable.scrollTop - headerOffset;
    scrollable.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  }
}

type NavItem =
  | { label: string; type: "route"; to: string }
  | { label: string; type: "hash"; hash: string };

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language || "fr";
  const next = lang.startsWith("fr") ? "en" : "fr";
  const label = next === "fr" ? t("header.lang_fr") : t("header.lang_en");

  const toggle = async () => {
    await i18n.changeLanguage(next);
    document.documentElement.setAttribute("lang", next);
  };

  return (
    <button className="lang-toggle" onClick={toggle} aria-label={label} title={label}>
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
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.79 1.41 1.41-1.79 1.8-1.41-1.42zM12 4V1h-0v3h0zm0 19v-3h0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zm12.69-1.79l1.41 1.41-1.79 1.8-1.41-1.42 1.79-1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12.74 2.01a9 9 0 109.25 12.2 8 8 0 01-9.25-12.2z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;

    let tries = 0;
    const maxTries = 80;
    const tick = () => {
      const el = document.querySelector(location.hash) as HTMLElement | null;
      if (el) {
        scrollToElement(el, true);
      } else if (tries < maxTries) {
        tries++;
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, [location.pathname, location.hash]);

  const items: NavItem[] = [
    { label: t("header.home"), type: "route", to: "/" },
    { label: t("header.about"), type: "hash", hash: "#about" },
    { label: t("header.projects"), type: "hash", hash: "#projects" },
    { label: t("header.contact"), type: "hash", hash: "#footer" },
  ];

  const handleAnchorClick =
    (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const isHome = location.pathname === "/";
      const el = document.querySelector(hash) as HTMLElement | null;

      if (isHome) {
        if (el) scrollToElement(el, true);
        else navigate({ pathname: "/", hash }); 
        setOpen(false);
      } else {
        navigate({ pathname: "/", hash });
      }
    };

  return (
    <header className="header-jc">
      <div className="inner">
        <Link
          to="/"
          className="logo"
          aria-label={t("header.home") || "Accueil"}
          onClick={() => setOpen(false)}
        >
          <span className="logo-badge">MC</span>
        </Link>

        <nav className={`nav-jc ${open ? "open" : ""}`} aria-label="Navigation principale">
          {items.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.label}
                to={item.to}
                className="nav-btn"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.label}
                to={{ pathname: "/", hash: item.hash }}
                className="nav-btn"
                onClick={handleAnchorClick(item.hash)}
              >
                {item.label}
              </Link>
            )
          )}

          <LanguageSwitcher />
          <ThemeToggle />
        </nav>

        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir/fermer le menu"
          title="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
