/**
 * @fileoverview 允许多次配置某条规则，而不是覆盖
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { config } = require("./config.js");

test("no-debugger", () => {
  const configs = config({
    rule: "no-debugger",
    ruleConfig: ["error"],
  });

  assert(configs.plugins["@@"]);
  assert(configs.plugins["@@"].rules["no-debugger"].meta);
  assert(configs.plugins["@@"].rules["no-debugger"].create);

  assert(configs.rules);
  assert.ok(Array.isArray(configs.rules["@@/no-debugger"]));
  assert.equal(configs.rules["@@/no-debugger"].length, 1);
  assert.equal(configs.rules["@@/no-debugger"][0], "error");
});

test("no-debugger (multi-config)", () => {
  const configs = config([
    {
      rule: "no-debugger",
      asRuleName: "no-debugger1",
      ruleConfig: ["error"],
    },
    {
      rule: "no-debugger",
      asRuleName: "no-debugger2",
      ruleConfig: ["warn"],
    },
  ]);

  assert(configs.plugins["@@"]);
  assert(configs.plugins["@@"].rules["no-debugger1"].meta);
  assert(configs.plugins["@@"].rules["no-debugger1"].create);
  assert(configs.plugins["@@"].rules["no-debugger2"].meta);
  assert(configs.plugins["@@"].rules["no-debugger2"].create);

  assert(configs.rules);
  assert.equal(configs.rules["@@/no-debugger1"][0], "error");
  assert.equal(configs.rules["@@/no-debugger2"][0], "warn");
});

test("n/callback-return", () => {
  // eslint-disable-next-line n/no-unpublished-require -- only used in tests
  const pluginN = require("eslint-plugin-n");
  const configs = config([
    {
      rule: pluginN.rules["callback-return"],
      asRuleName: "callback-return",
      ruleConfig: ["error"],
    },
  ]);

  assert(configs.plugins["@@"]);
  assert(configs.plugins["@@"].rules["callback-return"].meta);
  assert(configs.plugins["@@"].rules["callback-return"].create);

  assert(configs.rules);
  assert.equal(configs.rules["@@/callback-return"][0], "error");
});
