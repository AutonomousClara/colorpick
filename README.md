# ColorPick 🎨

Gerador de paletas de cores com harmonias e exportação multi-formato.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## Features

- **Seleção de Cor**: Color picker visual, input HEX, RGB e botão aleatório
- **5 Harmonias**: Complementar, Análoga, Tríade, Split-complementar e Tetrádica
- **11 Shades**: Geração automática de variações (50-950)
- **Preview**: Visualização de componentes usando as cores
- **Exportação**: CSS Variables, Tailwind, JSON e SCSS
- **Salvamento**: LocalStorage para paletas favoritas
- **Zero Dependências**: Toda lógica de cores implementada do zero
- **Design Dark**: Interface moderna com gradientes purple/pink
- **Mobile First**: Totalmente responsivo

## Getting Started

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          # Página principal
│   └── globals.css       # Design system
├── components/
│   ├── ColorPicker.tsx   # Seletor de cor
│   ├── HarmonySelector.tsx # Tabs de harmonia
│   ├── PaletteDisplay.tsx  # Exibição da paleta
│   ├── ColorCard.tsx     # Card de cor
│   ├── ShadeRow.tsx      # Linha de shades
│   ├── Preview.tsx       # Preview de componentes
│   ├── ExportModal.tsx   # Modal de exportação
│   └── SavedPalettes.tsx # Gerenciamento de paletas
└── lib/
    ├── colors.ts         # Lógica de cores (HSL, harmonias)
    └── export.ts         # Funções de exportação
```

## Stack Tecnológica

- **Next.js 14**: App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **LocalStorage**: Persistência local
- **Zero libs externas**: Toda lógica de cores implementada do zero

## Critérios de Aceite

- ✅ Seleção de cor via picker/HEX/RGB
- ✅ 5 tipos de harmonia funcionando
- ✅ 11 shades por cor
- ✅ Preview visual das cores
- ✅ Export CSS Variables
- ✅ Export Tailwind Config
- ✅ Export JSON
- ✅ Export SCSS
- ✅ Salvar paleta no localStorage
- ✅ Listar paletas salvas
- ✅ Deletar paleta
- ✅ Cor aleatória
- ✅ Copiar cor individual
- ✅ Mobile responsive
- ✅ Build sem erros

## Deploy

Build passa sem erros:

```bash
npm run build
# ✓ Compiled successfully
```

Pronto para deploy em:
- Vercel (recomendado)
- Netlify
- Qualquer plataforma que suporte Next.js

## Licença

MIT

---

Criado com ♥ usando Next.js, TypeScript e Tailwind CSS
