/**
 * @fileoverview Allow multiple configurations of a rule without overriding it.
 * @author
 * 唯然<weiran.zsd@outlook.com>
 */

declare module "@weiran.zsd/multi-eslint-rule-config" {
  import { Linter, Rule } from "eslint";

  interface RuleOptions {
    rule: string | Rule.RuleModule;
    ruleConfig: Linter.RuleEntry;
    asRuleName?: string;
    plugin?: {
      rules: Record<string, Rule.RuleModule>;
    };
  }

  interface ConfigOptions {
    name: string;
    plugins: {
      [prefix: string]: {
        meta: {
          name: string;
          version: string;
        };
        rules: Record<string, Rule.RuleModule>;
      };
    };
    rules: Record<string, Linter.RuleEntry>;
  }

  /**
   * Generates a configuration object for ESLint with multiple rule configurations.
   *
   * @param options - Array or single item containing rule options to configure.
   * @param prefix - Optional prefix to use for the plugin (default is "@@").
   * @returns The generated configuration object.
   */
  export function config(
    options: RuleOptions | RuleOptions[],
    prefix?: string,
  ): ConfigOptions;
}
