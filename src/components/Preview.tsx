'use client';

import { generateShades, hexToHsl, hslToHex, shouldUseLightText } from '@/lib/colors';
import type { HarmonyType } from './HarmonySelector';
import {
  getComplementary,
  getAnalogous,
  getTriadic,
  getSplitComplementary,
  getTetradic,
} from '@/lib/colors';

interface PreviewProps {
  baseColor: string;
  harmony: HarmonyType;
}

export default function Preview({ baseColor, harmony }: PreviewProps) {
  const hsl = hexToHsl(baseColor);
  const { h, s, l } = hsl;

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

  const harmonyColors = hues.map((hue) => hslToHex(hue, s, l));
  const primaryColor = harmonyColors[0];
  const secondaryColor = harmonyColors[1] || harmonyColors[0];
  const shades = generateShades(primaryColor);

  const useLightText = shouldUseLightText(primaryColor);
  const textColor = useLightText ? '#FFFFFF' : '#1F2937';
  const mutedTextColor = useLightText ? '#D1D5DB' : '#6B7280';

  return (
    <div className="bg-[#13131A] border border-[#1F1F2E] rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Preview</h3>
        <p className="text-sm text-gray-400">Visualização de componentes com as cores</p>
      </div>

      <div className="space-y-4">
        {/* Card de exemplo */}
        <div
          className="rounded-lg p-6 shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          <h4 className="text-xl font-bold mb-2" style={{ color: textColor }}>
            Card de Exemplo
          </h4>
          <p className="text-sm mb-4" style={{ color: mutedTextColor }}>
            Este é um exemplo de card usando a cor primária da sua paleta como fundo.
          </p>
          <button
            className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
            style={{
              backgroundColor: secondaryColor,
              color: shouldUseLightText(secondaryColor) ? '#FFFFFF' : '#1F2937',
            }}
          >
            Botão de Ação
          </button>
        </div>

        {/* Botões */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {harmonyColors.slice(0, 4).map((color, index) => (
            <button
              key={index}
              className="px-4 py-3 rounded-lg font-medium transition-all hover:opacity-90 shadow-md"
              style={{
                backgroundColor: color,
                color: shouldUseLightText(color) ? '#FFFFFF' : '#1F2937',
              }}
            >
              Botão {index + 1}
            </button>
          ))}
        </div>

        {/* Texto sobre fundo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg p-4" style={{ backgroundColor: shades['100'] }}>
            <h5
              className="font-semibold mb-1"
              style={{ color: shouldUseLightText(shades['100']) ? '#FFFFFF' : '#1F2937' }}
            >
              Fundo Claro
            </h5>
            <p
              className="text-sm"
              style={{ color: shouldUseLightText(shades['100']) ? '#D1D5DB' : '#6B7280' }}
            >
              Exemplo de texto em fundo claro da paleta.
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: shades['800'] }}>
            <h5
              className="font-semibold mb-1"
              style={{ color: shouldUseLightText(shades['800']) ? '#FFFFFF' : '#1F2937' }}
            >
              Fundo Escuro
            </h5>
            <p
              className="text-sm"
              style={{ color: shouldUseLightText(shades['800']) ? '#D1D5DB' : '#6B7280' }}
            >
              Exemplo de texto em fundo escuro da paleta.
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(shades)
            .filter(([shade]) => ['100', '300', '500', '700', '900'].includes(shade))
            .map(([shade, hex]) => (
              <span
                key={shade}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: hex,
                  color: shouldUseLightText(hex) ? '#FFFFFF' : '#1F2937',
                }}
              >
                Badge {shade}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
