import { motion } from "motion/react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

type Variant = "signal" | "outline-light" | "outline-dark" | "ink" | "whatsapp";

const variants: Record<Variant, string> = {
  whatsapp: "bg-[#25D366] text-ink hover:bg-[#3ee07c]",
  signal: "bg-signal text-ink hover:bg-signal-light",
  ink: "bg-ink text-paper hover:bg-ink-3",
  "outline-light": "text-paper ring-1 ring-inset ring-paper/30 hover:ring-paper hover:bg-paper/5",
  "outline-dark": "text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink hover:bg-ink/[0.04]",
};

type Props = {
  to: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Show the trailing arrow (default true for internal links). */
  arrow?: boolean;
  className?: string;
  size?: "md" | "lg";
  ariaLabel?: string;
  onClick?: () => void;
};

const MotionLink = motion.create(Link);

/** Pill-shaped action. Internal routes render a router Link; tel:/mailto:/http render an anchor. */
export function Button({
  to,
  children,
  variant = "signal",
  icon: Icon,
  arrow,
  className = "",
  size = "md",
  ariaLabel,
  onClick,
}: Props) {
  const external = /^(tel:|mailto:|https?:)/.test(to);
  const showArrow = arrow ?? !external;
  const sizing = size === "lg" ? "min-h-14 px-7 text-[1.02rem]" : "min-h-12 px-6 text-[0.95rem]";
  const classes = `group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[-0.01em] transition-[background-color,box-shadow,color] duration-300 ${sizing} ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon aria-hidden="true" className="h-[1.1em] w-[1.1em] shrink-0" strokeWidth={2} />}
      <span>{children}</span>
      {showArrow && (
        <span aria-hidden="true" className="relative -mr-1 inline-flex h-[1.15em] w-[1.15em] overflow-hidden">
          <ArrowUpRight className="absolute inset-0 h-full w-full transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-full group-hover:-translate-y-full" />
          <ArrowUpRight className="absolute inset-0 h-full w-full -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  );

  const tap = { scale: 0.97 };

  if (external) {
    return (
      <motion.a href={to} className={classes} whileTap={tap} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </motion.a>
    );
  }

  return (
    <MotionLink to={to} className={classes} whileTap={tap} aria-label={ariaLabel} onClick={onClick}>
      {content}
    </MotionLink>
  );
}
