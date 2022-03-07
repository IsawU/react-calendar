let uid = 0;  // TODO: Crypto.randomUUID() is too recent, use https://github.com/streamich/v4-uuid.

export type Event = {   // TODO: Possibly rename this type to avoid collision.
  uuid: number;
  name: string,
  from: Date,
  to: Date,
  color?: string,
};

export function newEvent(name: string, from: Date, to: Date, color: string | undefined): Event {
  uid += 1;
  return {
    uuid: uid,
    name: name,
    from: from,
    to: to,
    color: color,
  };
}

export function getDefaultEventColor(): string {
  return '#add8e6';
}

export function getTextColor(backgroundColor: string): string {
  // TODO: There's a lot of room to improve here. This is very basic.
  if (backgroundColor.startsWith('#')) {
    const rs = backgroundColor.substring(1, 3);
    const gs = backgroundColor.substring(3, 5);
    const bs = backgroundColor.substring(5, 7);

    if (rs.length == 2 && gs.length == 2 && bs.length == 2) {
      const r = parseInt(rs, 16);
      const g = parseInt(rs, 16);
      const b = parseInt(rs, 16);
      // https://www.w3.org/TR/AERT/#color-contrast
      const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      if (isFinite(brightness)) {
        return brightness > 125 ? 'black' : 'white';
      }
    }
  }
  return 'black';
}
