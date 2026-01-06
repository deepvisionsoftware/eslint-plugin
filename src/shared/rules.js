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
};
