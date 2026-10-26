import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ComponentType, type CSSProperties, type ReactNode, type SVGProps } from "react";
import { Button } from "./Button";
import { Img, type ImageKey } from "./Img";
import { EASE, Scribble } from "./motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

/** Key word(s) in a hero headline: seafoam, with a hand-drawn underline sitting below the letters. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap text-signal">
      {children}
      <Scribble />
    </span>
  );
}

type Action = {
  to: string;
  label: string;
  variant?: "signal" | "outline-light" | "whatsapp";
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

type Props = {
  /** Small kicker above the headline. */
  label: string;
  /** Headline lines. Wrap the key word(s) of the last line in <Accent>. */
  lines: ReactNode[];
  subheading?: string;
  intro?: ReactNode;
  /** First action is the primary button; the rest are outlined. */
  actions?: Action[];
  facts?: { label: string; value: ReactNode }[];
  image: ImageKey;
  /** Describes the photo (kept for content/docs; the photo itself is decorative background). */
  imageAlt?: string;
  /** CSS object-position for the desktop crop. */
  position?: string;
  /** CSS object-position for the phone crop (narrow, tall viewport). Defaults to `position`. */
  mobilePosition?: string;
  titleId?: string;
};

/**
 * Opening section used on every page: full-bleed photograph with the copy over it, on every
 * screen size. Desktop tints only behind the copy (left); phones use a top-to-bottom tint so the
 * text stays readable across the narrow frame.
 */
export function HeroBanner({
  label,
  lines,
  subheading,
  intro,
  actions = [],
  facts = [],
  image,
  position = "50% 50%",
  mobilePosition,
  titleId = "page-title",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "12%"]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white"
      aria-labelledby={titleId}
    >
      {/* Full-bleed photograph */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-20" style={{ y: imageY }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: reduced ? 1 : 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
        >
          <Img
            name={image}
            alt=""
            sizes="100vw"
            priority
            className="h-full w-full object-[var(--pos-m)] lg:object-[var(--pos-d)]"
            style={{ "--pos-m": mobilePosition ?? position, "--pos-d": position } as CSSProperties}
          />
        </motion.div>
      </motion.div>
      {/* Phones: even tint, a little deeper where the copy sits at the bottom. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/65 to-ink/90 lg:hidden" />
      {/* Desktop: tint only where the copy sits; the right side of the photo stays clear. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,rgb(43_58_78/0.9)_0%,rgb(43_58_78/0.78)_30%,rgb(43_58_78/0.25)_55%,rgb(43_58_78/0)_72%)] lg:block"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 hidden h-40 bg-gradient-to-b from-ink/45 to-transparent lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/3 bg-gradient-to-t from-ink/55 to-transparent lg:block" />

      <div className="shell relative pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-44 lg:pb-36">
        <motion.p {...fadeUp(0.1)} className="label flex items-center gap-2.5 text-sky">
          <span aria-hidden="true" className="h-[3px] w-5 rounded-full bg-current" />
          {label}
        </motion.p>

        <motion.h1 {...fadeUp(0.18)} id={titleId} className="display-xl mt-5 max-w-4xl lg:mt-6">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        {subheading && (
          <motion.p {...fadeUp(0.32)} className="mt-8 max-w-xl text-[clamp(1.1rem,1.7vw,1.45rem)] leading-snug font-semibold">
            {subheading}
          </motion.p>
        )}
        {intro && (
          <motion.div {...fadeUp(0.4)} className="lede mt-3 max-w-xl text-white/80">
            {intro}
          </motion.div>
        )}

        {actions.length > 0 && (
          <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-9">
            {actions.map((a, i) => (
              <Button
                key={a.label}
                to={a.to}
                icon={a.icon}
                variant={a.variant ?? (i === 0 ? "signal" : "outline-light")}
                size="lg"
                arrow={i !== 0 && !a.icon}
                className={`w-full sm:w-auto ${i === 0 ? "shadow-[0_18px_40px_-16px_rgb(134_203_193/0.6)]" : "backdrop-blur-sm"}`}
              >
                {a.label}
              </Button>
            ))}
          </motion.div>
        )}

        {facts.length > 0 && (
          <motion.dl
            {...fadeUp(0.65)}
            className="mt-10 divide-y divide-white/10 border-t border-white/15 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-8 sm:divide-y-0 sm:pt-6 lg:mt-20 lg:max-w-4xl"
          >
            {/* Phones: a tidy label/value list. Larger screens: three columns. */}
            {facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 py-3 sm:block sm:py-0">
                <dt className="shrink-0 text-sm text-white/60">{f.label}</dt>
                <dd className="min-w-0 text-right font-semibold [overflow-wrap:anywhere] sm:mt-1 sm:text-left">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>

      {/* Gentle curve into the page. Sits 1px past the bottom edge so no hairline of the dark
          background shows on high-density screens when the edge lands on a fractional pixel. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 -bottom-px block h-[calc(clamp(2rem,5vw,4.5rem)+2px)] w-full"
      >
        <path d="M0 48 C 320 92, 640 92, 960 56 C 1160 34, 1320 30, 1440 40 L 1440 82 L 0 82 Z" className="fill-paper" />
      </svg>
    </section>
  );
}
