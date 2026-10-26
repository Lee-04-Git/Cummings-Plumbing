import { useEffect, useRef, type RefObject } from "react";
import { pauseSmoothScroll } from "../lib/smoothScroll";

// Adapted from the focus trap in the 21st.dev "Immersive Full Screen Navigation" component.

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableIn(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => {
    if (el.closest("[inert]")) return false;
    const style = window.getComputedStyle(el);
    return style.visibility !== "hidden" && el.getClientRects().length > 0;
  });
}

type Options = {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onEscape?: () => void;
  /** Return focus to whatever was focused before activation (default true). */
  restoreFocus?: boolean;
};

/** Keeps Tab focus inside a container while active; Escape calls onEscape; restores focus on close. */
export function useFocusTrap({ active, containerRef, initialFocusRef, onEscape, restoreFocus = true }: Options) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = requestAnimationFrame(() => {
      const target = initialFocusRef?.current ?? focusableIn(container)[0] ?? container;
      target.focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusableIn(container);
      if (!items.length) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || !container.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !container.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      if (restoreFocus && previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [active, containerRef, initialFocusRef, restoreFocus]);
}

/** Locks page scroll while active, compensating for the scrollbar to avoid layout shift. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    pauseSmoothScroll(true);
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      pauseSmoothScroll(false);
    };
  }, [active]);
}
