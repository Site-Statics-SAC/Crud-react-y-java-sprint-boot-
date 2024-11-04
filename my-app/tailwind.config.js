/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      screens: {
        'mini': '50px',
        'minix': '350px',
        'minimo': '390px',
        
        
      }
    }
  },
  plugins: [],
}

