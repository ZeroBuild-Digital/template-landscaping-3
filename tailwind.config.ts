import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--color-brand)",
        "brand-dark": "var(--color-brand-dark)",
        "brand-secondary": "var(--color-brand-secondary)",
        "brand-accent": "var(--color-brand-accent)",
        "brand-accent-bright": "var(--color-brand-accent-bright)",
        charcoal: "var(--color-text)",
        "surface-light": "var(--color-surface-light)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
