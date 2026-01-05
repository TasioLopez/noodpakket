/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Modern Government/Informational Hub Palette
        // Primary: Deep authoritative blue (trust, professionalism)
        primary: {
          50: '#E6F2F8',
          100: '#CCE5F1',
          200: '#99CBE3',
          300: '#66B1D5',
          400: '#3397C7',
          500: '#0A4A6B', // Main primary - Deep authoritative blue
          600: '#083B56',
          700: '#062C41',
          800: '#041E2B',
          900: '#020F16',
        },
        // Accent: Vibrant orange (action, urgency, attention)
        accent: {
          50: '#FFF4ED',
          100: '#FFE9DB',
          200: '#FFD3B7',
          300: '#FFBD93',
          400: '#FFA76F',
          500: '#FF6B35', // Main accent - Vibrant orange
          600: '#CC5629',
          700: '#99401F',
          800: '#662B14',
          900: '#33150A',
        },
        // Success: Trust green (safety, completion)
        success: {
          50: '#E8F5ED',
          100: '#D1EBDC',
          200: '#A3D7B9',
          300: '#75C396',
          400: '#47AF73',
          500: '#2D8659', // Trust green
          600: '#246B47',
          700: '#1B5035',
          800: '#123624',
          900: '#091B12',
        },
        // Neutral: Clean grays for text and backgrounds
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        // System fonts for performance and native feel
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        // Display: Bold system font for headings
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'large': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'accent': '0 4px 16px rgba(255, 107, 53, 0.2)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
