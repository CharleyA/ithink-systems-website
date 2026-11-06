import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-12 w-32">
        <Image
          src="/images/logo.png?width=800&height=800&resize=contain"
          alt="iThink Systems"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
