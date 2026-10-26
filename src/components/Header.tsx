import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { nav, site } from "../config/site";
import { useFocusTrap, useScrollLock } from "../hooks/useFocusTrap";
import { Logo } from "./Logo";
import { EASE } from "./motion";

/** Character-roll hover (adapted from 21st.dev's NavLinkHover). Pure CSS, disabled under reduced motion. */
function RollText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative inline-block overflow-hidden align-top leading-[1.25]">
        {[...text].map((char, i) => (
          <span
            key={i}
            className="inline-block whitespace-pre transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:-translate-y-[1.25em] group-focus-visible:-translate-y-[1.25em] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
            style={{ textShadow: "0 1.25em currentColor", transitionDelay: `${i * 0.018}s` }}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const trapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Close the menu when the route changes (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  // Lets floating UI (WhatsApp, mobile action bar) hide itself while the menu is open.
  useEffect(() => {
    if (open) document.body.dataset.menu = "open";
    else delete document.body.dataset.menu;
  }, [open]);
  // Sticky sub-navigation (e.g. service tabs) docks under the header, or to the top when it hides.
  useEffect(() => {
    document.body.dataset.header = hidden && !open ? "hidden" : "shown";
  }, [hidden, open]);
  useScrollLock(open);
  useFocusTrap({ active: open, containerRef: trapRef, initialFocusRef: toggleRef, onEscape: () => setOpen(false) });

  // Every page opens on a dark photo hero, so the header starts with light text.
  // The mobile menu is a light sheet, so the header switches to dark text while it's open.
  const overDark = !scrolled && !open;
  const lightText = overDark;

  return (
    <div ref={trapRef}>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
          open
            ? "bg-paper"
            : scrolled
              ? "bg-paper/90 shadow-[0_1px_0_rgb(43_58_78/0.08)] backdrop-blur-lg"
              : "bg-transparent"
        } ${lightText ? "text-paper" : "text-ink"}`}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div
          className={`shell flex items-center justify-between gap-6 transition-[height] duration-500 ${
            scrolled ? "h-[4.5rem]" : "h-20 lg:h-24"
          }`}
        >
          <Link to="/" aria-label="Cummings Plumbing CC — home" className="relative z-10 -m-1 p-1">
            <Logo tone={lightText ? "light" : "dark"} alt="" className="h-10 sm:h-12" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className="group relative flex min-h-11 items-center px-4 text-[0.95rem] font-semibold tracking-[-0.01em]"
                  >
                    {({ isActive }) => (
                      <>
                        <span className={isActive ? "" : "opacity-75 transition-opacity group-hover:opacity-100"}>
                          <RollText text={item.label} />
                        </span>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-4 bottom-1.5 h-[2px] rounded-full bg-signal"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <motion.a
              href={site.phone.mobile.href}
              whileTap={{ scale: 0.97 }}
              className="hidden min-h-11 items-center gap-2 rounded-full bg-signal px-5 text-[0.92rem] font-bold text-ink transition-colors hover:bg-signal-light sm:inline-flex"
            >
              <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
              <span>
                <span className="sr-only">Call </span>
                {site.phone.mobile.display}
              </span>
            </motion.a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`relative z-10 -mr-1 inline-flex h-11 items-center gap-2.5 rounded-full px-4 text-sm font-semibold transition-colors duration-300 lg:hidden ${
                open
                  ? "bg-ink text-paper"
                  : overDark
                    ? "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md"
                    : "bg-cloud text-ink ring-1 ring-ink/10"
              }`}
            >
              <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
              {/* Three-line icon that folds into an X */}
              <span className="relative block h-3.5 w-5" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute left-0 h-[2px] w-full rounded-full bg-current"
                    style={{ top: i * 6 }}
                    animate={
                      open
                        ? i === 1
                          ? { opacity: 0, scaleX: 0.2 }
                          : { y: i === 0 ? 6 : -6, rotate: i === 0 ? 45 : -45 }
                        : { y: 0, rotate: 0, opacity: 1, scaleX: 1 }
                    }
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} pathname={pathname} />
    </div>
  );
}

function MobileMenu({ open, pathname }: { open: boolean; pathname: string }) {
  const item = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay: 0.12 + i * 0.05 },
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-paper text-ink lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] } }}
          transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          data-lenis-prevent
        >
          <div className="shell flex min-h-full flex-col pt-24 pb-8">
            <motion.p {...item(0)} className="label flex items-center gap-2.5 text-tide-deep">
              <span aria-hidden="true" className="h-[3px] w-5 rounded-full bg-current" />
              Plumbing in {site.location.area}, Cape Town
            </motion.p>

            <nav aria-label="Mobile" className="mt-4">
              <ul className="border-t border-ink/10">
                {nav.map((link, i) => {
                  const active = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
                  return (
                    <motion.li key={link.to} {...item(i + 1)} className="border-b border-ink/10">
                      <Link
                        to={link.to}
                        aria-current={active ? "page" : undefined}
                        className="group flex min-h-[4.25rem] items-center justify-between gap-4"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className={`h-2 w-2 rounded-full transition-colors ${active ? "bg-signal" : "bg-transparent"}`}
                          />
                          <span
                            className={`font-display text-[2rem] leading-none font-semibold [font-variation-settings:'SOFT'_100] ${
                              active ? "text-ink" : "text-ink/75"
                            }`}
                          >
                            {link.label}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                            active ? "bg-signal text-ink" : "bg-cloud text-tide-deep group-active:bg-stone"
                          }`}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div {...item(nav.length + 1)} className="mt-auto pt-10">
              <a
                href={site.phone.mobile.href}
                className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-signal text-base font-bold text-ink"
              >
                <Phone aria-hidden="true" className="h-5 w-5" />
                Call {site.phone.mobile.display}
              </a>
              {site.whatsapp.enabled && (
                <a
                  href={`https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-base font-bold text-ink"
                >
                  <MessageCircle aria-hidden="true" className="h-5 w-5" />
                  Chat on WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              <div className="mt-6 grid gap-3 rounded-2xl bg-cloud p-5 text-[0.95rem]">
                <a href={site.phone.landline.href} className="flex items-center gap-3">
                  <Phone aria-hidden="true" className="h-4 w-4 text-tide-deep" />
                  Landline {site.phone.landline.display}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all">
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-tide-deep" />
                  {site.email}
                </a>
                <p className="flex items-center gap-3 text-muted">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-tide-deep" />
                  {site.location.area}, {site.location.city}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
