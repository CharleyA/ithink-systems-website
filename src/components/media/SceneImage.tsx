import Image from "next/image";
import { altForScene } from "@/lib/scene-images";

export function SceneImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const remote = src.startsWith("http://") || src.startsWith("https://");
  return (
    <Image
      src={src}
      alt={alt ?? altForScene(src, "")}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={remote}
      className={`object-cover ${className}`}
    />
  );
}
