'use client';

export type HarmonyType = 'complementary' | 'analogous' | 'triadic' | 'split' | 'tetradic';

interface HarmonySelectorProps {
  selectedHarmony: HarmonyType;
  onChange: (harmony: HarmonyType) => void;
}

const harmonies: { value: HarmonyType; label: string; description: string }[] = [
  { value: 'complementary', label: 'Complementar', description: 'Cor oposta (180°)' },
  { value: 'analogous', label: 'Análoga', description: 'Cores adjacentes (±30°)' },
  { value: 'triadic', label: 'Tríade', description: '3 cores equidistantes' },
  { value: 'split', label: 'Split-Comp', description: 'Complementar + adjacentes' },
  { value: 'tetradic', label: 'Tetrádica', description: '4 cores equidistantes' },
];

export default function HarmonySelector({ selectedHarmony, onChange }: HarmonySelectorProps) {
  return (
    <div className="bg-[#13131A] border border-[#1F1F2E] rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">Harmonias de Cores</h3>
      <div className="flex flex-wrap gap-2">
        {harmonies.map((harmony) => (
          <button
            key={harmony.value}
            onClick={() => onChange(harmony.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedHarmony === harmony.value
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-[#0A0A0F] text-gray-300 hover:bg-[#1F1F2E] border border-[#1F1F2E]'
            }`}
            title={harmony.description}
          >
            {harmony.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        {harmonies.find((h) => h.value === selectedHarmony)?.description}
      </p>
    </div>
  );
}
