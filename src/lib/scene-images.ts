/** Alt text for the photographed scenes shipped with the site. */
export const sceneAlt: Record<string, string> = {
  "/images/hero.jpg":
    "Four colleagues gather around a laptop at a wooden table in a bright office.",
  "/images/products/school-books.jpg":
    "A woman in a headwrap works through charts on a laptop while pupils in green uniforms pass the classroom window.",
  "/images/products/ithink-medicare.jpg":
    "A nurse and a doctor review clinic charts on a desktop monitor while a patient waits behind them.",
  "/images/products/erpnext-implementation.jpg":
    "Two colleagues look at sales charts on a monitor, with warehouse shelves of boxes behind them.",
  "/images/products/digital-learning-moodle.jpg":
    "A teacher stands among students in white shirts as they work on laptops in a classroom.",
  "/images/products/booking-system-lodges.jpg":
    "A receptionist works at a lodge computer while two guests wait at the counter, with savanna beyond the thatch roof.",
  "/images/products/inventory-workflow.jpg":
    "A warehouse worker in a high-visibility vest scans a shelf label while holding a tablet.",
  "/images/products/website-design.jpg":
    "A designer in an orange cardigan reviews colourful page layouts on two monitors.",
  "/images/products/3d-home-walkthroughs.jpg":
    "Three people look at a large screen showing a modern house interior and garden.",
  "/images/products/hosting-support.jpg":
    "A technician kneels at an open server rack and connects blue network cables.",
  "/images/products/whatsapp-integration.jpg":
    "A woman in a red patterned dress smiles at a phone in an outdoor market hung with colourful cloth.",
  "/images/sectors/councils.jpg":
    "A council officer smiles at her screen while a colleague stands beside her and a resident waits at the desk.",
};

export function altForScene(src: string | null | undefined, fallback: string) {
  if (src && sceneAlt[src]) return sceneAlt[src];
  return fallback;
}
