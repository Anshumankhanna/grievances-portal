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
				background: "var(--background)",
				foreground: "var(--foreground)",
				"primary-color": "var(--primary-color)",
				"secondary-color": "var(--secondary-color)",
				"tertiary-color": "var(--tertiary-color)"
			},
			backgroundImage: {
				"custom-gradient": 'linear-gradient(to bottom, var(--primary-color) 10%, var(--secondary-color))',
			}
		},
	},
	plugins: [
		plugin(function({ addUtilities }) {
			addUtilities({
				".full": {
					"width": "100%",
					"height": "100%"
				}
			});
		})
	],
} satisfies Config;
