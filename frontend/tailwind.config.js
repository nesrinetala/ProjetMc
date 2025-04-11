/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <-- À placer ici (niveau racine)
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-icons/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideInUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}