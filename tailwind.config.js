/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        default: '#C43882',
        primary: '#FFD5DF',
        secondary: '#FFEBF0'
      },
      colors: {
        default: '#C43882',
        primary: '#FFD5DF',
        secondary: '#FFEBF0',
        first: '#140808',
        second: '#52151C',
        third: '#D9BBA1',
        fourth: '#6A121E',
        fifth: '#FBF3EA',
        sixth: '#ECDACC'
      }
    }
  },
  plugins: []
}
