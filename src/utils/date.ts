export function getShortWeekday(date: Date): string {
  return date.toLocaleDateString(navigator.language, { weekday: 'short' });
}

export function getHumanReadableDate(date: Date): string {
  return date.toLocaleDateString(navigator.language, {  year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
}
