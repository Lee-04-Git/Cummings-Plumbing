import type { CSSProperties } from "react";
import manifest from "../data/image-manifest.json";

export type ImageKey = keyof typeof manifest;

type ImgProps = {
  name: ImageKey;
  alt: string;
  /** Matches the rendered width, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string;
  className?: string;
  style?: CSSProperties;
  /** Above-the-fold images: load eagerly with high priority. */
  priority?: boolean;
};

export function imageSrc(name: ImageKey, width = 1200) {
  const { widths } = manifest[name];
  const w = widths.find((candidate) => candidate >= width) ?? widths[widths.length - 1];
  return `/images/${name}-${w}.webp`;
}

export function Img({ name, alt, sizes, className = "", style, priority = false }: ImgProps) {
  const meta = manifest[name];
  const srcSet = meta.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", ");

  return (
    <img
      src={imageSrc(name)}
      srcSet={srcSet}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`object-cover ${className}`}
      style={{
        backgroundImage: `url(${meta.lqip})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    />
  );
}

export function imageCredit(name: ImageKey) {
  return manifest[name].credit;
}
