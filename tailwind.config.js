module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bgMain: "#F6F6F8",
        darkMain: "#262626",
        darkBg: "#313131",
      },
      height: {
        main: "calc(100vh - 4rem)",
        ana: "50rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
