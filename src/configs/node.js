import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';

export default defineConfig([
  /**
   * Ignore all files outside src directory
   */
  {
    ignores: ['**/*', '!src/**'],
  },
  /**
   * External Configs
   *
   * @eslint/js: Recommended
   * @see {@link https://eslint.org/docs/latest/rules/}
   *
   * typescript-eslint: Strict (with Type Checks)
   * typescript-eslint: Stylistic (with Type Checks)
   * @see {@link https://typescript-eslint.io/rules/}
   */
  eslint.configs.recommended,
  typescriptEslint.configs.strictTypeChecked,
  typescriptEslint.configs.stylisticTypeChecked,
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
      '@typescript-eslint/no-extraneous-class': ['error', {
        allowWithDecorator: true,
      }],
    },
  },
]);
