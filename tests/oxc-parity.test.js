import { describe, it, expect } from 'vitest';
import { ESLint } from 'eslint';
import { matchesGlob, resolve } from 'node:path';
import { oxlint } from '../src/oxc/index.js';

/**
 * The Oxlint preset must stay the ESLint presets minus formatting. This
 * computes the effective config of `node` and `vue` with ESLint itself and
 * compares it to what `oxlint()` resolves to for the same kind of file.
 */

/**
 * typescript-eslint extension rules: Oxlint keeps the core name.
 */
const EXTENSION_RULES = new Set([
  'no-array-constructor',
  'no-empty-function',
  'no-unused-expressions',
  'no-unused-vars',
  'no-useless-constructor',
]);

/**
 * ESLint rules with no Oxlint counterpart, and why.
 */
const KNOWN_GAPS = {
  // Oxc's parser rejects these as syntax errors already.
  'no-dupe-args': 'all',
  'no-octal': 'all',
  // Oxlint cannot see the template; configs.vueTemplates runs it on .vue.
  '@typescript-eslint/no-unused-vars': 'vue',
};

const toEslintName = (rule) => {
  if (rule.startsWith('typescript/')) {
    return `@typescript-eslint/${rule.slice('typescript/'.length)}`;
  }

  return EXTENSION_RULES.has(rule) ? `@typescript-eslint/${rule}` : rule;
};

const severity = (entry) => (Array.isArray(entry) ? entry[0] : entry);
const isOn = (entry) => ![0, 'off'].includes(severity(entry));
const options = (entry) => (Array.isArray(entry) ? entry.slice(1) : []);

/**
 * The rules Oxlint applies to `file`: base rules, then every matching
 * override in order.
 */
function resolveOxlint(config, file) {
  const rules = { ...config.rules };

  for (const override of config.overrides) {
    if (override.files.some((glob) => matchesGlob(file, glob))) {
      Object.assign(rules, override.rules);
    }
  }

  return Object.fromEntries(
    Object.entries(rules)
      .filter(([, entry]) => isOn(entry))
      .map(([rule, entry]) => [toEslintName(rule), entry]),
  );
}

async function resolveEslint(flavour, file) {
  const cwd = resolve(import.meta.dirname, 'fixtures', flavour);
  const eslint = new ESLint({ cwd, overrideConfigFile: resolve(cwd, 'eslint.config.js') });
  const config = await eslint.calculateConfigForFile(file);

  return Object.fromEntries(
    Object.entries(config.rules)
      .filter(([rule, entry]) => isOn(entry) && !rule.startsWith('@stylistic/') && !rule.startsWith('vue/')),
  );
}

const config = oxlint({ node: ['node/**'], vue: ['vue/**'] });

const cases = [
  ['node', 'src/a.ts', 'ts'],
  ['node', 'src/a.js', 'js'],
  ['vue', 'src/a.ts', 'ts'],
  ['vue', 'src/A.vue', 'vue'],
  ['vue', 'src/a.js', 'js'],
];

describe('oxlint preset parity with the ESLint presets', () => {
  for (const [flavour, file, kind] of cases) {
    describe(`${flavour} preset, ${file}`, async () => {
      const eslintRules = await resolveEslint(flavour, file);
      const oxlintRules = resolveOxlint(config, `${flavour}/${file}`);
      const isGap = (rule) => KNOWN_GAPS[rule] === 'all' || KNOWN_GAPS[rule] === kind;

      it('runs every ESLint rule (or lists it as a known gap)', () => {
        const missing = Object.keys(eslintRules).filter((rule) => !(rule in oxlintRules) && !isGap(rule));

        expect(missing).toEqual([]);
      });

      it('runs no rule the ESLint preset does not', () => {
        const extra = Object.keys(oxlintRules).filter((rule) => !(rule in eslintRules));

        expect(extra).toEqual([]);
      });

      it('passes the same options', () => {
        for (const [rule, entry] of Object.entries(oxlintRules)) {
          const [oxlintOptions] = options(entry);

          if (oxlintOptions === undefined) {
            continue;
          }

          const [eslintOptions] = options(eslintRules[rule]);

          expect(eslintOptions, rule).toMatchObject(oxlintOptions);
        }
      });
    });
  }

  it('leaves no-unused-vars on .vue to configs.vueTemplates', async () => {
    const cwd = resolve(import.meta.dirname, 'fixtures/oxc/vue');
    const eslint = new ESLint({ cwd, overrideConfigFile: resolve(cwd, 'eslint.config.js') });
    const vueTemplates = await eslint.calculateConfigForFile('src/A.vue');

    expect(isOn(vueTemplates.rules['@typescript-eslint/no-unused-vars'])).toBe(true);
  });
});
