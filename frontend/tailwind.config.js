/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans-condensed": ["Encode Sans Condensed", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
      colors: {
        lightBlue: "#0BC4DF",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }

        "sw-1400": "1400px",
        "sw-1250": "1250px",
        "sw-480": "480px",
        "sw-360": "360px",
        "sw-900": "900px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
