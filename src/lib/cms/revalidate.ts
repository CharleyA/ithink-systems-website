import { revalidatePath } from "next/cache";

export function revalidateContent() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/products");
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");
}
