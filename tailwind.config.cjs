/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

	theme: {
    extend: {
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        roman: 'upper-roman',
      },
      spacing: {
        '14': '3.5rem',
        '50': '12.5rem'
      },
      colors: {
        'dark-gray': '#333',
        'mid-gray': '#555',
        'light-gray': '#a7adba',
        'border-color': '#ff6347',
        'blue-border': '#69c'
      },
      fontFamily: {
        'body': ['Rockwell', 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', "serif"]
      },
      fontSize: {
        'body': '1.5rem',
      },
      lineHeight: {
        'body': 1.5,
      },
      maxWidth: {
        'custom': '50em'
      },
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: theme('colors.gray.300', 'currentColor'),
        'primary': '#ff6347',
        'secondary': '#69c',
      }),
    },
  },
	plugins: [],
}

