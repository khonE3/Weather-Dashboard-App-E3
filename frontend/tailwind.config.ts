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
                // Isan Theme - Nong Bua Lam Phu Colors
                isan: {
                    forest: '#2D5016',      // เขียวป่า
                    earth: '#8B4513',       // น้ำตาลดิน
                    gold: '#DAA520',        // ทอง
                    brick: '#CD5C5C',       // ส้มอิฐ
                    rice: '#F5F5DC',        // สีข้าว
                    sky: '#87CEEB',         // ฟ้า
                    sunset: '#FF6B35',      // พระอาทิตย์ตก
                    night: '#1a1a2e',       // กลางคืน
                },
            },
            fontFamily: {
                thai: ['Sarabun', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'sway': 'sway 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'rain': 'rain 1s linear infinite',
                'wag': 'wag 0.5s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                sway: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                rain: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
                wag: {
                    '0%, 100%': { transform: 'rotate(-10deg)' },
                    '50%': { transform: 'rotate(10deg)' },
                },
            },
            backgroundImage: {
                'isan-pattern': "url('/patterns/khit.svg')",
                'gradient-warm': 'linear-gradient(135deg, #FF6B35 0%, #DAA520 100%)',
                'gradient-cool': 'linear-gradient(135deg, #2D5016 0%, #87CEEB 100%)',
            },
        },
    },
    plugins: [],
};

export default config;
