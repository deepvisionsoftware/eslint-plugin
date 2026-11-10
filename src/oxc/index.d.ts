type Severity = 'off' | 'warn' | 'error' | 0 | 1 | 2;
type RuleEntry = Severity | [Severity, ...unknown[]];

export interface OxlintOverride {
  files: string[];
  env?: Record<string, boolean>;
  globals?: Record<string, 'readonly' | 'writable' | 'off' | boolean>;
  plugins?: string[];
  rules?: Record<string, RuleEntry>;
}

export interface OxlintConfig {
  plugins: string[];
  categories: Record<string, Severity>;
  rules: Record<string, RuleEntry>;
  overrides: OxlintOverride[];
  [key: string]: unknown;
}

export interface OxlintOptions {
  /** Globs linted as the `node` preset (env node, empty classes with a decorator allowed). */
  node?: string[];
  /** Globs linted as the `vue` preset (env browser). */
  vue?: string[];
  /** Project overrides, applied after the preset's own (a later override wins). */
  overrides?: OxlintOverride[];
  /** Project rules, merged over the preset's. */
  rules?: Record<string, RuleEntry>;
  /** Passed through as is: `ignorePatterns`, `settings`, `globals`, `env`, … */
  [key: string]: unknown;
}

export function oxlint(options?: OxlintOptions): OxlintConfig;
export const oxlintRules: Record<string, RuleEntry>;

export const oxfmt: {
  printWidth: number;
  tabWidth: number;
  useTabs: boolean;
  singleQuote: boolean;
  semi: boolean;
  trailingComma: 'all' | 'es5' | 'none';
  arrowParens: 'always' | 'avoid';
  quoteProps: 'as-needed' | 'consistent' | 'preserve';
  bracketSpacing: boolean;
  experimentalOperatorPosition: 'start' | 'end';
  singleAttributePerLine: boolean;
};
