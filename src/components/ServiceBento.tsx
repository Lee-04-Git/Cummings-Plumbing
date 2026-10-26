import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "../data/services";
import { Img } from "./Img";
import { EASE } from "./motion";

// Desktop bento: wide / narrow, then narrow / wide.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

type Props = {
  /** Where each tile links: the services page section, or an in-page anchor. */
  href: (s: Service) => string;
  /** Desktop: reveal the two most common signs when a tile is hovered or focused. */
  revealSigns?: boolean;
};

/**
 * Showcase of the four services as large photo tiles. Desktop: a 2×2 bento with alternating
 * widths. Phones: a swipeable row of tall tiles (scroll-snap), so photos stay big.
 */
export function ServiceBento({ href, revealSigns = false }: Props) {
  return (
    <ul
      className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-12 lg:gap-5"
      aria-label="Services"
    >
      {services.map((s, i) => {
        const to = href(s);
        const inPage = to.startsWith("#");
        const content = (
          <>
            <Img
              name={s.image}
              alt=""
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 85vw"
              className="absolute inset-0 -z-20 h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-out-quart)] group-hover:scale-[1.05]"
            />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/0" />
            <span
              aria-hidden="true"
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition-all duration-500 ease-[var(--ease-out-quart)] group-hover:rotate-45 group-hover:bg-signal sm:top-6 sm:right-6"
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
            <span className="block max-w-md">
              <span className="block font-display text-[1.6rem] leading-[1.05] font-semibold [font-variation-settings:'SOFT'_100] sm:text-[1.9rem] lg:text-[2.2rem]">
                {s.title}
              </span>
              <span className="mt-2 block text-[0.95rem] leading-snug text-white/85 sm:text-base">{s.summary}</span>
              {revealSigns && (
                <span className="hidden lg:grid lg:grid-rows-[0fr] lg:transition-[grid-template-rows] lg:duration-500 lg:ease-[var(--ease-out-quart)] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
                  <span className="overflow-hidden">
                    <span className="mt-4 block border-t border-white/15 pt-3 text-sm text-white/75">
                      <span className="block font-semibold text-white">Common signs</span>
                      {s.whenToEnquire.slice(0, 2).map((sign) => (
                        <span key={sign} className="mt-1.5 flex gap-2">
                          <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                          {sign}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              )}
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                <span className="border-b-2 border-signal/40 pb-0.5 transition-colors group-hover:border-signal">
                  {inPage ? "See details" : "Explore this service"}
                </span>
              </span>
            </span>
          </>
        );
        const cardClass =
          "group relative isolate flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink p-6 text-white shadow-[0_30px_60px_-40px_rgb(43_58_78/0.6)] ring-1 ring-white/10 sm:min-h-[24rem] sm:p-8 lg:min-h-[26rem] lg:rounded-[2rem]";

        return (
          <motion.li
            key={s.id}
            className={`w-[85%] shrink-0 snap-start sm:w-auto ${spans[i]}`}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE, delay: (i % 2) * 0.12 }}
          >
            {inPage ? (
              <a href={to} className={cardClass}>
                {content}
              </a>
            ) : (
              <Link to={to} className={cardClass}>
                {content}
              </Link>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
