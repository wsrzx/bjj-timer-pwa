import nextjs from '@next/eslint-plugin-next'
import js from '@eslint/js'

export default [
  {
    plugins: {
      '@next/next': nextjs,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
]
