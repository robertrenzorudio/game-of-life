module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      display: ['Source Serif Pro', 'Georgia', 'serif'],
      body: ['Synonym', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        red: { 1000: '#ff385c', 1100: '#d13760' },
      },
      animation: {
        boxGrow: 'boxGrow 0.2s ease-in-out',
      },
      keyframes: {
        boxGrow: {
          '0%': { transform: 'scale(0)', 'background-color': '#fee2e2' },
          '20%': {
            transform: 'scale(0.6)',
            'background-color': '#fecaca',
            'border-radius': '80%',
          },
          '40%': {
            transform: 'scale(1.2)',
            'background-color': '#fca5a5',
            'border-radius': '60%',
          },
          '60%': {
            transform: 'scale(1.4)',
            'background-color': '#f87171',
            'border-radius': '40%',
          },
          '80%': {
            transform: 'scale(1.2)',
            'background-color': '#ef4444',
            'border-radius': '20%',
          },
          '100%': {
            transform: 'scale(1)',
            'background-color': '#ff385c',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
