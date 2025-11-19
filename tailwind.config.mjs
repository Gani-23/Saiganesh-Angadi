export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system"],
      },
      colors: {
        taohe: {
          50: "#f7fbfc",
          100: "#eef6fb",
          200: "#d5eef9",
          300: "#b5e0f2",
          400: "#7acbe6",
          500: "#48b8db",
          600: "#2d98c0",
          700: "#21718f",
          800: "#164f62",
          900: "#0b2b36",
        },
      },
      boxShadow: {
        "taohe-soft": "0 10px 50px rgba(6,10,20,0.42)",
      },
    },
  },
};
