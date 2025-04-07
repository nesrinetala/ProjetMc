/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <-- À placer ici (niveau racine)
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajoutez tous les fichiers JS/JSX/TS/TSX dans le dossier src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}