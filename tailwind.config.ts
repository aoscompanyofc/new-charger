import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'steel-deep': '#172339',
        'steel-mid': '#1E283B',
        'brand-blue': '#2B7EFF',
        'brand-blue-dim': '#1A66E0',
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
