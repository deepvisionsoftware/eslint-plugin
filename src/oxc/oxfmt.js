/**
 * Oxfmt preset: the formatting half of the ESLint presets, i.e.
 * `@stylistic.configs.customize({ indent: 2, quotes: 'single', semi: true,
 * arrowParens: true, braceStyle: '1tbs' })` as a Prettier-compatible
 * formatter config — the `fmt` block of a Vite+ `vite.config.ts`, or the
 * content of a `.oxfmtrc.json`.
 *
 * Not covered: `@stylistic/padding-line-between-statements` (a blank line
 * before `return`). Oxfmt keeps the blank lines it finds but never adds one,
 * and Oxlint has no such rule.
 */
export const oxfmt = {
  /**
   * @stylistic has no line length. 120 is the width that rewraps the least of
   * code written under the ESLint presets.
   */
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  /**
   * @stylistic: comma-dangle 'always-multiline'
   */
  trailingComma: 'all',
  arrowParens: 'always',
  /**
   * @stylistic: quote-props 'consistent-as-needed'
   */
  quoteProps: 'consistent',
  bracketSpacing: true,
  /**
   * @stylistic: operator-linebreak 'before' — `&&`, `?`, `+` lead the
   * wrapped line.
   */
  experimentalOperatorPosition: 'start',
  /**
   * vue/max-attributes-per-line (strongly-recommended: 1 per line): a tag with
   * more than one attribute puts each on its own line.
   */
  singleAttributePerLine: true,
};
