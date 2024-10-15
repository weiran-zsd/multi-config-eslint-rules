import globals from "globals";
import pluginN from 'eslint-plugin-n'
import pluginJs from "@eslint/js";
import { config } from "@weiran.zsd/multi-eslint-rule-config";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...pluginN.configs["flat/mixed-esm-and-cjs"],
  config([
    {
      rule: "no-restricted-imports",
      ruleConfig: ["error", { paths: ["lodash", "underscore"] }],
    },
    {
      rule: "no-restricted-imports",
      asRuleName: "no-lodash",
      ruleConfig: ["error", { paths: ["lodash", "underscore"] }],
    }]),
];
