# @weiran.zsd/multi-eslint-rule-config

## Why?

This plugin allows you to configure the same ESLint rule multiple times, which is not possible with the default ESLint behavior. Normally, when the same rule (e.g., [`no-restricted-imports`](https://eslint.org/docs/latest/rules/no-restricted-imports)) is configured more than once, the latter configuration overwrites the previous one. With this plugin, you can apply multiple configurations for the same rule, offering greater flexibility in defining your ESLint settings. This can be particularly useful for different scenarios or environments that require specific rule adjustments without overriding previous configurations.

## Usage

> **Important:** This plugin requires ESLint v8.57.1 or higher and you must be using the [new configuration system(aka `eslint.config.js`)](https://eslint.org/docs/latest/use/configure/configuration-files).

```bash
$ npm i @weiran.zsd/multi-eslint-rule-config -D

$ yarn add @weiran.zsd/multi-eslint-rule-config -D

$ pnpm add @weiran.zsd/multi-eslint-rule-config -D
```

### 1. eslint builtin rules

```js
import { config } from "@weiran.zsd/multi-eslint-rule-config";

export default [
  config({
    rule: "no-restricted-imports",
    ruleConfig: ["error", { paths: ["lodash", "underscore"] }],
  }),
];
```

### 2. config more times:

```js
import { config } from "@weiran.zsd/multi-eslint-rule-config";

export default [
  config([
    {
      rule: "no-restricted-imports",
      asRuleName: "no-lodash",
      ruleConfig: ["error", { paths: ["lodash", "underscore"] }],
    },
    {
      rule: "no-restricted-imports",
      asRuleName: "prefer-preact",
      ruleConfig: ["error", { paths: ["react"] }],
    },
  ]),
];
```

## 3. 3rd-party plugins

```js
import { config } from "@weiran.zsd/multi-eslint-rule-config";
import awesomePlugin from "eslint-plugin-awesome-plugin"; // replace with your plugin name and rule name

export default [
  config({
    rule: awesomePlugin.rules["awesome-rule"],
    asRuleName: "awesome-rule",
    ruleConfig: ["error"],
  }),
];
```

## License

MIT
