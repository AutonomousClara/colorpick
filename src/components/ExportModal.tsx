'use client';

import { useState } from 'react';
import { generateShades, hexToHsl, hslToHex } from '@/lib/colors';
import type { HarmonyType } from './HarmonySelector';
import {
  getComplementary,
  getAnalogous,
  getTriadic,
  getSplitComplementary,
  getTetradic,
} from '@/lib/colors';
import {
  exportToCSSVariables,
  exportToTailwind,
  exportToJSON,
  exportToSCSS,
  copyToClipboard,
  type Palette,
} from '@/lib/export';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseColor: string;
  harmony: HarmonyType;
}

type ExportFormat = 'css' | 'tailwind' | 'json' | 'scss';

export default function ExportModal({ isOpen, onClose, baseColor, harmony }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

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

  const palette: Palette = {
    colors: harmonyColors.map((color, index) => ({
      name: `color-${index + 1}`,
      shades: generateShades(color),
    })),
  };

  const getExportContent = () => {
    switch (selectedFormat) {
      case 'css':
        return exportToCSSVariables(palette);
      case 'tailwind':
        return exportToTailwind(palette);
      case 'json':
        return exportToJSON(palette);
      case 'scss':
        return exportToSCSS(palette);
    }
  };

  const handleCopy = async () => {
    const content = getExportContent();
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formats: { value: ExportFormat; label: string }[] = [
    { value: 'css', label: 'CSS Variables' },
    { value: 'tailwind', label: 'Tailwind Config' },
    { value: 'json', label: 'JSON' },
    { value: 'scss', label: 'SCSS Variables' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="bg-[#13131A] border border-[#1F1F2E] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1F1F2E]">
          <h3 className="text-xl font-semibold text-white">Exportar Paleta</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Format selector */}
        <div className="p-6 border-b border-[#1F1F2E]">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Selecione o formato
          </label>
          <div className="flex flex-wrap gap-2">
            {formats.map((format) => (
              <button
                key={format.value}
                onClick={() => setSelectedFormat(format.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFormat === format.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-[#0A0A0F] text-gray-300 hover:bg-[#1F1F2E] border border-[#1F1F2E]'
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code preview */}
        <div className="flex-1 overflow-auto p-6">
          <pre className="bg-[#0A0A0F] border border-[#1F1F2E] rounded-lg p-4 text-sm text-gray-300 font-mono overflow-x-auto">
            {getExportContent()}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#1F1F2E]">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1F1F2E] text-gray-300 rounded-lg font-medium hover:bg-[#2A2A3E] transition-all"
          >
            Fechar
          </button>
          <button
            onClick={handleCopy}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copiado!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copiar Código
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
