export function getShortWeekday(date: Date): string {
  return date.toLocaleDateString(navigator.language, { weekday: 'short' });
}

export function getDescriptiveWeekday(date: Date): string {
  return date.toLocaleDateString(navigator.language, { weekday: 'long', day: 'numeric', month: 'long' });
}

export function getLongMonth(date: Date): string {
  return date.toLocaleDateString(navigator.language, { month: 'long' });
}

export function getKeyable(date: Date): string {
  return date.toLocaleDateString(navigator.language);
}

export function getLongYear(date: Date): string {
  return date.toLocaleDateString(navigator.language, { year: 'numeric' });
}

export function getInputDatetimelocalDate(date: Date): string {
  const adjusted_date = new Date(date.getTime())
  adjusted_date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return adjusted_date.toISOString().slice(0,16);
}

export function isSameDay(lhs: Date, rhs: Date): boolean {
  return lhs.getFullYear() == rhs.getFullYear() &&
  lhs.getMonth() == rhs.getMonth() &&
  lhs.getDate() == rhs.getDate();
}

export function isDayInRange(day: Date, from: Date, to: Date): boolean {
  return (from <= day && to >= day) ||
    isSameDay(day, from) ||
    isSameDay(day, to);
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

export function sortCompare(lhs: Date, rhs: Date) {
  if (lhs < rhs) {
    return -1;
  }
  else if (lhs > rhs) {
    return 1;
  }
  else {
    return 0;
  }
}
