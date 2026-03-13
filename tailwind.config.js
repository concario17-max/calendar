/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                'elegant-gold': '#B8860B',
                'ray-dark': '#0A0A0A',
                'ray-light': '#FCFBF9',
                'warm-gray': {
                    50: '#F9F8F6',
                    100: '#F2F0ED',
                    200: '#E5E1DB',
                    300: '#D1C9BE',
                    400: '#A39684',
                    500: '#8E7F6A',
                    600: '#766653',
                    700: '#5D5041',
                    800: '#443B30',
                    900: '#2C261F',
                }
            },
            animation: {
                'fade-in': 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
                'subtle-zoom': 'subtle-zoom 20s ease-in-out infinite',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'subtle-zoom': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                }
            },
            fontFamily: {
                "display": ["'Pretendard Variable'", "Pretendard", "Inter", "system-ui", "sans-serif"],
                "serif": ["'Crimson Pro'", "'Noto Serif KR'", "Georgia", "serif"]
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
