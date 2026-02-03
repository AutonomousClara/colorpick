'use client';

import { useState } from 'react';
import { shouldUseLightText } from '@/lib/colors';
import { copyToClipboard } from '@/lib/export';

interface ShadeRowProps {
  colorName: string;
  shades: Record<string, string>;
}

export default function ShadeRow({ colorName, shades }: ShadeRowProps) {
  const [copiedShade, setCopiedShade] = useState<string | null>(null);

  const handleCopy = async (shade: string, hex: string) => {
    const success = await copyToClipboard(hex);
    if (success) {
      setCopiedShade(shade);
      setTimeout(() => setCopiedShade(null), 2000);
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-300 capitalize">{colorName}</h4>
      <div className="grid grid-cols-11 gap-1">
        {Object.entries(shades).map(([shade, hex]) => {
          const useLightText = shouldUseLightText(hex);
          return (
            <button
              key={shade}
              onClick={() => handleCopy(shade, hex)}
              className="relative group aspect-square rounded-md overflow-hidden border border-[#1F1F2E] hover:border-purple-500 transition-all hover:scale-110 hover:z-10 cursor-pointer"
              style={{ backgroundColor: hex }}
              title={`${shade}: ${hex}`}
            >
              {/* Label do shade */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                <span
                  className={`text-[8px] sm:text-[10px] font-medium ${
                    useLightText ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {shade}
                </span>
              </div>

              {/* Feedback de cópia */}
              {copiedShade === shade && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              {/* HEX no hover (apenas desktop) */}
              <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-70 transition-opacity">
                <span className="text-[8px] text-white font-mono">{hex}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
