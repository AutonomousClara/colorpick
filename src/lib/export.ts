/**
 * Funções para exportação de paletas em múltiplos formatos
 */

export interface PaletteColor {
  name: string;
  shades: Record<string, string>;
}

export interface Palette {
  colors: PaletteColor[];
}

/**
 * Exporta como CSS Variables
 */
export function exportToCSSVariables(palette: Palette): string {
  const lines: string[] = [':root {'];

  palette.colors.forEach((color) => {
    Object.entries(color.shades).forEach(([shade, hex]) => {
      lines.push(`  --${color.name}-${shade}: ${hex};`);
    });
  });

  lines.push('}');
  return lines.join('\n');
}

/**
 * Exporta como Tailwind Config
 */
export function exportToTailwind(palette: Palette): string {
  const lines: string[] = ['colors: {'];

  palette.colors.forEach((color, index) => {
    const isLast = index === palette.colors.length - 1;
    lines.push(`  '${color.name}': {`);

    const shadeEntries = Object.entries(color.shades);
    shadeEntries.forEach(([shade, hex], shadeIndex) => {
      const isLastShade = shadeIndex === shadeEntries.length - 1;
      lines.push(`    '${shade}': '${hex}'${isLastShade ? '' : ','}`);
    });

    lines.push(`  }${isLast ? '' : ','}`);
  });

  lines.push('}');
  return lines.join('\n');
}

/**
 * Exporta como JSON
 */
export function exportToJSON(palette: Palette): string {
  const data: Record<string, Record<string, string>> = {};

  palette.colors.forEach((color) => {
    data[color.name] = color.shades;
  });

  return JSON.stringify(data, null, 2);
}

/**
 * Exporta como SCSS Variables
 */
export function exportToSCSS(palette: Palette): string {
  const lines: string[] = [];

  palette.colors.forEach((color) => {
    Object.entries(color.shades).forEach(([shade, hex]) => {
      lines.push(`$${color.name}-${shade}: ${hex};`);
    });
  });

  return lines.join('\n');
}

/**
 * Copia texto para clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para navegadores antigos
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}
