/** @type {import('tailwindcss').Config} */
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import flowbitePlugin from "flowbite/plugin";
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF9839",
        secondary: "#FFF4D5",
        tertiary: "#E6DCC0",
      },
      fontFamily: {
        english: ["Roboto", "sans-serif"], // Replace with your English font
        hindi: ['"Noto Sans Devanagari"', "sans-serif"],
        tamil: ['"Noto Sans Tamil"', "sans-serif"],
      },
    },
  },
  plugins: [addVariablesForColors, flowbitePlugin],
};
