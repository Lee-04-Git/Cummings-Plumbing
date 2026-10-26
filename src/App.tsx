import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MobileActionBar } from "./components/MobileActionBar";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { EASE } from "./components/motion";
import { scrollToTarget, startSmoothScroll } from "./lib/smoothScroll";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";

let isFirstRender = true;

/** Scrolls to the hash target (or top) when a page mounts or the hash changes. */
function ScrollManager({ children }: { children: ReactNode }) {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const first = isFirstRender;
    isFirstRender = false;

    if (hash) {
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) scrollToTarget(target, !first);
      });
      return () => cancelAnimationFrame(frame);
    }
    // The previous page has already faded out, so jumping to the top here is invisible.
    if (!first) scrollToTarget(0, false);
  }, [hash, pathname]);

  return <>{children}</>;
}

export function AppRoutes() {
  const location = useLocation();

  useEffect(() => startSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-signal px-5 py-3 font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.32, ease: [0.4, 0, 1, 1] } }}
        >
          <ScrollManager>
            <main id="main" tabIndex={-1} className="outline-none">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </ScrollManager>
        </motion.div>
      </AnimatePresence>
      <MobileActionBar />
      <WhatsAppButton />
    </MotionConfig>
  );
}
