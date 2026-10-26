import type { CSSProperties } from "react";
import { Img, type ImageKey } from "./Img";

type Fade = "left" | "right" | "bottom" | "top" | "edges";

const masks: Record<Fade, string> = {
  // e.g. "left": the image fades out towards the left, where the copy usually sits.
  left: "linear-gradient(to right, transparent 0%, transparent 20%, black 75%)",
  right: "linear-gradient(to left, transparent 0%, transparent 20%, black 75%)",
  bottom: "linear-gradient(to top, black 0%, transparent 80%)",
  top: "linear-gradient(to bottom, black 0%, transparent 80%)",
  edges: "radial-gradient(ellipse at center, black 25%, transparent 72%)",
};

type Props = {
  name: ImageKey;
  /** Which side fades out. */
  fade?: Fade;
  opacity?: number;
  position?: string;
  /** "multiply" suits light sections, "screen"/"soft-light" suit dark ones. */
  blend?: CSSProperties["mixBlendMode"];
  /** Keep the photo's colour (default) or render it in greyscale. */
  grayscale?: boolean;
  className?: string;
};

/** A faint photographic texture behind a section. Parent section must be `relative isolate`. */
export function FaintImage({
  name,
  fade = "left",
  opacity = 0.18,
  position = "50% 50%",
  blend = "multiply",
  grayscale = false,
  className = "",
}: Props) {
  const mask = masks[fade];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <Img
        name={name}
        alt=""
        sizes="70vw"
        className={`h-full w-full ${grayscale ? "grayscale" : "saturate-[0.85]"}`}
        style={{
          opacity,
          objectPosition: position,
          mixBlendMode: blend,
          maskImage: mask,
          WebkitMaskImage: mask,
          backgroundImage: "none",
        }}
      />
    </div>
  );
}
