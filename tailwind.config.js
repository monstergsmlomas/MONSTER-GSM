/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#3DFF14',
        'neon-blue': '#1A5CFF',
        'dark': '#050505',
        'card': '#0d0d0d',
        'card-hover': '#111111',
        'border-dark': '#1a1a1a',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 10px #3DFF14, 0 0 30px #3DFF14, 0 0 60px rgba(61,255,20,0.4)',
        'neon-blue': '0 0 10px #1A5CFF, 0 0 30px #1A5CFF, 0 0 60px rgba(26,92,255,0.4)',
        'neon-green-sm': '0 0 6px #3DFF14, 0 0 15px rgba(61,255,20,0.5)',
        'neon-blue-sm': '0 0 6px #1A5CFF, 0 0 15px rgba(26,92,255,0.5)',
        'card-neon': '0 0 1px #3DFF14, 0 4px 24px rgba(61,255,20,0.08)',
      },
      animation: {
        'neon-pulse': 'neonPulse 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'scan-line': 'scanLine 6s linear infinite',
        'flicker': 'flicker 4s linear infinite',
        'glow-border': 'glowBorder 3s ease-in-out infinite',
      },
      keyframes: {
        neonPulse: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.85', filter: 'brightness(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.8' },
        },
        glowBorder: {
          '0%, 100%': { boxShadow: '0 0 8px #3DFF14, inset 0 0 8px rgba(61,255,20,0.05)' },
          '50%': { boxShadow: '0 0 20px #3DFF14, 0 0 40px rgba(61,255,20,0.3), inset 0 0 20px rgba(61,255,20,0.1)' },
        },
      },
    },
  },
  plugins: [],
};
