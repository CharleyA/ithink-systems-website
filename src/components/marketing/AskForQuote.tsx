import { phoneDisplay, phoneTel, whatsappQuoteUrl } from "@/lib/site-contact";

export function AskForQuote({ prominent = false, onDark = false }: { prominent?: boolean; onDark?: boolean }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <a
        href={whatsappQuoteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={
          prominent
            ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#EC5A24] px-5 py-3 text-sm font-semibold text-white"
            : "inline-flex min-h-11 items-center text-sm font-semibold text-[#EC5A24]"
        }
      >
        Ask for a quote
      </a>
      <a href={`tel:${phoneTel}`} className={onDark ? "text-sm font-semibold text-white" : "text-sm font-semibold text-[#1A1A1A]"}>
        {phoneDisplay}
      </a>
    </div>
  );
}
