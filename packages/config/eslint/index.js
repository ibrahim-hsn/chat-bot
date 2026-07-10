// @ts-check
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";

/**
 * Shared flat ESLint configuration for the One2One monorepo.
 *
 * Type-aware rules are intentionally omitted: they require a project service
 * per package and are slower without adding much value for this codebase.
 * Formatting is delegated entirely to Prettier (see the `prettier` config,
 * which disables any stylistic rules that would conflict).
 */
export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/out/**",
      "**/coverage/**",
      "**/test-results/**",
      "**/playwright-report/**",
      "**/.turbo/**",
      "**/next-env.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
    },
  },
  // Browser + React code (the Next.js app).
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.serviceworker },
    },
    plugins: {
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "@next/next": nextPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // App Router has no `pages/` directory; this rule targets the Pages Router.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  // Node.js service code.
  {
    files: ["apps/server/**/*.ts", "packages/**/*.ts"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  // Test files may use dev globals.
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "**/e2e/**/*.ts"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  prettier,
);
