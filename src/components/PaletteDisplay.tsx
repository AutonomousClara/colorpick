'use client';

import ShadeRow from './ShadeRow';
import { generateShades, hexToHsl, hslToHex } from '@/lib/colors';
import type { HarmonyType } from './HarmonySelector';
import {
  getComplementary,
  getAnalogous,
  getTriadic,
  getSplitComplementary,
  getTetradic,
} from '@/lib/colors';

interface PaletteDisplayProps {
  baseColor: string;
  harmony: HarmonyType;
}

export default function PaletteDisplay({ baseColor, harmony }: PaletteDisplayProps) {
  const hsl = hexToHsl(baseColor);
  const { h, s, l } = hsl;

  // Gera os hues baseado na harmonia selecionada
  let hues: number[] = [];
  switch (harmony) {
    case 'complementary':
      hues = getComplementary(h);
      break;
    case 'analogous':
      hues = getAnalogous(h);
      break;
    case 'triadic':
      hues = getTriadic(h);
      break;
    case 'split':
      hues = getSplitComplementary(h);
      break;
    case 'tetradic':
      hues = getTetradic(h);
      break;
  }

  // Gera as cores da harmonia mantendo saturação e luminosidade
  const harmonyColors = hues.map((hue) => hslToHex(hue, s, l));

  // Gera shades para cada cor
  const paletteData = harmonyColors.map((color, index) => ({
    name: `color-${index + 1}`,
    hex: color,
    shades: generateShades(color),
  }));

  return (
    <div className="bg-[#13131A] border border-[#1F1F2E] rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Paleta de Cores</h3>
        <p className="text-sm text-gray-400">
          {harmonyColors.length} {harmonyColors.length === 1 ? 'cor' : 'cores'} com 11 shades cada
        </p>
      </div>

      <div className="space-y-6">
        {paletteData.map((colorData, index) => (
          <ShadeRow key={index} colorName={colorData.name} shades={colorData.shades} />
        ))}
      </div>
    </div>
  );
}
