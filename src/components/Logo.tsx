// The client's logo artwork (src/logo.png), exported to public/brand by scripts/build-logo.mjs.

const SIZES = {
  nav: { width: 395, height: 112 },
  full: { width: 560, height: 159 },
} as const;

type LogoProps = {
  className?: string;
  /** "light" = white lettering for dark backgrounds. */
  tone?: "dark" | "light";
  /** "nav" omits the tagline so the lockup stays legible at small sizes. */
  variant?: "nav" | "full";
  /** Empty when the logo sits inside a link that already has an accessible name. */
  alt?: string;
};

/**
 * Renders both tones stacked and cross-fades between them, so the header can switch from the
 * light logo (over the dark hero) to the dark logo (on the solid header) without a jump.
 */
export function Logo({ className = "h-11 sm:h-12", tone = "dark", variant = "nav", alt = "Cummings Plumbing CC" }: LogoProps) {
  const { width, height } = SIZES[variant];
  const img = (t: "dark" | "light") => `/brand/logo-${variant}${t === "light" ? "-light" : ""}.webp`;

  return (
    <span className={`relative inline-block ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <img
        src={img("dark")}
        alt={tone === "dark" ? alt : ""}
        width={width}
        height={height}
        decoding="async"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${tone === "dark" ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={img("light")}
        alt={tone === "light" ? alt : ""}
        width={width}
        height={height}
        decoding="async"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${tone === "light" ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}

/** The drop mark on its own (business card, small placements). */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return <img src="/brand/mark.webp" alt="" width={128} height={128} decoding="async" className={className} />;
}
