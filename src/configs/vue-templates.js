import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import vueEslintParser from 'vue-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

/**
 * The ESLint half of the Oxc setup (the other half is `oxlint()` and `oxfmt`
 * from `@deepvision/eslint-plugin/oxc`).
 *
 * Oxlint runs every JS/TS rule, including inside the <script> blocks of .vue
 * files, and Oxfmt formats everything. Two things Oxlint cannot do yet, so
 * ESLint keeps them — and only them, and only on .vue files:
 *
 * 1. Vue template rules. Oxlint parses only the <script> blocks; the template
 *    rules of eslint-plugin-vue (require-v-for-key, no-mutating-props,
 *    valid-v-*, no-unused-components, …) need the template AST.
 *    Upstream: oxc discussion #21936, issue #23207 ("Language Plugins").
 * 2. no-unused-vars in <script setup>: a binding that only the template reads
 *    looks unused to Oxlint; vue-eslint-parser marks template references as
 *    used.
 *
 * The layout rules of eslint-plugin-vue are switched off by
 * eslint-config-prettier, so they do not fight Oxfmt (which is
 * Prettier-compatible).
 */
export default defineConfig([
  /**
   * Only .vue files under src — everything else belongs to Oxlint.
   */
  globalIgnores([
    '**/*',
    '!**/',
    '!src/**/*.vue',
  ]),
  {
    files: ['src/**/*.vue'],
    extends: [
      eslintPluginVue.configs['flat/strongly-recommended'],
      eslintConfigPrettier,
    ],
    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    linterOptions: {
      /**
       * A directive in a .vue <script> may name a rule Oxlint runs
       * (`@typescript-eslint/no-explicit-any`); to ESLint it looks unused.
       */
      reportUnusedDisableDirectives: 'off',
    },
    rules: {
      /**
       * The `vue` preset's own rules (./vue.js)
       */
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' },
        },
      ],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'off',
      /**
       * eslint-config-prettier switches this one off; with `void: 'any'` it no
       * longer conflicts (Oxfmt prints void elements as `<br />`).
       */
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'any' },
        },
      ],
      /**
       * See 2. above — Oxlint switches it off for .vue files.
       */
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
]);
