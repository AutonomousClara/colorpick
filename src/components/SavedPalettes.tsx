'use client';

import { useState, useEffect } from 'react';
import type { HarmonyType } from './HarmonySelector';

export interface SavedPalette {
  id: string;
  name: string;
  baseColor: string;
  harmony: HarmonyType;
  createdAt: string;
}

interface SavedPalettesProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (palette: SavedPalette) => void;
  currentColor: string;
  currentHarmony: HarmonyType;
}

const STORAGE_KEY = 'colorpick-palettes';

export default function SavedPalettes({
  isOpen,
  onClose,
  onLoad,
  currentColor,
  currentHarmony,
}: SavedPalettesProps) {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [paletteName, setPaletteName] = useState('');

  useEffect(() => {
    loadPalettes();
  }, []);

  const loadPalettes = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPalettes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erro ao carregar paletas:', error);
    }
  };

  const savePalette = () => {
    if (!paletteName.trim()) {
      alert('Digite um nome para a paleta');
      return;
    }

    const newPalette: SavedPalette = {
      id: Date.now().toString(),
      name: paletteName.trim(),
      baseColor: currentColor,
      harmony: currentHarmony,
      createdAt: new Date().toISOString(),
    };

    const updated = [...palettes, newPalette];
    setPalettes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPaletteName('');
    alert('Paleta salva com sucesso!');
  };

  const deletePalette = (id: string) => {
    if (!confirm('Deseja realmente deletar esta paleta?')) {
      return;
    }

    const updated = palettes.filter((p) => p.id !== id);
    setPalettes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const loadPalette = (palette: SavedPalette) => {
    onLoad(palette);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="bg-[#13131A] border border-[#1F1F2E] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1F1F2E]">
          <h3 className="text-xl font-semibold text-white">Paletas Salvas</h3>
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

        {/* Save current palette */}
        <div className="p-6 border-b border-[#1F1F2E] space-y-3">
          <h4 className="text-sm font-semibold text-gray-300">Salvar Paleta Atual</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="Nome da paleta"
              className="flex-1 px-4 py-2 bg-[#0A0A0F] border border-[#1F1F2E] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && savePalette()}
            />
            <button
              onClick={savePalette}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              Salvar
            </button>
          </div>
        </div>

        {/* Palettes list */}
        <div className="flex-1 overflow-auto p-6">
          {palettes.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              <p className="text-gray-400 text-sm">Nenhuma paleta salva ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {palettes.map((palette) => (
                <div
                  key={palette.id}
                  className="bg-[#0A0A0F] border border-[#1F1F2E] rounded-lg p-4 hover:border-purple-500 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-semibold text-white">{palette.name}</h5>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(palette.createdAt).toLocaleDateString('pt-BR')} •{' '}
                        {palette.harmony}
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-[#1F1F2E]"
                      style={{ backgroundColor: palette.baseColor }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadPalette(palette)}
                      className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-all"
                    >
                      Carregar
                    </button>
                    <button
                      onClick={() => deletePalette(palette.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-[#1F1F2E]">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1F1F2E] text-gray-300 rounded-lg font-medium hover:bg-[#2A2A3E] transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
