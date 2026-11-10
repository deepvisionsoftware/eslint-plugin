import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  globalIgnores([
    'node_modules/**',
    'tests/fixtures/**',
  ]),
  eslint.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    arrowParens: true,
    braceStyle: '1tbs',
  }),
  {
    files: ['src/**/*.js'],
  },
]);
