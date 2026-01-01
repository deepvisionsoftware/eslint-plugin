/**
 * Shared ESLint rule configurations
 *
 * These rules are applied across all configs (node, vue, etc.)
 */

/**
 * TypeScript-specific rules shared across all configurations
 */
export const typescriptRules = {
  /**
   * Enforce inline type imports
   *
   * import { type Foo } from 'Foo';
   *
   * @see {@link https://typescript-eslint.io/rules/consistent-type-imports/}
   */
  '@typescript-eslint/consistent-type-imports': ['error', {
    prefer: 'type-imports',
    fixStyle: 'inline-type-imports',
    disallowTypeAnnotations: true,
  }],
  /**
   * Allow numbers in template expressions
   *
   * const count = 5;
   * console.log(`Count: ${count}`);
   *
   * @see {@link https://typescript-eslint.io/rules/restrict-template-expressions/}
   */
  '@typescript-eslint/restrict-template-expressions': ['error', {
    allowNumber: true,
  }],
};
