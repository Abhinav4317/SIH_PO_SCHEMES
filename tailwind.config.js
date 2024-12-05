/** @type {import('tailwindcss').Config} */
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
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
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF9839",
        secondary: "#FFF4D5",
        tertiary: "#E6DCC0",
      },
    },
  },
  plugins: [addVariablesForColors],
};
