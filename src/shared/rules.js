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
   * Enforce separate type imports
   *
   * import type { Foo } from 'Foo';
   *
   * @see {@link https://typescript-eslint.io/rules/consistent-type-imports/}
   */
  '@typescript-eslint/consistent-type-imports': ['error', {
    prefer: 'type-imports',
    fixStyle: 'separate-type-imports',
    disallowTypeAnnotations: true,
  }],
};

/**
 * Stylistic rules shared across all configurations
 */
export const stylisticRules = {
  /**
   * Require a blank line before return statements.
   *
   * Alternative to the deprecated `newline-before-return` core rule.
   *
   * @see {@link https://eslint.style/rules/padding-line-between-statements}
   */
  '@stylistic/padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: 'return' },
  ],

  /**
   * Require certain order of imports
   */
  'perfectionist/sort-named-imports': ['error', {
    type: 'alphabetical',
    order: 'asc',
    ignoreCase: true,
    groups: ['value-import', 'type-import'],
  }],
};
