# DeepVision ESLint Configs

This package provides ready-to-use ESLint configs for both backend (Node.js) and frontend (Vue.js) projects.

## Features

- **All-in-one solution**: No need to install ESLint or any plugins separately - everything is included
- **TypeScript support**: Built-in TypeScript linting with typescript-eslint
- **Stylistic rules**: Consistent code formatting with @stylistic/eslint-plugin
- **Vue.js support**: Complete Vue 3 linting configuration
- **Node.js support**: Optimized rules for backend Node.js projects
- **ESLint 9+ compatible**: Uses the new flat config format
- **Oxlint + Oxfmt presets**: The same rules for Oxlint and Oxfmt (`@deepvision/eslint-plugin/oxc`), plus a .vue-templates-only ESLint config

## Installation

```bash
npm install --save-dev @deepvision/eslint-plugin
```

This package includes all necessary dependencies. No additional installation of `eslint`, `typescript-eslint`, `eslint-plugin-vue`, or any other ESLint-related packages is required.

## Usage

Create an `eslint.config.js` file in your project root and import the appropriate configuration.
> For CommonJS projects use `eslint.config.mjs`, to suppress warning `Module type of eslint.config.js is not specified`

### Backend / Node.js Projects

For backend Node.js projects (NestJS, Express, etc.):

```js
import deepEslint, { defineConfig } from '@deepvision/eslint-plugin';

export default defineConfig([
  deepEslint.configs.node,
]);
```

### Frontend / Vue.js Projects

For frontend Vue.js projects:

```js
import deepEslint, { defineConfig } from '@deepvision/eslint-plugin';

export default defineConfig([
  deepEslint.configs.vue,
]);
```

### Oxlint + Oxfmt (Vite+)

The same presets, for projects that lint with [Oxlint](https://oxc.rs/docs/guide/usage/linter) and format with [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) — for example through [Vite+](https://viteplus.dev) (`vp lint`, `vp fmt`). Oxlint is roughly 50–100× faster than ESLint on the same rules.

- `oxlint()` — every JS/TS rule of the `node` and `vue` presets, rule for rule (a test compares it to the ESLint presets' effective config).
- `oxfmt` — the formatting half of the presets (@stylistic) as a Prettier-compatible formatter config, `printWidth: 120`.
- `configs.vueTemplates` — the one thing Oxlint cannot do yet: Vue **template** rules (eslint-plugin-vue) and `no-unused-vars` in `<script setup>`. ESLint lints `.vue` files only, with the layout rules switched off so they do not fight Oxfmt.

`vite.config.ts`:

```ts
import { oxfmt, oxlint } from '@deepvision/eslint-plugin/oxc';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  // Monorepo: say which globs are `node` and which are `vue`.
  lint: oxlint({
    node: ['apps/api/**'],
    vue: ['apps/app/**', 'libs/ui/**'],
    // Project overrides go after the preset's own.
    overrides: [
      { files: ['apps/api/**'], rules: { 'typescript/no-non-null-assertion': 'off' } },
    ],
  }),
  fmt: oxfmt,
});
```

A single Vue app is `oxlint({ vue: ['**'] })`. Without Vite+, write the same objects to `.oxlintrc.json` / `.oxfmtrc.json`.

`eslint.config.js` of a package with `.vue` files:

```js
import deepEslint, { defineConfig } from '@deepvision/eslint-plugin';

export default defineConfig([
  deepEslint.configs.vueTemplates,
]);
```

```json
{
  "scripts": {
    "lint": "vp lint --fix src && eslint src --fix && vp fmt src"
  }
}
```

Rule names in Oxlint: `typescript/*` for `@typescript-eslint/*`, and the typescript-eslint extension rules keep their core name (`no-unused-vars`).

Not covered by the Oxc presets:
- `@stylistic/padding-line-between-statements` (blank line before `return`): Oxfmt keeps blank lines but never adds one, and Oxlint has no such rule.
- The `vue` preset's ignore of `src/graphql/**/*.ts`: add it to `ignorePatterns` yourself.

### package.json Scripts

Add linting scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

## What's Included

This package includes all necessary dependencies:

- `eslint` - The core ESLint linter
- `@eslint/js` - ESLint's recommended JavaScript rules
- `typescript-eslint` - TypeScript support for ESLint
- `@stylistic/eslint-plugin` - Stylistic formatting rules
- `eslint-plugin-vue` - Vue.js linting rules

You don't need to install any of these separately!

## Running ESLint

After setup, you can run ESLint using:

```bash
# Check for linting errors
npm run lint

# Automatically fix issues
npm run lint:fix
```

## License

MIT
