export { defineConfig } from 'eslint/config';
import nodeConfig from './configs/node.js';
import vueConfig from './configs/vue.js';

const plugin = {
  configs: {
    node: nodeConfig,
    vue: vueConfig,
  },
}

export default plugin;
