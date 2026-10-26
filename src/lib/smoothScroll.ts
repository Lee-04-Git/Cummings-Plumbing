import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Starts inertia scrolling (desktop wheel/trackpad). Skipped when reduced motion is requested. */
export function startSmoothScroll() {
  if (lenis || typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    anchors: { offset: -96 },
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

export function scrollToTarget(target: HTMLElement | number, smooth = true) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -96, immediate: !smooth, force: true });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: smooth ? "smooth" : "instant" });
  else target.scrollIntoView({ behavior: smooth ? "smooth" : "instant", block: "start" });
}

export function pauseSmoothScroll(paused: boolean) {
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}
