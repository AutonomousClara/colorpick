# ColorPick - Spec

> Gerador de paletas de cores com harmonias e exportação multi-formato.

---

## Problema

Designers e devs precisam criar paletas de cores harmônicas rapidamente. Ferramentas existentes são:
- Focadas só em Tailwind (não exportam outros formatos)
- Não mostram harmonias de cores
- Interface confusa

## Solução

**ColorPick** — Escolha uma cor, veja harmonias, exporte em qualquer formato.

---

## Features (MVP)

### 1. Seleção de Cor Base
- Color picker visual
- Input HEX (#FF5733)
- Input RGB
- Cor aleatória (botão "Random")

### 2. Harmonias de Cores
Gerar automaticamente:
- **Complementar** — Cor oposta (180°)
- **Análoga** — Cores adjacentes (±30°)
- **Tríade** — 3 cores equidistantes (120°)
- **Split-complementar** — Complementar + adjacentes
- **Tetrádica** — 4 cores (90° cada)

### 3. Shades (Variações)
Para cada cor da harmonia, gerar 11 shades:
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

### 4. Preview
- Cards de exemplo com as cores
- Texto sobre fundo (contraste)
- Botões estilizados

### 5. Exportação
Formatos:
- **CSS Variables**
```css
:root {
  --primary-500: #FF5733;
  --primary-600: #E64D2E;
}
```
- **Tailwind Config**
```js
colors: {
  primary: {
    500: '#FF5733',
    600: '#E64D2E',
  }
}
```
- **JSON**
- **SCSS Variables**

### 6. Salvar Paletas
- LocalStorage
- Lista de paletas salvas
- Deletar paleta

---

## Páginas

```
/                 Landing + Tool (tudo em uma página)
```

Single page app. Sem rotas extras.

---

## Componentes

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          # Landing + Tool
│   └── globals.css
├── components/
│   ├── ColorPicker.tsx   # Seletor de cor
│   ├── HarmonySelector.tsx # Tabs de harmonia
│   ├── PaletteDisplay.tsx  # Mostra paleta com shades
│   ├── ColorCard.tsx     # Card individual de cor
│   ├── ShadeRow.tsx      # Linha de shades
│   ├── Preview.tsx       # Preview de componentes
│   ├── ExportModal.tsx   # Modal de exportação
│   └── SavedPalettes.tsx # Lista de paletas salvas
└── lib/
    ├── colors.ts         # Funções de cor (HSL, harmonias)
    └── export.ts         # Funções de exportação
```

---

## Lógica de Cores

### Conversões
```typescript
// HEX -> HSL
function hexToHsl(hex: string): { h: number; s: number; l: number }

// HSL -> HEX
function hslToHex(h: number, s: number, l: number): string

// Gerar shades (variando lightness)
function generateShades(hex: string): Record<string, string>
// Retorna: { 50: '#...', 100: '#...', ..., 950: '#...' }
```

### Harmonias
```typescript
// Todas baseadas em rotação do HUE
function getComplementary(h: number): number[] // [h + 180]
function getAnalogous(h: number): number[]     // [h - 30, h, h + 30]
function getTriadic(h: number): number[]       // [h, h + 120, h + 240]
function getSplitComplementary(h: number): number[] // [h, h + 150, h + 210]
function getTetradic(h: number): number[]      // [h, h + 90, h + 180, h + 270]
```

---

## Design

### Cores do App
- Background: #0A0A0F (dark)
- Surface: #13131A
- Border: #1F1F2E
- Primary: Purple (#8B5CF6)
- Text: White/Gray

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  🎨 ColorPick                              [Saved] [?]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌─────────────────────────────────┐ │
│  │              │  │  [Complementar] [Análoga] [...]  │ │
│  │  Color       │  ├─────────────────────────────────┤ │
│  │  Picker      │  │                                  │ │
│  │              │  │  Paleta com Shades               │ │
│  │  #FF5733     │  │  (cores da harmonia)             │ │
│  │              │  │                                  │ │
│  │  [Random]    │  │                                  │ │
│  └──────────────┘  └─────────────────────────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Preview (cards, buttons, text)                     ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  [💾 Save Palette]  [📋 Export]                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- LocalStorage (salvar paletas)
- Zero dependências externas pra cores (implementar do zero)

---

## Critérios de Aceite

1. [ ] Usuário escolhe cor via picker ou input HEX
2. [ ] 5 tipos de harmonia funcionando
3. [ ] 11 shades gerados por cor
4. [ ] Preview visual das cores
5. [ ] Export CSS Variables funciona
6. [ ] Export Tailwind Config funciona
7. [ ] Export JSON funciona
8. [ ] Salvar paleta no localStorage
9. [ ] Listar paletas salvas
10. [ ] Deletar paleta
11. [ ] Botão "Random" gera cor aleatória
12. [ ] Copiar cor individual (click)
13. [ ] Mobile responsive
14. [ ] Lighthouse >= 90

---

## Não Fazer (fora do escopo)

- ❌ Backend/API
- ❌ Conta de usuário
- ❌ Exportar imagem
- ❌ Gradientes
- ❌ Acessibilidade checker (WCAG) — pode ser v2

---

## Ordem de Implementação

1. Setup Next.js + Tailwind
2. Funções de cor (lib/colors.ts)
3. ColorPicker component
4. HarmonySelector (tabs)
5. PaletteDisplay + ShadeRow
6. Preview component
7. Export functions + modal
8. Save/Load palettes
9. Polish (animações, mobile)
10. Deploy

---

*Spec criada: 2026-02-03*
*Tempo estimado: 1-2 horas*
