/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#1e1e1e',
        bg2: '#141414',
        bgDeep: '#0d0d0d',
        // Accent set to match the live salvium.io teal-green (#00BFA5),
        // which is also the base color of the brand-spec border rgba(0, 191, 165, _).
        teal: '#00BFA5',
        tealLight: '#80cbc4',    // brand light accent
        accent: '#40E0D0',       // brand primary accent (kept available)
        neon: '#0AEB85',         // Salvium green dot (sacred, used only on the logo dot)
        mute: '#b0b0b0',         // brand lighter text
        body: '#e0e0e0',         // brand primary text
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(64,224,208,0.5)' },
          '50%': { boxShadow: '0 0 24px 6px rgba(10,235,133,0.5)' },
        },
        flow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        flow: 'flow 6s linear infinite',
        fadeUp: 'fadeUp 0.8s ease-out both',
        scan: 'scan 8s linear infinite',
      },
    },
  },
  plugins: [],
}
