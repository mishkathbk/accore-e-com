/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF9F3',
        paper: '#FFFFFF',
        ink: '#2D2B3A',
        muted: '#8C8799',
        line: '#EFEAE2',
        hairline: '#F5F0E8',
        brand: {
          coral: '#FF8A7A',
          coralDark: '#EB6D5E',
          blush: '#FFE4DC',
          peach: '#FFDAC9',
          peachSoft: '#FFF1E8',
          yellow: '#FFD166',
          butter: '#FFF4D1',
          mint: '#B8E0D2',
          mintSoft: '#E4F2EC',
          sky: '#CBE6F5',
          skySoft: '#EAF4FB',
          lavender: '#E0D6F2',
          lavenderSoft: '#F1ECF8',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(45, 43, 58, 0.04), 0 12px 32px rgba(45, 43, 58, 0.05)',
        card: '0 8px 30px rgba(45, 43, 58, 0.07)',
        cardHover: '0 16px 40px rgba(45, 43, 58, 0.1)',
        lift: '0 20px 40px -20px rgba(255, 138, 122, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        blob: '42% 58% 58% 42% / 50% 50% 50% 50%',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp .5s ease-out both',
      },
    },
  },
  plugins: [],
}
