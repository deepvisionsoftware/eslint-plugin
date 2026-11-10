import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ESLint } from 'eslint';
import { execFileSync } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { oxfmt, oxlint } from '../src/oxc/index.js';

const fixtureDir = resolve(import.meta.dirname, 'fixtures/oxc');
const bin = (name) => resolve(import.meta.dirname, '../node_modules/.bin', name);
const oxlintConfig = resolve(fixtureDir, '.oxlintrc.json');
const oxfmtConfig = resolve(fixtureDir, '.oxfmtrc.json');

beforeAll(() => {
  writeFileSync(oxlintConfig, JSON.stringify(oxlint({ node: ['node/**'], vue: ['vue/**'] })));
  writeFileSync(oxfmtConfig, JSON.stringify(oxfmt));
});

afterAll(() => {
  rmSync(oxlintConfig, { force: true });
  rmSync(oxfmtConfig, { force: true });
});

/**
 * Rule ids Oxlint reports for `file`, as `plugin(rule)`.
 */
function runOxlint(file) {
  let output;

  try {
    output = execFileSync(bin('oxlint'), ['-c', oxlintConfig, '--format', 'json', file], { cwd: fixtureDir });
  } catch (error) {
    output = error.stdout;
  }

  return JSON.parse(output.toString()).diagnostics.map((d) => d.code);
}

async function runEslint(file) {
  const cwd = resolve(fixtureDir, 'vue');
  const eslint = new ESLint({ cwd, overrideConfigFile: resolve(cwd, 'eslint.config.js') });
  const results = await eslint.lintFiles([file]);

  return results.flatMap((r) => r.messages).map((m) => m.ruleId);
}

describe('oxlint()', () => {
  it('passes valid code', () => {
    expect(runOxlint('node/src/valid.ts')).toEqual([]);
    expect(runOxlint('vue/src/ValidComponent.vue')).toEqual([]);
  });

  it('reports the preset rules', () => {
    expect(runOxlint('node/src/invalid.ts')).toEqual(expect.arrayContaining([
      'typescript(consistent-type-imports)',
      'typescript(no-explicit-any)',
      'eslint(prefer-const)',
      'eslint(no-unused-vars)',
    ]));
  });

  it('reports undefined globals in .vue <script>, but knows the compiler macros', () => {
    expect(runOxlint('vue/src/InvalidComponent.vue')).toEqual(expect.arrayContaining([
      'eslint(no-undef)',
      'typescript(no-explicit-any)',
    ]));
    expect(runOxlint('vue/src/ValidComponent.vue')).not.toContain('eslint(no-undef)');
  });

  it('leaves no-unused-vars in .vue to ESLint', () => {
    expect(runOxlint('vue/src/InvalidComponent.vue')).not.toContain('eslint(no-unused-vars)');
  });

  it('allows empty decorated classes in the node preset only', () => {
    expect(runOxlint('node/src/app.module.ts')).toEqual([]);
    expect(runOxlint('vue/src/app.module.ts')).toContain('typescript(no-extraneous-class)');
  });
});

describe('configs.vueTemplates', () => {
  it('passes valid components, including bindings only the template reads', async () => {
    expect(await runEslint('src/ValidComponent.vue')).toEqual([]);
  });

  it('reports template rules and unused <script setup> bindings', async () => {
    expect(await runEslint('src/InvalidComponent.vue')).toEqual(expect.arrayContaining([
      'vue/require-v-for-key',
      '@typescript-eslint/no-unused-vars',
    ]));
  });

  it('leaves JS/TS rules to Oxlint', async () => {
    const ruleIds = await runEslint('src/InvalidComponent.vue');

    expect(ruleIds).not.toContain('@typescript-eslint/no-explicit-any');
    expect(ruleIds).not.toContain('no-undef');
  });

  it('leaves layout to Oxfmt', async () => {
    const cwd = resolve(fixtureDir, 'vue');
    const eslint = new ESLint({ cwd, overrideConfigFile: resolve(cwd, 'eslint.config.js') });
    const config = await eslint.calculateConfigForFile('src/A.vue');
    const layout = ['vue/html-indent', 'vue/max-attributes-per-line', 'vue/html-closing-bracket-newline'];

    for (const rule of layout) {
      expect([0, 'off'], rule).toContain(Array.isArray(config.rules[rule]) ? config.rules[rule][0] : config.rules[rule]);
    }
  });
});

describe('oxfmt', () => {
  it('accepts code written in the preset style as is', () => {
    const files = ['node/src/valid.ts', 'node/src/app.module.ts', 'vue/src/ValidComponent.vue'];

    expect(() => execFileSync(bin('oxfmt'), ['--config', oxfmtConfig, '--check', ...files], { cwd: fixtureDir })).not.toThrow();
  });
});
