import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import { typescriptRules } from '../shared/rules.js';

export default defineConfig([
  /**
   * Ignore all files outside src directory
   */
  globalIgnores([
    '**/*',
    '!src/**',
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
   * @stylistic/eslint-plugin: Custom Style
   * @see {@link https://eslint.style/rules}
   */
  eslint.configs.recommended,
  typescriptEslint.configs.strictTypeChecked,
  typescriptEslint.configs.stylisticTypeChecked,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    arrowParens: true,
    braceStyle: '1tbs',
  }),
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    rules: {
      ...typescriptRules,
      /**
       * Allow NestJs module empty classes with @Module decorator
       *
       * @Module({
       *   providers: [
       *     ExampleProvider,
       *   ],
       * })
       * export class ExampleModule {}
       */
      '@typescript-eslint/no-extraneous-class': [
        'error',
        {
          allowWithDecorator: true,
        },
      ],
    },
  },
]);
