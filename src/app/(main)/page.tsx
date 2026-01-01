import { getSiteVariant } from "@/lib/site-variant";
import DemoHub from "@/components/DemoHub";
import { ProductsHub } from "@/components/ProductsHub";
import { CorporateHome } from "@/components/CorporateHome";

export default async function Page() {
  const variant = await getSiteVariant();

  if (variant === "demo") {
    return <DemoHub />;
  }

  if (variant === "products") {
    return <ProductsHub />;
  }

  return <CorporateHome />;
}
