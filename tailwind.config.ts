import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'steel-deep': '#172339',
        'steel-mid': '#1E283B',
        'brand-blue': '#1C63D8',
        'brand-blue-dim': '#1450B4',
        'solar-white': '#FFFFFF',
        'tech-black': '#000000',
      },
      fontFamily: {
        anton: ['Anton', 'Impact', 'sans-serif'],
        body: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
