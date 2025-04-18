import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				celestial: {
					darkPurple: '#0B0F2B', // Midnight Indigo
					charcoal: '#1A1F2C',
					purple: '#6C5CE7', // Star Purple
					secondaryPurple: '#5849c4',
					tertiaryPurple: '#4a3da3',
					lightPurple: '#74b9ff', // Nebula Blue
					softPurple: '#B2BEC3', // Soft Grey
					skyBlue: '#74b9ff', // Nebula Blue
					brightBlue: '#5facff',
					pink: '#FF6B81', // Galactic Pink
					indigo: '#0B0F2B', // Midnight Indigo
					cyan: '#74b9ff', // Nebula Blue
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'twinkle': {
					'0%, 100%': { opacity: '0.2' },
					'50%': { opacity: '1' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'fadeIn': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'twinkle-slow': 'twinkle 4s ease-in-out infinite',
				'twinkle-medium': 'twinkle 3s ease-in-out infinite',
				'twinkle-fast': 'twinkle 2s ease-in-out infinite',
				'float-slow': 'float 8s ease-in-out infinite',
				'fadeIn': 'fadeIn 1s ease-out',
			},
			fontFamily: {
				'playfair': ['"Playfair Display"', 'serif'],
				'sans': ['Inter', 'sans-serif'],
			},
			backgroundImage: {
				'cosmic-gradient': 'linear-gradient(to bottom, #1A1F2C, #403E43)',
				'purple-gradient': 'linear-gradient(135deg, #9b87f5 0%, #6E59A5 100%)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
