import type { ImageKey } from "../components/Img";

export type Service = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  image: ImageKey;
  imageAlt: string;
  detailImage: ImageKey;
  detailImageAlt: string;
  /** Third (decorative) photo for the fanned image stack. */
  extraImage: ImageKey;
  /** General explanation of the service category — not a list of guaranteed capabilities. */
  about: string[];
  /** Common, general situations in which people enquire about this kind of service. */
  whenToEnquire: string[];
};

export const services: Service[] = [
  {
    id: "leak-detection",
    number: "01",
    title: "Water Leak Detection",
    shortTitle: "Leak Detection",
    summary:
      "Help locating where water may be escaping from your plumbing, so the problem can be understood before it spreads.",
    image: "leaking-valve",
    imageAlt: "Water spraying from a worn brass valve on an old pipe",
    detailImage: "dripping-tap",
    detailImageAlt: "A drop forming at the spout of a chrome tap",
    extraImage: "outdoor-tap",
    about: [
      "Water leak detection is the process of finding where water is escaping from a plumbing system. Some leaks are obvious; others are hidden behind walls, under floors or along supply lines where they can go unnoticed for some time.",
      "Pinpointing the source is usually the first step before deciding what kind of repair is appropriate.",
    ],
    whenToEnquire: [
      "A water bill that is higher than usual",
      "Damp patches, stains or bubbling paint on walls or ceilings",
      "The sound of running water when all taps are closed",
      "A water meter that keeps moving when nothing is in use",
    ],
  },
  {
    id: "geyser-services",
    number: "02",
    title: "Geyser Services",
    shortTitle: "Geysers",
    summary:
      "Geyser-related plumbing services for homes and businesses — get in touch to discuss what your geyser needs.",
    image: "geyser-cupboard",
    imageAlt: "An electric geyser and its pipework installed inside a cupboard",
    detailImage: "geyser-wrench",
    detailImageAlt: "A wrench tightening a fitting on top of a geyser",
    extraImage: "solar-geyser",
    about: [
      "A geyser heats and stores the hot water used throughout a property. Because it is connected to both the water supply and the plumbing that feeds every hot tap, geyser issues can affect the whole household or workplace.",
      "Geyser services cover plumbing work related to these hot-water systems. Contact Cummings Plumbing CC to discuss your specific geyser and confirm what can be arranged.",
    ],
    whenToEnquire: [
      "No hot water, or water that does not get as hot as before",
      "Water dripping from the geyser, overflow pipe or ceiling below",
      "Unusual noises coming from the geyser",
      "Planning a new or replacement geyser",
    ],
  },
  {
    id: "repairs-replacements",
    number: "03",
    title: "Plumbing Repairs & Replacements",
    shortTitle: "Repairs & Replacements",
    summary:
      "Repairs to plumbing that is not working as it should, and replacement of fittings or components that have reached the end of their life.",
    image: "wrench-under-basin",
    imageAlt: "Hands tightening a pipe fitting beneath a basin with a wrench",
    detailImage: "brass-fitting",
    detailImageAlt: "A hand fitting a brass connector onto a supply pipe",
    extraImage: "tool-belt",
    about: [
      "Plumbing repairs deal with parts of a system that are damaged, blocked, worn or leaking. In some cases a repair is enough; in others, replacing a fitting, pipe section or fixture is the more sensible option.",
      "Describing the issue clearly — what is happening, where, and since when — helps when discussing the right approach with the business.",
    ],
    whenToEnquire: [
      "Dripping taps or running toilets",
      "Low water pressure at one or more outlets",
      "Damaged, corroded or ageing pipes and fittings",
      "Fixtures that need to be replaced",
    ],
  },
  {
    id: "installations",
    number: "04",
    title: "Plumbing Installations",
    shortTitle: "Installations",
    summary:
      "Installation of plumbing for new fixtures, renovations and changes to how water is supplied or drained in a space.",
    image: "kitchen-renovation",
    imageAlt: "A kitchen mid-renovation with cabinets covered in protective plastic",
    detailImage: "wall-rough-in",
    detailImageAlt: "New water supply pipes inside an open timber-framed wall",
    extraImage: "kitchen-sink",
    about: [
      "Plumbing installations cover new pipework, fixtures and fittings — for example when a kitchen or bathroom is renovated, when fixtures are added, or when the layout of a space changes.",
      "Planning ahead with your plumber helps make sure supply and drainage suit the new layout. Get in touch to discuss your project and confirm availability.",
    ],
    whenToEnquire: [
      "Kitchen or bathroom renovations",
      "Adding or relocating basins, sinks, showers or toilets",
      "New building work or extensions",
      "Replacing an existing setup with a new layout",
    ],
  },
];
