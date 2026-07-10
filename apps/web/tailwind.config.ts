import type { Config } from "tailwindcss";

/**
 * Design tokens. Color values live as CSS variables in `globals.css` (one
 * source of truth); Tailwind references them so utilities and raw CSS stay in
 * sync. Radii and durations follow the spec: rounded but not pill-everything,
 * and short 120–180ms transitions.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          strong: "var(--color-primary-strong)",
          soft: "var(--color-primary-soft)",
        },
        page: "var(--color-page)",
        surface: {
          DEFAULT: "var(--color-surface)",
          muted: "var(--color-surface-muted)",
        },
        line: "var(--color-border)",
        ink: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      borderColor: {
        DEFAULT: "var(--color-border)",
      },
      ringColor: {
        DEFAULT: "var(--color-primary)",
      },
      borderRadius: {
        card: "16px",
        input: "18px",
        composer: "22px",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
      boxShadow: {
        card: "0 1px 2px rgba(23, 48, 66, 0.06)",
        pop: "0 8px 30px rgba(23, 48, 66, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
