import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * Правила Feature-Sliced Design:
 *  1. слой импортирует только нижележащие слои;
 *  2. слайсы одного слоя не импортируют друг друга;
 *  3. снаружи слайс доступен только через public API (index.ts).
 */
const FSD_LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
const SLICED_LAYERS = ['pages', 'widgets', 'features', 'entities']

const fsdBoundaries = FSD_LAYERS.map((layer, index) => {
  const upperLayers = FSD_LAYERS.slice(0, index).flatMap((upper) => [
    `@/${upper}`,
    `@/${upper}/**`,
  ])
  const patterns = []

  if (upperLayers.length > 0) {
    patterns.push({
      group: upperLayers,
      message: 'FSD: слой может импортировать только нижележащие слои.',
    })
  }
  if (SLICED_LAYERS.includes(layer)) {
    patterns.push({
      group: [`@/${layer}/*`],
      message: 'FSD: слайсы одного слоя не должны зависеть друг от друга.',
    })
  }
  patterns.push({
    group: SLICED_LAYERS.map((sliced) => `@/${sliced}/*/*`),
    message: 'FSD: импортируйте слайс только через его public API (index.ts).',
  })

  return {
    files: [`src/${layer}/**/*.{ts,tsx}`],
    rules: { 'no-restricted-imports': ['error', { patterns }] },
  }
})

export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  ...fsdBoundaries,
])
