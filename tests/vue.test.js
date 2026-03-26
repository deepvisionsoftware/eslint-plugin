import { describe, it, expect } from 'vitest';
import { ESLint } from 'eslint';
import { resolve } from 'node:path';

const fixtureDir = resolve(import.meta.dirname, 'fixtures/vue');

function createEslint() {
  return new ESLint({
    overrideConfigFile: resolve(fixtureDir, 'eslint.config.js'),
    cwd: fixtureDir,
  });
}

function getRuleIds(results) {
  return results
    .flatMap((r) => r.messages)
    .map((m) => m.ruleId);
}

describe('vue config', () => {
  describe('TypeScript files', () => {
    it('should pass valid TypeScript files', async () => {
      const eslint = createEslint();
      const results = await eslint.lintFiles(['src/valid.ts']);
      const errors = results.flatMap((r) => r.messages);

      expect(errors).toEqual([]);
    });

    it('should report @typescript-eslint/consistent-type-imports', async () => {
      const eslint = createEslint();
      const results = await eslint.lintFiles(['src/invalid.ts']);
      const ruleIds = getRuleIds(results);

      expect(ruleIds).toContain('@typescript-eslint/consistent-type-imports');
    });

    it('should report @typescript-eslint/no-explicit-any', async () => {
      const eslint = createEslint();
      const results = await eslint.lintFiles(['src/invalid.ts']);
      const ruleIds = getRuleIds(results);

      expect(ruleIds).toContain('@typescript-eslint/no-explicit-any');
    });

    it('should report @stylistic/quotes for double quotes', async () => {
      const eslint = createEslint();
      const results = await eslint.lintFiles(['src/invalid.ts']);
      const ruleIds = getRuleIds(results);

      expect(ruleIds).toContain('@stylistic/quotes');
    });

    it('should report @stylistic/semi for missing semicolons', async () => {
      const eslint = createEslint();
      const results = await eslint.lintFiles(['src/invalid.ts']);
      const ruleIds = getRuleIds(results);

      expect(ruleIds).toContain('@stylistic/semi');
    });
  });

  describe('Vue SFC files', () => {
    it('should pass valid Vue components', async () => {
      const eslint = createEslint();
      const results = await eslint.lintFiles(['src/ValidComponent.vue']);
      const errors = results.flatMap((r) => r.messages);

      expect(errors).toEqual([]);
    });

    it('should report vue/component-api-style for Options API', async () => {
      const eslint = createEslint();
      const results = await eslint.lintFiles(['src/InvalidComponent.vue']);
      const ruleIds = getRuleIds(results);

      expect(ruleIds).toContain('vue/component-api-style');
    });

    it('should report vue/component-name-in-template-casing for kebab-case', async () => {
      const eslint = createEslint();
      const results = await eslint.lintFiles(['src/InvalidCasing.vue']);
      const ruleIds = getRuleIds(results);

      expect(ruleIds).toContain('vue/component-name-in-template-casing');
    });
  });

  describe('ignore patterns', () => {
    it('should ignore src/graphql/**/*.ts files', async () => {
      const eslint = createEslint();
      const results = await eslint.lintFiles(['src/graphql/generated.ts']);
      const errors = results
        .flatMap((r) => r.messages)
        .filter((m) => m.severity === 2);

      expect(errors).toEqual([]);
    });
  });
});
