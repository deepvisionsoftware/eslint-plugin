# DeepVision ESLint Configs

This package provides ready-to-use ESLint configs for both backend (Node.js) and frontend (Vue.js) projects.

## Features

- **All-in-one solution**: No need to install ESLint or any plugins separately - everything is included
- **TypeScript support**: Built-in TypeScript linting with typescript-eslint
- **Stylistic rules**: Consistent code formatting with @stylistic/eslint-plugin
- **Vue.js support**: Complete Vue 3 linting configuration
- **Node.js support**: Optimized rules for backend Node.js projects
- **ESLint 9+ compatible**: Uses the new flat config format

## Installation

```bash
npm install --save-dev @deepvision/eslint-plugin@rc
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
