import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import vueEslintParser from 'vue-eslint-parser';
import stylisticEslint from '@stylistic/eslint-plugin';
import globals from 'globals';
import { typescriptRules } from '../shared/rules.js';

/**
 * Additional file extensions which should be considered in the TypeScript Program compilation.
 * @see {@link https://typescript-eslint.io/troubleshooting/typed-linting/performance#project-service-issues}
 */
const extraFileExtensions = ['.vue'];

export default defineConfig([
  /**
   * Ignore all files outside src directory and graphql codegen
   */
  globalIgnores([
    '**/*',
    '!src/**',
    'src/graphql/**/*.ts',
  ]),
  /**
   * External Configs
   *
   * @eslint/js: Recommended
   * @see {@link https://eslint.org/docs/latest/rules/}
   *
   * typescript-eslint: Strict (with Type Checks)
   * typescript-eslint: Stylistic (with Type Checks)
   * @see {@link https://typescript-eslint.io/rules/}
   *
   * eslint-plugin-vue: Strongly recommended
   * @see {@link https://eslint.vuejs.org/rules/}
   *
   * @stylistic/eslint-plugin: Custom Style
   * @see {@link https://eslint.style/rules}
   */
  eslint.configs.recommended,
  typescriptEslint.configs.strictTypeChecked,
  typescriptEslint.configs.stylisticTypeChecked,
  eslintPluginVue.configs['flat/strongly-recommended'],
  stylisticEslint.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    arrowParens: true,
    braceStyle: '1tbs',
  }),
  /**
   * Typescript file Parser
   */
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        projectService: true,
        extraFileExtensions,
      },
    },
  },
  /**
   * Vue files Parser
   */
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        projectService: true,
        parser: typescriptEslint.parser,
        extraFileExtensions,
      },
      /**
       * Fixes "window is undefined" and other browser global variables visibility
       */
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    rules: {
      ...typescriptRules,
      /**
       * Enforce Typescript for script blocks in Vue SFC
       *
       * <script lang="ts">
       * export default {
       *   // component code
       * }
       * </script>
       */
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' },
        },
      ],
      /**
       * Enforce Composition API with script-setup style
       *
       * <script setup lang="ts">
       * const count = ref(0);
       * </script>
       */
      'vue/component-api-style': ['error', ['script-setup']],
      /**
       * Enforce PascalCase for component names in templates
       *
       * <template>
       *   <MyComponent />
       * </template>
       */
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      /**
       * Requires component names to be always multi-word.
       * Disabled.
       */
      'vue/multi-word-component-names': 'off',
    },
  },
]);
