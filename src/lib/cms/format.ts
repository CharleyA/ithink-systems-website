const HARARE = "Africa/Harare";

export function formatHarare(date: Date | null | undefined) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-ZW", {
    dateStyle: "long",
    timeZone: HARARE,
  }).format(date);
}

export function toHarareInput(date: Date | null | undefined) {
  if (!date) return "";
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: HARARE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

/** Admin datetime-local values are Africa/Harare (UTC+2, no daylight saving). ISO strings pass through. */
export function fromHarareInput(value: string | null | undefined): Date | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmed) ? `${trimmed}:00+02:00` : trimmed;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    throw new Error("publishedAt is not a valid date");
  }
  return date;
}

