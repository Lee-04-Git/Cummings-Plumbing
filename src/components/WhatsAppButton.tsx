import { motion } from "motion/react";
import { site } from "../config/site";
import { EASE } from "./motion";

/**
 * Floating circular WhatsApp shortcut, fixed bottom-right on every page.
 * Rendered outside the page transition so it never animates away between routes.
 * Toggle site-wide with `site.whatsapp.enabled`.
 */
export function WhatsAppButton() {
  const { enabled, number, message } = site.whatsapp;
  if (!enabled) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      className="fixed in-data-[menu=open]:hidden right-4 bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+0.25rem)] z-40 sm:right-6 sm:bottom-6"
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Cummings Plumbing CC on WhatsApp (opens in a new tab)"
        className="group relative flex items-center"
      >
        {/* Label slides out on hover / focus (desktop) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[calc(100%+0.75rem)] hidden translate-x-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold whitespace-nowrap text-paper opacity-0 shadow-[0_12px_32px_-10px_rgb(43_58_78/0.5)] transition-all duration-400 ease-[var(--ease-out-quart)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block"
        >
          Chat on WhatsApp
        </span>

        <span className="relative flex h-14 w-14 items-center justify-center sm:h-[3.75rem] sm:w-[3.75rem]">
          {/* Soft pulse ring */}
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-wa-pulse rounded-full bg-[#25D366]/40 motion-reduce:hidden"
          />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-10px_rgb(43_58_78/0.55),inset_0_-2px_0_rgb(0_0_0/0.12)] ring-1 ring-black/5 transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.07] group-active:scale-95">
            <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-[1.9rem] sm:w-[1.9rem]" aria-hidden="true" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29Z" />
            </svg>
          </span>
        </span>
      </a>
    </motion.div>
  );
}
