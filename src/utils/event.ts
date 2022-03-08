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

function hexColorToRGB(hex: string): {r: number, g: number, b: number} {
  if (hex.startsWith('#')) {
    if (hex.length == 4) {
      const rs = hex.substring(1, 2);
      const gs = hex.substring(2, 3);
      const bs = hex.substring(3, 4);

      const r = parseInt(rs, 16) * 0x11;
      const g = parseInt(gs, 16) * 0x11;
      const b = parseInt(bs, 16) * 0x11;
      return { r: r, g: g, b: b };
    }
    else if (hex.length == 7) {
      const rs = hex.substring(1, 3);
      const gs = hex.substring(3, 5);
      const bs = hex.substring(5, 7);

      const r = parseInt(rs, 16);
      const g = parseInt(gs, 16);
      const b = parseInt(bs, 16);
      return { r: r, g: g, b: b };
    }
  }
  return { r: 173, g: 216, b: 230 };
}

export function getTextColor(backgroundColor: string): string {
  // TODO: There's a lot of room to improve here. This is very basic.
  const color = hexColorToRGB(backgroundColor);
  // https://www.w3.org/TR/AERT/#color-contrast
  const brightness = ((color.r * 299) + (color.g * 587) + (color.b * 114)) / 1000;
  if (isFinite(brightness)) {
    return brightness > 125 ? 'black' : 'white';
  }
  return 'black';
}
