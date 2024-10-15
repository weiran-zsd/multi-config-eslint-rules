import globals from "globals";
import pluginN from 'eslint-plugin-n'
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...pluginN.configs["flat/mixed-esm-and-cjs"],
];
