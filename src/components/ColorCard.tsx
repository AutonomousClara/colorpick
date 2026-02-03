'use client';

import { useState } from 'react';
import { shouldUseLightText } from '@/lib/colors';
import { copyToClipboard } from '@/lib/export';

interface ColorCardProps {
  color: string;
  label: string;
  onClick?: () => void;
}

export default function ColorCard({ color, label, onClick }: ColorCardProps) {
  const [copied, setCopied] = useState(false);
  const useLightText = shouldUseLightText(color);

  const handleClick = async () => {
    const success = await copyToClipboard(color);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="relative group overflow-hidden rounded-lg border-2 border-[#1F1F2E] hover:border-purple-500 transition-all hover:scale-105 cursor-pointer"
      style={{ backgroundColor: color }}
    >
      <div className="aspect-square flex flex-col items-center justify-center p-4">
        <span
          className={`text-sm font-medium mb-1 ${
            useLightText ? 'text-white' : 'text-gray-900'
          }`}
        >
          {label}
        </span>
        <span
          className={`text-xs font-mono ${
            useLightText ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          {color}
        </span>
      </div>

      {/* Feedback de cópia */}
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <span className="text-white text-sm font-medium">Copiado!</span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
        <svg
          className={`w-6 h-6 ${useLightText ? 'text-white' : 'text-gray-900'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
    </button>
  );
}
