export function getShortWeekday(date: Date): string {
  return date.toLocaleDateString(navigator.language, { weekday: 'short' });
}

export function getDescriptiveWeekday(date: Date): string {
  return date.toLocaleDateString(navigator.language, { weekday: 'long', day: 'numeric', month: 'long' });
}

export function getLongMonth(date: Date): string {
  return date.toLocaleDateString(navigator.language, { month: 'long' });
}

export function getHumanReadableDate(date: Date): string {
  return date.toLocaleDateString(navigator.language, {  year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
}

export function isSameDay(lhs: Date, rhs: Date): boolean {
  return lhs.getFullYear() == rhs.getFullYear() &&
  lhs.getMonth() == rhs.getMonth() &&
  lhs.getDate() == rhs.getDate();
}

export function isDayInRange(day: Date, from: Date, to: Date): boolean {
  return (from <= day && to >= day) ||
    isSameDay(day, from) ||
    isSameDay(day, to);  // TODO: Will miss in edge cases.
}

export function getTextRelative(today: Date, other: Date): string {
  if (isSameDay(today, other)) {
    const hours = other.getHours().toString().padStart(2, '0');
    const minutes = other.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  else {
    return other.toLocaleDateString(navigator.language);
  }
}
