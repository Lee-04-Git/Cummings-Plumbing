import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_FLOW = [0.65, 0, 0.35, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  amount?: number;
};

/** Fade + rise when scrolled into view. Plays once, never blocks content for long. */
export function Reveal({ children, delay = 0, y = 28, amount = 0.2, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Loose amber marker stroke under a word — drawn once, like a pen underline on a quote. */
export function Scribble({ delay = 0.7, className = "" }: { delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    // Sits below the baseline (clear of descenders like g, p, y) and spans exactly the word.
    <svg
      aria-hidden="true"
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -bottom-[0.2em] h-[0.18em] w-full overflow-visible text-signal ${className}`}
    >
      <motion.path
        d="M4 13 C 70 6, 150 5, 220 8 S 285 13, 296 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay }}
      />
    </svg>
  );
}

/** Handwritten note with a hand-drawn arrow. `direction` is where the arrow points. */
export function HandNote({
  children,
  direction = "left",
  className = "",
}: {
  children: ReactNode;
  direction?: "left" | "up" | "down";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const paths = {
    left: "M58 8 C 44 2, 22 4, 8 18 M8 18 L 9 7 M8 18 L 19 17",
    up: "M30 46 C 24 34, 22 20, 28 6 M28 6 L 20 13 M28 6 L 35 14",
    down: "M14 4 C 30 10, 36 26, 30 44 M30 44 L 23 36 M30 44 L 38 37",
  };
  return (
    <span className={`hand inline-flex items-center gap-1 text-[1.45rem] text-tide-deep ${className}`}>
      {direction === "left" && <Arrow d={paths.left} reduced={reduced} w={64} h={24} />}
      <span className={direction === "left" ? "-rotate-2" : "rotate-[-3deg]"}>{children}</span>
      {direction !== "left" && <Arrow d={paths[direction]} reduced={reduced} w={44} h={50} />}
    </span>
  );
}

function Arrow({ d, reduced, w, h }: { d: string; reduced: boolean | null; w: number; h: number }) {
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${w} ${h}`} className="shrink-0" style={{ width: w * 0.9, height: h * 0.9 }}>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
      />
    </svg>
  );
}

/** Section kicker: short amber dash + sentence-case text. */
export function SectionLabel({
  children,
  tone = "dark",
  className = "",
}: {
  index?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const color = tone === "light" ? "text-signal" : "text-tide-deep";
  return (
    <p className={`label flex items-center gap-2.5 ${color} ${className}`}>
      <span aria-hidden="true" className="h-[3px] w-5 rounded-full bg-current" />
      <span>{children}</span>
    </p>
  );
}
