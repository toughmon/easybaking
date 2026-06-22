/** @type {import('tailwindcss').Config} */
module.exports = {
  // All source dirs that may contain `className` strings.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  // NativeWind follows the system color scheme; `dark:` variants work out of the box.
  darkMode: 'media',
  theme: {
    extend: {
      // Baking-themed brand palette (warm caramel / amber tones).
      colors: {
        brand: {
          50: '#fdf6ec',
          100: '#f8e7c9',
          200: '#f0cf95',
          300: '#e7b35f',
          400: '#df9a37',
          500: '#c97e1f', // primary
          600: '#a96318',
          700: '#874b17',
          800: '#6e3d19',
          900: '#5c3318',
        },
        // Semantic tokens — reference these in components, not raw hex.
        surface: {
          DEFAULT: '#f9f9ff',
          light: '#ffffff',
          'light-elevated': '#f7f4ef',
          dark: '#15110c',
          'dark-elevated': '#221b12',
        },
        // Material Design 3 tokens.
        'primary': '#01261f',
        'primary-container': '#1a3c34',
        'on-primary': '#ffffff',
        'on-primary-container': '#83a69c',
        'primary-fixed-dim': '#aacec3',
        'secondary': '#5a5f62',
        'secondary-container': '#dce0e4',
        'on-secondary': '#ffffff',
        'on-surface': '#111c2c',
        'on-surface-variant': '#414846',
        'color-secondary': '#5a5f62',       // kept for backward compat
        'surface-container': '#e7eeff',
        'surface-container-high': '#dee8ff',
        'surface-container-highest': '#d8e3fa',
        'surface-container-low': '#f0f3ff',
        'surface-container-lowest': '#ffffff',
        'inverse-surface': '#263142',
        'inverse-primary': '#aacec3',
        'outline-variant': '#c1c8c4',
        'outline-muted': '#717976',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
