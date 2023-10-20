import type { Config } from 'tailwindcss'

const {nextui} = require("@nextui-org/react");

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#1B79E5',
        'dark-100': '#151515',
        'dark-200': '#141414',
        'dark-300': '#161616',
      },
      dropShadow: {
        'custom': [
            '0 2px 2px rgba(0, 0, 0, 0.01)',
            '0 5px 5px rgba(0, 0, 0, 0.01)'
        ]
      }
    },
  },
  plugins: [nextui()],
}
export default config
