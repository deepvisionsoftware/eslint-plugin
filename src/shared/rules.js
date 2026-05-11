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
   * Sort import statements into groups by source — builtin, external,
   * internal (paths matching `^@/.*`), then relative — alphabetically
   * within each group, with one blank line between groups. Value and
   * type imports share each group so `import` and `import type` from
   * the same module sit together.
   *
   * Side-effect imports keep their original order (`sortSideEffects: false`)
   * and are omitted from `groups`, since reordering them can change runtime
   * behavior (polyfills, setup, CSS, etc.).
   *
   * @see {@link https://perfectionist.dev/rules/sort-imports}
   */
  'perfectionist/sort-imports': ['error', {
    type: 'alphabetical',
    order: 'asc',
    newlinesBetween: 1,
    sortSideEffects: false,
    internalPattern: ['^@/.*'],
    groups: [
      ['value-builtin', 'type-builtin'],
      ['value-external', 'type-external'],
      ['value-internal', 'type-internal'],
      ['value-parent', 'value-sibling', 'value-index', 'type-parent', 'type-sibling', 'type-index'],
    ],
  }],

  /**
   * Sort named imports inside `{ ... }` alphabetically,
   * with value imports before type imports.
   *
   * @see {@link https://perfectionist.dev/rules/sort-named-imports}
   */
  'perfectionist/sort-named-imports': ['error', {
    type: 'alphabetical',
    order: 'asc',
    ignoreCase: true,
    groups: ['value-import', 'type-import'],
  }],
};
