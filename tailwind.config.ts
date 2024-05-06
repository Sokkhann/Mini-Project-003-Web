import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";


const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    // for flowbite component
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    flowbite.content(),

    // for next ui component
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    // for flowbite component
    require("flowbite/plugin"),
    flowbite.plugin(),

    // for next ui
    nextui(),

    // for daisy ui
    // require('daisyui'),
  ],
};
export default config;
