/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background
        background: '#0F0E13',  // Ebony Night
        // Text
        text: '#F9F9F9',        // Pearl White
        // Primary surfaces (cards, navbar)
        primary: '#2C3243',     // Storm Blue
        // Secondary surfaces (panels, inputs)
        secondary: '#424753',   // Graphite Gray
        // Accent / CTA
        accent: '#FF6E6C',      // Vivid Coral
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
  plugins: [],
}

