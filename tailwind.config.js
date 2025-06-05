const withMT = require("@material-tailwind/react/utils/withMT");
const defaultColors = require('tailwindcss/colors'); // Importa la paleta de colors per defecte de Tailwind

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  // Activa el mode “class” perquè Tailwind escolti la classe `dark` a l’html
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1150px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      // Comencem amb els colors bàsics que Tailwind necessita
      transparent: defaultColors.transparent,
      current: defaultColors.current,
      white: "#ffffff", // Pots usar el teu #ffffff o el de Tailwind
      black: "#000000", // Pots usar el teu #000000 o el de Tailwind
      blue: '#0066FF',
      lightblue: "#d9e8ff",
      darkpurple: "#241A24",
      lightgrey: "#F4F5F6", // Tailwind té 'gray', aquest és diferent
      navyblue: "#00224A",
      darkblue: "#1E013A", // Diferent del 'blue' de Tailwind
      offwhite: "rgba(255, 255, 255, 0.75)",
      lightblack: "rgba(0, 0, 0, 0.55)",
      bluish: "rgba(14, 13, 13, 0.75)",
      testColor: "rgba(54, 54, 54, 0.75)",
      faqblue: "#0861FF", // El teu color personalitzat
      gold: "#FAAF38",    // El teu color personalitzat (Tailwind té 'amber' o 'yellow' per a daurats)
      hoblue: "#0000FF",
      btnblue: "#267dff",
      bggrey: "#DDDDDD",
      footer: "rgba(226, 223, 223, 0.75)",
      linegrey: "#C4C4C4",

      // Definició explícita de les tonalitats de les paletes de Tailwind que necessites:
      // Pots trobar els valors HEX a la documentació de Tailwind CSS
      slate: {
        100: '#f1f5f9', // per a hover:bg-slate-100
        300: '#cbd5e1', // per a dark:text-slate-300
        700: '#334155', // per a text-slate-700
        800: '#1e293b', // per a dark:bg-slate-800
        // Afegeix altres tonalitats de slate si les utilitzes
      },
      sky: {
        400: '#38bdf8', // per a border-sky-400 (i text-sky-400 si no especifiques tonalitat)
        500: '#0ea5e9', // per a to-sky-500 (si és el que vols per "bg-sky" base)
        600: '#0284c7', // per a bg-sky-600, text-sky-600
        700: '#0369a1', // per a dark:bg-sky-700
        // Afegeix altres tonalitats de sky si les utilitzes
      },
      teal: {
        400: '#2dd4bf', // per a from-teal-400
        500: '#14b8a6', // per a bg-teal-500
        600: '#0d9488', // per a hover:bg-teal-600
        // Afegeix altres tonalitats de teal si les utilitzes
      },
      blue: { // Paleta per a blue-500, blue-600 que utilitzaves als degradats
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8', // per a dark:from-blue-700 (si el tenies)
        // Afegeix altres tonalitats de blue si les utilitzes
      },
      purple: { // Paleta per a purple-600, purple-700 que utilitzaves als degradats
        600: '#9333ea',
        700: '#7e22ce', // per a dark:to-purple-700 (si el tenies)
        // Afegeix altres tonalitats de purple si les utilitzes
      },
      pink: { // Paleta per a pink-500
        500: '#ec4899',
        // Afegeix altres tonalitats de pink si les utilitzes
      },
      red: { // Paleta per a red-500
        500: '#ef4444',
        // Afegeix altres tonalitats de red si les utilitzes
      },
      yellow: { // Paleta per a yellow-500
        500: '#eab308',
        // Afegeix altres tonalitats de yellow si les utilitzes
      },
      green: { // Paleta per a green-100, green-400
        100: '#dcfce7',
        400: '#4ade80',
        // Afegeix altres tonalitats de green si les utilitzes
      },
      gray: { // Paleta per a gray-200 (i altres grisos si els necessites)
        100: '#f3f4f6', // Per a hover:bg-gray-100 (si aquest era el color que volies amb hover:bg-slate-100)
        200: '#e5e7eb', // Per a hover:bg-gray-200
        // ... altres tonalitats de gray ...
        800: '#1f2937',
        900: '#11182c', // Per a bg-gray-900
      },

    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
      "65xl": ["65px", { lineHeight: "1" }],
      "80xl": ["80px", { lineHeight: "6rem" }],
    },
    extend: {},
  },
  plugins: [],
});
