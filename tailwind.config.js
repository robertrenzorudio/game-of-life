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
        blue: { 1000: '#1d3557' },
      },
      animation: {
        boxGrow: 'boxGrow 0.2s ease-in-out',
      },
      keyframes: {
        boxGrow: {
          '0%': { transform: 'scale(0)', 'background-color': '#bfdbfe' },
          '20%': {
            transform: 'scale(0.6)',
            'background-color': '#93c5fd',
            'border-radius': '80%',
          },
          '40%': {
            transform: 'scale(1.2)',
            'background-color': '#3b82f6',
            'border-radius': '60%',
          },
          '60%': {
            transform: 'scale(1.4)',
            'background-color': '#2563eb',
            'border-radius': '40%',
          },
          '80%': {
            transform: 'scale(1.2)',
            'background-color': '#1d4ed8',
            'border-radius': '20%',
          },
          '100%': {
            transform: 'scale(1)',
            'background-color': '#1d3557',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
