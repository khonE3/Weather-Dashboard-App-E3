import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                mountain: {
                    sky:    '#05070d',
                    peak:   '#0e1e32',
                    mid:    '#0b1828',
                    near:   '#091220',
                    ground: '#070d18',
                },
                accent: {
                    blue:  '#4f8ef7',
                    sky:   '#38bdf8',
                    amber: '#f59e0b',
                },
            },
            fontFamily: {
                sans:  ['Inter', 'Sarabun', 'sans-serif'],
                thai:  ['Sarabun', 'sans-serif'],
            },
            animation: {
                'fade-in':  'fadeIn  0.35s ease both',
                'fade-up':  'fadeUp  0.45s ease both',
                'slide-up': 'fadeUp  0.5s  ease both',
                'spin':     'spin    1s linear infinite',
                // Dog mascot
                'wag-ear-left':  'wagEarLeft  0.4s ease-in-out infinite',
                'wag-ear-right': 'wagEarRight 0.4s ease-in-out infinite',
                'wag-tail':      'wagTail     0.18s ease-in-out infinite',
                'blush-pulse':   'blushPulse  0.6s ease-in-out infinite alternate',
                // Rain
                'rain': 'rain 0.7s linear infinite',
            },
            keyframes: {
                fadeIn:       { from: { opacity: '0' },                          to: { opacity: '1' } },
                fadeUp:       { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
                wagEarLeft:   { '0%,100%': { transform: 'rotate(0)' },           '50%': { transform: 'rotate(-8deg) translateY(-2px)' } },
                wagEarRight:  { '0%,100%': { transform: 'rotate(0)' },           '50%': { transform: 'rotate(8deg) translateY(-2px)' } },
                wagTail:      { '0%,100%': { transform: 'rotate(-10deg)' },      '50%': { transform: 'rotate(14deg)' } },
                blushPulse:   { from: { opacity: '.55' },                        to:   { opacity: '.9' } },
                rain:         { from: { transform: 'translateY(-30px)', opacity: '0' }, '10%': { opacity: '1' }, '90%': { opacity: '1' }, to: { transform: 'translateY(100vh)', opacity: '0' } },
                spin:         { from: { transform: 'rotate(0deg)' },             to: { transform: 'rotate(360deg)' } },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

export default config;
