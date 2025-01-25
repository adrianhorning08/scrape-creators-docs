/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-light": "rgb(var(--primary-light) / <alpha-value>)",
        "primary-dark": "rgb(var(--primary-dark) / <alpha-value>)",
        "background-light": "rgb(var(--background-light) / <alpha-value>)",
        "background-dark": "rgb(var(--background-dark) / <alpha-value>)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
