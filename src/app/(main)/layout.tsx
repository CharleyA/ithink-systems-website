import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteVariant } from "@/lib/site-variant";
import { DemoBanner } from "@/components/layout/DemoBanner";

export default async function MainSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const variant = await getSiteVariant();

  return (
    <>
      {variant === "demo" && <DemoBanner />}
      <Navbar variant={variant} />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </>
  );
}
