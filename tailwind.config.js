/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        moveArrow: 'moveArrow 1s infinite ease-in-out',
      },
     
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        clipPath: {
          wave: 'polygon(7% 78%, 100% 95%, 100% 0, 7% 5%)',
        },
        moveArrow: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}

