/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0d14',
          card: '#121826',
          border: '#1f293d',
          accent: '#00f0ff',
          neon: '#7928ca',
          glow: '#ff007f',
          gold: '#ffb703',
          emerald: '#10b981',
          text: '#f1f5f9',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'monospace', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.4))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 16px rgba(0, 240, 255, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
