/**
 * Oxlint preset: the `node` and `vue` ESLint presets, rule for rule, minus
 * formatting (that is Oxfmt's job, see ./oxfmt.js) and minus what Oxlint
 * cannot see (Vue templates, see ../configs/vue-templates.js).
 *
 * The rule set is the EFFECTIVE config of the ESLint presets
 * (`eslint --print-config`): @eslint/js recommended, typescript-eslint
 * strict + stylistic, and this package's own rules. tests/oxc-parity.test.js
 * computes that config with ESLint and fails when the two drift apart, so a
 * rule added to an ESLint preset has to be added here too (or listed there as
 * a known gap).
 *
 * Severity only, unless the ESLint preset sets an option. Every Oxlint
 * category is switched off, so nothing beyond this set fires.
 */

/**
 * Applies to every file. For .ts this is the whole set; .vue and plain JS get
 * the adjustments in NON_TS_RULES on top.
 *
 * typescript-eslint extension rules keep their core name in Oxlint
 * (`no-unused-vars` is `@typescript-eslint/no-unused-vars`).
 */
export const rules = {
  /**
   * @eslint/js: Recommended, minus what typescript-eslint switches off for .ts
   * (re-enabled for .vue and plain JS in NON_TS_RULES).
   *
   * Not listed: `no-dupe-args` and `no-octal` — Oxc's parser rejects both as
   * syntax errors, so there is nothing left for a rule to report.
   */
  'for-direction': 'error',
  'no-async-promise-executor': 'error',
  'no-case-declarations': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': ['error', 'except-parens'],
  'no-constant-binary-expression': 'error',
  'no-constant-condition': ['error', { checkLoops: 'allExceptWhileTrue' }],
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-delete-var': 'error',
  'no-dupe-else-if': 'error',
  'no-duplicate-case': 'error',
  'no-empty': 'error',
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-empty-static-block': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-fallthrough': 'error',
  'no-global-assign': 'error',
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': 'error',
  'no-loss-of-precision': 'error',
  'no-misleading-character-class': 'error',
  'no-nonoctal-decimal-escape': 'error',
  'no-prototype-builtins': 'error',
  'no-regex-spaces': 'error',
  'no-self-assign': 'error',
  'no-shadow-restricted-names': ['error', { reportGlobalThis: true }],
  'no-sparse-arrays': 'error',
  'no-unassigned-vars': 'error',
  'no-unexpected-multiline': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-optional-chaining': 'error',
  'no-unused-labels': 'error',
  'no-unused-private-class-members': 'error',
  'no-useless-assignment': 'error',
  'no-useless-backreference': 'error',
  'no-useless-catch': 'error',
  'no-useless-escape': 'error',
  'preserve-caught-error': 'error',
  'require-yield': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',

  /**
   * typescript-eslint: eslint-recommended — switched ON for .ts only
   * (switched back off for .vue and plain JS in NON_TS_RULES).
   */
  'no-var': 'error',
  'prefer-const': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',

  /**
   * typescript-eslint: Strict + Stylistic
   */
  'no-array-constructor': 'error',
  'no-empty-function': 'error',
  'no-unused-expressions': 'error',
  'no-unused-vars': 'error',
  'no-useless-constructor': 'error',
  'typescript/adjacent-overload-signatures': 'error',
  'typescript/array-type': 'error',
  'typescript/ban-ts-comment': ['error', { minimumDescriptionLength: 10 }],
  'typescript/ban-tslint-comment': 'error',
  'typescript/class-literal-property-style': 'error',
  'typescript/consistent-generic-constructors': 'error',
  'typescript/consistent-indexed-object-style': 'error',
  'typescript/consistent-type-assertions': 'error',
  'typescript/consistent-type-definitions': 'error',
  'typescript/no-confusing-non-null-assertion': 'error',
  'typescript/no-duplicate-enum-values': 'error',
  'typescript/no-dynamic-delete': 'error',
  'typescript/no-empty-object-type': 'error',
  'typescript/no-explicit-any': 'error',
  'typescript/no-extra-non-null-assertion': 'error',
  'typescript/no-extraneous-class': 'error',
  'typescript/no-inferrable-types': 'error',
  'typescript/no-invalid-void-type': 'error',
  'typescript/no-misused-new': 'error',
  'typescript/no-namespace': 'error',
  'typescript/no-non-null-asserted-nullish-coalescing': 'error',
  'typescript/no-non-null-asserted-optional-chain': 'error',
  'typescript/no-non-null-assertion': 'error',
  'typescript/no-require-imports': 'error',
  'typescript/no-this-alias': 'error',
  'typescript/no-unnecessary-type-constraint': 'error',
  'typescript/no-unsafe-declaration-merging': 'error',
  'typescript/no-unsafe-function-type': 'error',
  'typescript/no-wrapper-object-types': 'error',
  'typescript/prefer-as-const': 'error',
  'typescript/prefer-for-of': 'error',
  'typescript/prefer-function-type': 'error',
  'typescript/prefer-literal-enum-member': 'error',
  'typescript/prefer-namespace-keyword': 'error',
  'typescript/triple-slash-reference': 'error',
  'typescript/unified-signatures': 'error',

  /**
   * Shared TypeScript rules of this package (../shared/rules.js)
   */
  'typescript/consistent-type-imports': ['error', {
    prefer: 'type-imports',
    fixStyle: 'inline-type-imports',
    disallowTypeAnnotations: true,
  }],
};

