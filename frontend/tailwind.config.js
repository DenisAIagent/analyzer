/**
 * Ajout des animations Tailwind dans le fichier de configuration
 */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff3e33",
        secondary: "#1e1e1e",
        background: "#121212",
        card: "#1e1e1e",
        border: "#333333",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        countUp: {
          '0%': { opacity: '0.3', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideInUp: 'slideInUp 0.5s ease-out',
        slideInRight: 'slideInRight 0.6s ease-out',
        slideInLeft: 'slideInLeft 0.4s ease-out',
        pulse: 'pulse 2s infinite',
        countUp: 'countUp 1.5s ease-out',
        wave: 'wave 3s ease-in-out infinite',
        shine: 'shine 1.5s infinite',
      },
    },
  },
  plugins: [],
}
