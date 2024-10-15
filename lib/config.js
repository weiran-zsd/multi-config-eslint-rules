/**
 * @fileoverview 允许多次配置某条规则，而不是覆盖
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const builtinRules = require("eslint/use-at-your-own-risk").builtinRules;
const pkg = require("../package.json");

exports.config = function config(options, prefix = "@@") {
  const config = {
    name: pkg.name,
    plugins: {
      [prefix]: {
        meta: { name: pkg.name, version: pkg.version },
        rules: {},
      },
    },
    rules: {},
  };

  options = Array.isArray(options) ? options : [options];

  options.forEach((item) => {
    const rule =
      typeof item.rule === "string"
        ? (item.plugin?.rules[item.rule] ?? builtinRules.get(item.rule))
        : item.rule;
    if (!rule) {
      throw new Error(
        "Unexpected rule - you may be misspelling the rule name.",
      );
    }
    if (typeof item.rule === "string") {
      item.asRuleName = item.asRuleName ?? item.rule;
    }

    if (typeof item.asRuleName !== "string") {
      throw new Error(`Unexpected asRuleName: ${item.asRuleName}`);
    }

    config.plugins[prefix].rules[item.asRuleName] = rule;
    config.rules[`${prefix}/${item.asRuleName}`] = item.ruleConfig;
  });

  return config;
};
