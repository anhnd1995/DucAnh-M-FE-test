import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const gray = {
  0: "var(--gray-0)",
  100: "var(--gray-100)",
  200: "var(--gray-200)",
  300: "var(--gray-300)",
  400: "var(--gray-400)",
  500: "var(--gray-500)",
  600: "var(--gray-600)",
  700: "var(--gray-700)",
  800: "var(--gray-800)",
  850: "var(--gray-850)",
  900: "var(--gray-900)",
  1000: "var(--gray-1000)",
  1100: "var(--gray-1100)",
};

const colorSystem = {
  "color-brands": "var(--color-brands)",
  "neutral-bg": "var(--neutral-bg)",
  "dark-neutral-bg": "var(--dark-neutral-bg)",
  "dark-neutral-border": "var(--dark-neutral-border)",
  "gray-dark-0": "var(--dark-gray-0)",
  "gray-dark-100": "var(--dark-gray-100)",
  "gray-dark-200": "var(--dark-gray-200)",
  "gray-dark-300": "var(--dark-gray-300)",
  "gray-dark-400": "var(--dark-gray-400)",
  "gray-dark-500": "var(--dark-gray-500)",
  "gray-dark-600": "var(--dark-gray-600)",
  "gray-dark-700": "var(--dark-gray-700)",
  "gray-dark-800": "var(--dark-gray-800)",
  "gray-dark-850": "var(--dark-gray-850)",
  "gray-dark-900": "var(--dark-gray-900)",
  "gray-dark-1000": "var(--dark-gray-1000)",
  "gray-dark-1100": "var(--dark-gray-1100)",
};

const colorAccent = {
  blue: "var(--blue-accent)",
  green: "var(--green-accent)",
  violet: "var(--violet-accent)",
  orange: "var(--orange-accent)",
  yellow: "var(--yellow-accent)",
  indigo: "var(--indigo-accent)",
  emerald: "var(--emerald-accent)",
  fuchsia: "var(--fuchsia-accent)",
  red: "var(--red-accent)",
  sky: "var(--sky-accent)",
  pink: "var(--pink-accent)",
  neutral: "var(--neutral-accent)",
};

const config: Config = {
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screen: {
        xs: "500px",
      },
      backgroundImage: {},
      backgroundSize: {},
      colors: {
        gray,
        ...colorAccent,
        ...colorSystem,
      },

      fontFamily: {
        inter: "Inter",
      },
      keyframes: {},
      animation: {},
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [daisyui],
};
export default config;
