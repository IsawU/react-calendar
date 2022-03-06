export function getShortWeekday(date: Date): string {
  return date.toLocaleDateString(navigator.language, { weekday: 'short' });
}

export function getLongMonth(date: Date): string {
  return date.toLocaleDateString(navigator.language, { month: 'long' });
}

export function getHumanReadableDate(date: Date): string {
  return date.toLocaleDateString(navigator.language, {  year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
}
