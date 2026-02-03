/**
 * Conversões de cores e geração de harmonias
 * Implementação do zero sem bibliotecas externas
 */

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Converte HEX para RGB
 */
export function hexToRgb(hex: string): RGB {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * Converte RGB para HEX
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converte RGB para HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converte HSL para RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Converte HEX para HSL
 */
export function hexToHsl(hex: string): HSL {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * Converte HSL para HEX
 */
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Normaliza ângulo do hue (0-360)
 */
function normalizeHue(hue: number): number {
  let normalized = hue % 360;
  if (normalized < 0) normalized += 360;
  return normalized;
}

/**
 * Gera cores complementares (opostas no círculo cromático)
 */
export function getComplementary(h: number): number[] {
  return [h, normalizeHue(h + 180)];
}

/**
 * Gera cores análogas (adjacentes no círculo cromático)
 */
export function getAnalogous(h: number): number[] {
  return [normalizeHue(h - 30), h, normalizeHue(h + 30)];
}

/**
 * Gera tríade (3 cores equidistantes)
 */
export function getTriadic(h: number): number[] {
  return [h, normalizeHue(h + 120), normalizeHue(h + 240)];
}

/**
 * Gera split-complementar (complementar + adjacentes)
 */
export function getSplitComplementary(h: number): number[] {
  return [h, normalizeHue(h + 150), normalizeHue(h + 210)];
}

/**
 * Gera tetrádica (4 cores equidistantes)
 */
export function getTetradic(h: number): number[] {
  return [
    h,
    normalizeHue(h + 90),
    normalizeHue(h + 180),
    normalizeHue(h + 270),
  ];
}

/**
 * Gera 11 shades variando a luminosidade (lightness)
 * 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
 */
export function generateShades(hex: string): Record<string, string> {
  const hsl = hexToHsl(hex);
  const { h, s } = hsl;

  // Mapeamento de shades para luminosidade
  const shadesMap: Record<string, number> = {
    '50': 95,
    '100': 90,
    '200': 80,
    '300': 70,
    '400': 60,
    '500': 50,
    '600': 40,
    '700': 30,
    '800': 20,
    '900': 10,
    '950': 5,
  };

  const shades: Record<string, string> = {};

  Object.entries(shadesMap).forEach(([shade, lightness]) => {
    shades[shade] = hslToHex(h, s, lightness);
  });

  return shades;
}

/**
 * Gera cor aleatória
 */
export function getRandomColor(): string {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 60; // 60-100%
  const l = Math.floor(Math.random() * 30) + 40; // 40-70%
  return hslToHex(h, s, l);
}

/**
 * Valida se uma string é um HEX válido
 */
export function isValidHex(hex: string): boolean {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

/**
 * Normaliza HEX (adiciona # e converte para uppercase)
 */
export function normalizeHex(hex: string): string {
  let cleaned = hex.trim();
  if (!cleaned.startsWith('#')) {
    cleaned = '#' + cleaned;
  }
  // Expande formato curto (#ABC -> #AABBCC)
  if (cleaned.length === 4) {
    cleaned = '#' + cleaned[1] + cleaned[1] + cleaned[2] + cleaned[2] + cleaned[3] + cleaned[3];
  }
  return cleaned.toUpperCase();
}

/**
 * Calcula contraste relativo entre duas cores (WCAG)
 */
export function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Verifica se o texto deve ser claro ou escuro baseado no fundo
 */
export function shouldUseLightText(backgroundColor: string): boolean {
  const luminance = getRelativeLuminance(backgroundColor);
  return luminance < 0.5;
}
