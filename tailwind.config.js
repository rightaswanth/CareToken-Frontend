/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo 600
          dark: '#4338CA',    // Indigo 700
          light: '#818CF8',   // Indigo 400
        },
        secondary: {
          DEFAULT: '#F43F5E', // Rose 500
          dark: '#E11D48',    // Rose 600
        },
        background: '#F8FAFC', // Slate 50
        surface: '#FFFFFF',    // White
        text: {
          main: '#0F172A',     // Slate 900
          muted: '#64748B',    // Slate 500
          light: '#94A3B8',    // Slate 400
        },
        border: {
          DEFAULT: '#E2E8F0',  // Slate 200
          focus: '#4F46E5',    // Indigo 600
        },
        success: '#10B981',    // Emerald 500
        warning: '#F59E0B',    // Amber 500
        error: '#EF4444',      // Red 500
        info: '#3B82F6',       // Blue 500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
