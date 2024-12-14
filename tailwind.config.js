/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',   // Extra small screens start from 320px
      'sm': '550px',   // Small screens start from 550px
      'md': '768px',   // Medium screens start at original default sm breakpoint
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
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

