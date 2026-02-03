'use client';

import { useState, useEffect } from 'react';
import { isValidHex, normalizeHex, getRandomColor, hexToRgb } from '@/lib/colors';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(color);
  const [rgbR, setRgbR] = useState('0');
  const [rgbG, setRgbG] = useState('0');
  const [rgbB, setRgbB] = useState('0');

  useEffect(() => {
    setHexInput(color);
    const rgb = hexToRgb(color);
    setRgbR(rgb.r.toString());
    setRgbG(rgb.g.toString());
    setRgbB(rgb.b.toString());
  }, [color]);

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (isValidHex(value)) {
      const normalized = normalizeHex(value);
      onChange(normalized);
    }
  };

  const handleRgbChange = (r: string, g: string, b: string) => {
    const rNum = Math.min(255, Math.max(0, parseInt(r) || 0));
    const gNum = Math.min(255, Math.max(0, parseInt(g) || 0));
    const bNum = Math.min(255, Math.max(0, parseInt(b) || 0));

    const hex = `#${rNum.toString(16).padStart(2, '0')}${gNum.toString(16).padStart(2, '0')}${bNum.toString(16).padStart(2, '0')}`.toUpperCase();
    onChange(hex);
  };

  const handleRandomColor = () => {
    const randomColor = getRandomColor();
    onChange(randomColor);
  };

  return (
    <div className="bg-[#13131A] border border-[#1F1F2E] rounded-xl p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-white mb-2">Color Picker</h2>
        <p className="text-sm text-gray-400">Escolha uma cor base</p>
      </div>

      {/* Preview da cor */}
      <div
        className="w-full h-32 rounded-lg border-2 border-[#1F1F2E] shadow-lg transition-all"
        style={{ backgroundColor: color }}
      />

      {/* Input de cor nativo */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Visual</label>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="w-full h-12 rounded-lg cursor-pointer border-2 border-[#1F1F2E] bg-transparent"
        />
      </div>

      {/* Input HEX */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">HEX</label>
        <input
          type="text"
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          placeholder="#FF5733"
          className="w-full px-4 py-3 bg-[#0A0A0F] border border-[#1F1F2E] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
        />
      </div>

      {/* Input RGB */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">RGB</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1">R</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbR}
              onChange={(e) => {
                setRgbR(e.target.value);
                handleRgbChange(e.target.value, rgbG, rgbB);
              }}
              className="w-full px-3 py-2 bg-[#0A0A0F] border border-[#1F1F2E] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">G</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbG}
              onChange={(e) => {
                setRgbG(e.target.value);
                handleRgbChange(rgbR, e.target.value, rgbB);
              }}
              className="w-full px-3 py-2 bg-[#0A0A0F] border border-[#1F1F2E] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">B</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbB}
              onChange={(e) => {
                setRgbB(e.target.value);
                handleRgbChange(rgbR, rgbG, e.target.value);
              }}
              className="w-full px-3 py-2 bg-[#0A0A0F] border border-[#1F1F2E] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Botão Random */}
      <button
        onClick={handleRandomColor}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
      >
        Cor Aleatória
      </button>
    </div>
  );
}
