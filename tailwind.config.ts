import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand tokens — matches the CSS variables used in the HTML design
        bg:          '#09111f',
        surface:     '#0e1729',
        'surface-2': '#162035',
        'surface-3': '#1c2b44',
        accent:      '#06b6d4',
        blue:        '#3b82f6',
        green:       '#22c55e',
        amber:       '#f59e0b',
        purple:      '#a78bfa',
        'text-soft':  '#cbd5e1',
        'text-muted': '#8094aa',
      },
      fontFamily: {
        heading: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"Outfit"', 'sans-serif'],
        mono:    ['"Courier New"', 'monospace'],
      },
      fontSize: {
        'clamp-h1': 'clamp(36px, 5.5vw, 68px)',
        'clamp-h2': 'clamp(26px, 3.5vw, 44px)',
      },
      spacing: {
        'nav-h': '68px',
      },
      borderRadius: {
        card: '14px',
      },
      maxWidth: {
        site: '1140px',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        blink:   'blink 1.2s step-start infinite',
        'fade-up': 'fadeUp 0.4s ease both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
