/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#f8f9fa', // Soft off-white
        foreground: '#334155', // Soft slate text
        card: {
          DEFAULT: 'rgba(0, 0, 0, 0.02)',
          hover: 'rgba(0, 0, 0, 0.04)',
          border: 'rgba(0, 0, 0, 0.06)',
        },
        primary: {
          DEFAULT: '#39FF14', // neon green
          hover: '#00FF00',
          light: '#03ff00',
        },
        accent: {
          DEFAULT: '#03ff00', // neon blend
        },
        success: {
          DEFAULT: '#10b981', // soft emerald
          bg: 'rgba(16, 185, 129, 0.1)',
        },
        warning: {
          DEFAULT: '#f59e0b', // warm amber
          bg: 'rgba(245, 158, 11, 0.1)',
        },
        danger: {
          DEFAULT: '#ef4444', // soft red
          bg: 'rgba(239, 68, 68, 0.1)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
