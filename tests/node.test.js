import { describe, it, expect } from 'vitest';
import { ESLint } from 'eslint';
import { resolve } from 'node:path';

const fixtureDir = resolve(import.meta.dirname, 'fixtures/node');

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

describe('node config', () => {
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

  it('should report @stylistic/padding-line-between-statements before return', async () => {
    const eslint = createEslint();
    const results = await eslint.lintFiles(['src/invalid.ts']);
    const ruleIds = getRuleIds(results);

    expect(ruleIds).toContain('@stylistic/padding-line-between-statements');
  });

  it('should report perfectionist/sort-imports for misordered imports', async () => {
    const eslint = createEslint();
    const results = await eslint.lintFiles(['src/invalid.ts']);
    const ruleIds = getRuleIds(results);

    expect(ruleIds).toContain('perfectionist/sort-imports');
  });

  it('should report perfectionist/sort-named-imports for unsorted named imports', async () => {
    const eslint = createEslint();
    const results = await eslint.lintFiles(['src/invalid.ts']);
    const ruleIds = getRuleIds(results);

    expect(ruleIds).toContain('perfectionist/sort-named-imports');
  });

  it('should ignore files outside src/', async () => {
    const eslint = createEslint();
    const results = await eslint.lintFiles(['src/invalid.ts']);
    const filePaths = results.map((r) => r.filePath);

    for (const filePath of filePaths) {
      expect(filePath).toContain('/src/');
    }
  });
});