/**
 * Files typescript-eslint's eslint-recommended override does NOT cover.
 */
export const NON_TS_FILES = ['**/*.vue', '**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'];

/**
 * typescript-eslint switches these core rules off for .ts (the compiler
 * reports the same problems) and the four `no-var`… rules on — for .ts only.
 * Everything else keeps the @eslint/js defaults.
 */
export const NON_TS_RULES = {
  'constructor-super': 'error',
  'getter-return': 'error',
  'no-class-assign': 'error',
  'no-const-assign': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-keys': 'error',
  'no-func-assign': 'error',
  'no-import-assign': 'error',
  'no-new-native-nonconstructor': 'error',
  'no-obj-calls': 'error',
  'no-redeclare': ['error', { builtinGlobals: true }],
  'no-setter-return': 'error',
  'no-this-before-super': 'error',
  'no-undef': 'error',
  'no-unreachable': 'error',
  'no-unsafe-negation': 'error',
  'no-with': 'error',
  'no-var': 'off',
  'prefer-const': 'off',
  'prefer-rest-params': 'off',
  'prefer-spread': 'off',
};

/**
 * Vue's compiler macros, available in <script setup> without an import
 * (eslint-plugin-vue declares the same globals).
 */
export const VUE_MACROS = {
  defineProps: 'readonly',
  defineEmits: 'readonly',
  defineExpose: 'readonly',
  defineOptions: 'readonly',
  defineSlots: 'readonly',
  defineModel: 'readonly',
  withDefaults: 'readonly',
};

/**
 * Oxlint lints only the <script> blocks of a .vue file. A <script setup>
 * binding that only the template reads would look unused, so
 * `no-unused-vars` moves to the `vueTemplates` ESLint config for .vue files.
 */
const vueFiles = {
  files: ['**/*.vue'],
  globals: VUE_MACROS,
  rules: {
    'no-unused-vars': 'off',
  },
};

/**
 * The `node` preset's own rules.
 */
const nodeFlavour = {
  env: { node: true },
  rules: {
    /**
     * Allow NestJs module empty classes with @Module decorator
     */
    'typescript/no-extraneous-class': ['error', { allowWithDecorator: true }],
  },
};

/**
 * The `vue` preset's own globals.
 */
const vueFlavour = {
  env: { browser: true },
};

/**
 * Builds the Oxlint config — the `lint` block of a Vite+ `vite.config.ts`, or
 * the content of a `.oxlintrc.json`.
 *
 * @param {object} [options]
 * @param {string[]} [options.node] globs linted as the `node` preset (env node,
 *   empty classes with a decorator allowed)
 * @param {string[]} [options.vue] globs linted as the `vue` preset (env browser)
 * @param {object[]} [options.overrides] project overrides, applied after the
 *   preset's own (a later override wins)
 * @param {object} [options.rules] project rules, merged over the preset's
 *
 * Any other key (`ignorePatterns`, `settings`, `globals`, `env`, …) is passed
 * through as is.
 *
 * @example
 * // vite.config.ts of a monorepo
 * lint: oxlint({ node: ['apps/api/**'], vue: ['apps/app/**', 'libs/ui/**'] }),
 *
 * @example
 * // a single Vue app
 * lint: oxlint({ vue: ['**'] }),
 */
export function oxlint({ node = [], vue = [], overrides = [], rules: projectRules = {}, ...rest } = {}) {
  return {
    plugins: ['typescript'],
    categories: {
      correctness: 'off',
      suspicious: 'off',
      pedantic: 'off',
      perf: 'off',
      style: 'off',
      restriction: 'off',
      nursery: 'off',
    },
    ...rest,
    rules: { ...rules, ...projectRules },
    overrides: [
      { files: NON_TS_FILES, rules: NON_TS_RULES },
      vueFiles,
      ...(node.length ? [{ files: node, ...nodeFlavour }] : []),
      ...(vue.length ? [{ files: vue, ...vueFlavour }] : []),
      ...overrides,
    ],
  };
}
