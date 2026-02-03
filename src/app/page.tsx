'use client';

import { useState } from 'react';
import ColorPicker from '@/components/ColorPicker';
import HarmonySelector, { type HarmonyType } from '@/components/HarmonySelector';
import PaletteDisplay from '@/components/PaletteDisplay';
import Preview from '@/components/Preview';
import ExportModal from '@/components/ExportModal';
import SavedPalettes, { type SavedPalette } from '@/components/SavedPalettes';

export default function Home() {
  const [baseColor, setBaseColor] = useState('#8B5CF6');
  const [selectedHarmony, setSelectedHarmony] = useState<HarmonyType>('complementary');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSavedPalettesOpen, setIsSavedPalettesOpen] = useState(false);

  const handleLoadPalette = (palette: SavedPalette) => {
    setBaseColor(palette.baseColor);
    setSelectedHarmony(palette.harmony);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      {/* Header */}
      <header className="border-b border-[#1F1F2E] bg-[#13131A]/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ColorPick</h1>
                <p className="text-sm text-gray-400">Gerador de paletas harmônicas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSavedPalettesOpen(true)}
                className="px-4 py-2 bg-[#1F1F2E] hover:bg-[#2A2A3E] text-gray-300 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span className="hidden sm:inline">Salvas</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Crie Paletas{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Harmônicas
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Escolha uma cor, selecione uma harmonia e exporte em CSS, Tailwind, JSON ou SCSS.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Sidebar - Color Picker */}
          <div className="lg:col-span-3">
            <ColorPicker color={baseColor} onChange={setBaseColor} />
          </div>

          {/* Main area - Harmony & Palette */}
          <div className="lg:col-span-9 space-y-6">
            <HarmonySelector
              selectedHarmony={selectedHarmony}
              onChange={setSelectedHarmony}
            />
            <PaletteDisplay baseColor={baseColor} harmony={selectedHarmony} />
          </div>
        </div>

        {/* Preview */}
        <div className="mb-8">
          <Preview baseColor={baseColor} harmony={selectedHarmony} />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsSavedPalettesOpen(true)}
            className="px-8 py-4 bg-[#13131A] border-2 border-[#1F1F2E] hover:border-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Salvar Paleta
          </button>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Exportar
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1F1F2E] mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400 text-sm">
            <p>
              Criado com{' '}
              <span className="text-purple-500">♥</span> usando Next.js, TypeScript e Tailwind
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Zero dependências externas para geração de cores
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        baseColor={baseColor}
        harmony={selectedHarmony}
      />
      <SavedPalettes
        isOpen={isSavedPalettesOpen}
        onClose={() => setIsSavedPalettesOpen(false)}
        onLoad={handleLoadPalette}
        currentColor={baseColor}
        currentHarmony={selectedHarmony}
      />
    </main>
  );
}
