import Link from "next/link";

export function AskForQuote({ prominent = false }: { prominent?: boolean; onDark?: boolean }) {
  return (
    <Link
      href="/contact"
      className={
        prominent
          ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#EC5A24] px-5 py-3 text-sm font-semibold text-white"
          : "inline-flex min-h-11 items-center text-sm font-semibold text-[#EC5A24]"
      }
    >
      Ask for a quote
    </Link>
  );
}
