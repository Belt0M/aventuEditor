/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#D94B18',
				secondary: '#F29829',
				dark: '#1B1B1B',
				darkGray: '#A8A8A8',
				midGray: '#D9D9D9',
				yellow: '#F2BA52',
				green: '#748C1b',
				darkGreen: '#008c63',
				red: '#A6270A',
				blue: '#009CDE',
				darkBlue: '#3689d7',
				darkShadow: '#00000010',
			},
			boxShadow: {
				sidebarShadow: '0 5px 30px -6px rgba(0, 0, 0, 0.2)',
				storyShadow: '0px 5px 20px -2px rgba(0, 0, 0, 0.15)',
			},
			keyframes: {
				loaderBounce: {
					'0%, 20%, 50%, 80%, 100%': {
						transform: 'translateY(0)',
					},
					'40%': {
						transform: 'translateY(-60px)',
					},
					'60%': {
						transform: 'translateY(25px)',
					},
				},
				opacity: {
					'0%': {
						opacity: '0',
					},
					'20%': {
						opacity: '1',
					},
					'80%': {
						opacity: '1',
					},
					'100%': {
						opacity: '0',
					},
				},
			},
			animation: {
				loaderBounce: 'loaderBounce 1.1s ease infinite',
				opacity: 'opacity ease 3s',
			},
			screens: {
				'3xl': '2250px',
			},
		},
	},
	plugins: [],
}
