import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { MessageSquareText, Phone } from "lucide-react";
import { site } from "../config/site";
import { EASE } from "./motion";

/**
 * Mobile-only quick actions (Call / Enquire). Slides up once the visitor scrolls past the hero,
 * sitting to the left of the floating WhatsApp button. Hidden on the contact page.
 */
export function MobileActionBar() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 480));

  const visible = show && pathname !== "/contact";

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Quick contact"
          className="fixed in-data-[menu=open]:hidden bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+0.25rem)] left-4 z-40 flex rounded-full bg-ink p-1.5 shadow-[0_18px_40px_-14px_rgb(43_58_78/0.7)] ring-1 ring-white/10 sm:hidden"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <a href={site.phone.mobile.href} className="flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold text-paper">
            <Phone aria-hidden="true" className="h-4 w-4" />
            Call
          </a>
          <Link to="/contact" className="flex min-h-11 items-center gap-2 rounded-full bg-signal px-5 text-sm font-bold text-ink">
            <MessageSquareText aria-hidden="true" className="h-4 w-4" />
            Enquire
          </Link>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
