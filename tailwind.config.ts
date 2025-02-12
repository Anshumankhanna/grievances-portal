import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin"

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"background": "var(--background)",
				"foreground": "var(--foreground)",
				"primary-color": "var(--primary-color)",
				"secondary-color": "var(--secondary-color)",
				"tertiary-color": "var(--tertiary-color)",
				"panel-background": "#f1f5f9",
			},
			backgroundImage: {
				"custom-gradient": 'linear-gradient(to bottom, var(--primary-color) 10%, var(--secondary-color))',
			},
			animation: {
				'underline-grow': 'underline-grow 0.3s ease-out forwards', // Custom animation for the underline
			},
			keyframes: {
				'underline-grow': {
					'0%': {
						width: '0%',
					},
					'100%': {
						width: '100%',
					},
				},
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities, addComponents }) {
			addUtilities({
				".full": {
					"width": "100%",
					"height": "100%",
				},
				".absolute-center": {
					"position": "absolute",
					"top": "50%",
					"left": "50%",
					"transform": "translate(-50%, -50%)",
				},
				".glow": {
					
				}
			});
			addComponents({
				".darken": {
					"background-color": "transparent",
					"&:hover": {
						"background-color": "rgba(0, 0, 0, 0.15)",
					},
				},
			});
		})
	],
} satisfies Config;
