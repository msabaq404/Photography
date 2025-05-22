/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#d0b8ac',
				secondary: '#3E1F1A', 
			},
			screens: {
				'xsm': '520px',
			}
		},
	},
	plugins: [],
}
