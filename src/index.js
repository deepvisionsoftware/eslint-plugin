export { defineConfig } from 'eslint/config';
import nodeConfig from './configs/node.js';
import vueConfig from './configs/vue.js';
import vueTemplatesConfig from './configs/vue-templates.js';

const plugin = {
  configs: {
    node: nodeConfig,
    vue: vueConfig,
    /**
     * .vue templates only — for projects that lint with Oxlint and format
     * with Oxfmt (`@deepvision/eslint-plugin/oxc`).
     */
    vueTemplates: vueTemplatesConfig,
  },
};

export default plugin;
