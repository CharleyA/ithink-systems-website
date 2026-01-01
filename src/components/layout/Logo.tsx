import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-12 w-32">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/i-Think-Systems-logo-1767104280249.png?width=800&height=800&resize=contain"
          alt="iThink Systems"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
