/** Alt text for the photographed scenes shipped with the site. */
export const sceneAlt: Record<string, string> = {
  "/images/hero.jpg":
    "Four colleagues in a bright office smile around a laptop and a desktop monitor.",
  "/images/products/school-books.jpg":
    "A woman reviews charts on a laptop in a school office while pupils in green uniforms pass the window.",
  "/images/products/ithink-medicare.jpg":
    "A nurse in blue scrubs and a doctor with a stethoscope look at a tablet at a clinic reception desk.",
  "/images/products/erpnext-implementation.jpg":
    "Two colleagues review dashboards on twin monitors, with stocked warehouse shelves behind them.",
  "/images/products/digital-learning-moodle.jpg":
    "A teacher leans in to help a student on a laptop while classmates work on tablets in a classroom.",
  "/images/products/booking-system-lodges.jpg":
    "A lodge receptionist greets two guests at a wooden desk with a computer, thatch roof overhead.",
  "/images/products/inventory-workflow.jpg":
    "A warehouse worker in a high-visibility vest scans a shelf label while holding a tablet.",
  "/images/products/website-design.jpg":
    "A designer in an orange cardigan reviews colourful page layouts on two monitors.",
  "/images/products/3d-home-walkthroughs.jpg":
    "Three people look at a large screen showing a modern house interior and garden.",
  "/images/products/hosting-support.jpg":
    "A technician kneels at an open server rack and connects blue network cables.",
  "/images/products/whatsapp-integration.jpg":
    "A shopkeeper in a patterned dress smiles at a phone showing a chat, with clothes hanging behind her.",
  "/images/sectors/councils.jpg":
    "A council officer at a reception desk speaks with a resident while a colleague stands beside her.",
};

export function altForScene(src: string | null | undefined, fallback: string) {
  if (src && sceneAlt[src]) return sceneAlt[src];
  return fallback;
}
