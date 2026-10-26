import { motion } from "motion/react";
import { EASE, Reveal, SectionLabel } from "../../components/motion";
import { site } from "../../config/site";
import { FaintImage } from "../../components/FaintImage";

const steps = [
  { title: "Get in touch", body: `Contact ${site.name} and explain your plumbing issue.` },
  { title: "Discuss your requirements", body: "Provide details about the service you need and confirm availability." },
  { title: "Arrange the next step", body: "Discuss the appropriate next steps directly with the business." },
];

/** Hand-drawn connector between steps. */
function Squiggle() {
  return (
    <svg aria-hidden="true" viewBox="0 0 90 30" className="absolute top-6 -right-12 hidden h-8 w-20 text-tide-deep/60 lg:block">
      <motion.path
        d="M3 18 C 20 4, 40 28, 58 14 S 80 8, 86 14 M86 14 L 78 9 M86 14 L 80 21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
      />
    </svg>
  );
}

export function Process() {
  return (
    <section className="relative isolate overflow-hidden bg-cloud py-24 sm:py-28" aria-labelledby="process-title">
      <FaintImage name="water-ripples" fade="left" opacity={0.3} position="50% 50%" />
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <SectionLabel>How it works</SectionLabel>
          <h2 id="process-title" className="display-lg mt-4">
            How to get assistance.
          </h2>
          <p className="mt-4 max-w-sm text-muted">Three steps, handled directly with the business.</p>
        </Reveal>

        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:col-span-8 lg:gap-14">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
            >
              <span aria-hidden="true" className="hand block text-[4rem] leading-none text-tide-deep">
                {i + 1}
              </span>
              {i < steps.length - 1 && <Squiggle />}
              <h3 className="mt-3 font-display text-[1.35rem] leading-tight font-semibold [font-variation-settings:'SOFT'_100]">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-muted">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
