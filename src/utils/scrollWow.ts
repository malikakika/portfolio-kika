type Opts = {
  duration?: number;
  offset?: number;     
  overshoot?: number;  
  ease?: (t: number) => number;
};

const easeOutBack = (t: number) => {
  const c1 = 1.70158, c3 = c1 + 1;
  const x = t - 1;
  return 1 + c3 * x * x * x + c1 * x * x;
};

function getY(target: string | Element, offset = 0) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return window.pageYOffset;
  const rect = (el as HTMLElement).getBoundingClientRect();
  return rect.top + window.pageYOffset - offset;
}

export function scrollWow(target: string | Element, opts: Opts = {}) {
  const header = document.querySelector(".header-jc") as HTMLElement | null;
  const offset = opts.offset ?? ((header?.offsetHeight ?? 0) + 12);
  const startY = window.pageYOffset;
  const endY = getY(target, offset);
  const dist = endY - startY;

  const duration = Math.max(200, Math.min(opts.duration ?? 900, 3000));
  const overshoot = opts.overshoot ?? 80;
  const ease = opts.ease ?? easeOutBack;

  const start = performance.now();

  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const e = ease(p);
    const extra = overshoot * (1 - p); 
    window.scrollTo({ top: startY + dist * e + extra, behavior: "auto" });
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step); 
}
