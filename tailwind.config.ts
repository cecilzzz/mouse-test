import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Gaming/Geek Colors - 极客风配色
  			'neon-green': {
  				50: '#f0fff4',
  				100: '#dcfce7',
  				200: '#bbf7d0',
  				300: '#86efac',
  				400: '#4ade80',
  				500: '#00ff41', // 经典矩阵绿
  				600: '#00e639',
  				700: '#00cc33',
  				800: '#00b32d',
  				900: '#009926',
  				950: '#006b1a'
  			},
  			// Electric Blue - 电光蓝
  			'electric': {
  				50: '#eff6ff',
  				100: '#dbeafe',
  				200: '#bfdbfe',
  				300: '#93c5fd',
  				400: '#60a5fa',
  				500: '#00bfff', // 深空蓝
  				600: '#0099cc',
  				700: '#0080b3',
  				800: '#006699',
  				900: '#004d80',
  				950: '#003366'
  			},
  			// Hot Pink/Magenta - 炫酷粉
  			'cyber-pink': {
  				50: '#fdf2f8',
  				100: '#fce7f3',
  				200: '#fbcfe8',
  				300: '#f9a8d4',
  				400: '#f472b6',
  				500: '#ff0080', // 网络朋克粉
  				600: '#e60073',
  				700: '#cc0066',
  				800: '#b30059',
  				900: '#99004d',
  				950: '#800040'
  			},
  			// Orange/Yellow - 警告橙
  			'warning-orange': {
  				50: '#fff7ed',
  				100: '#ffedd5',
  				200: '#fed7aa',
  				300: '#fdba74',
  				400: '#fb923c',
  				500: '#ff6600', // 经典橙色
  				600: '#ea580c',
  				700: '#c2410c',
  				800: '#9a3412',
  				900: '#7c2d12',
  				950: '#431407'
  			},
  			// Purple - 神秘紫
  			'hacker-purple': {
  				50: '#faf5ff',
  				100: '#f3e8ff',
  				200: '#e9d5ff',
  				300: '#d8b4fe',
  				400: '#c084fc',
  				500: '#8a2be2', // 蓝紫色
  				600: '#7c3aed',
  				700: '#6d28d9',
  				800: '#5b21b6',
  				900: '#4c1d95',
  				950: '#2e1065'
  			},
  			// 测试状态颜色 - 更加鲜明
  			'test-active': '#00ff41',      // 亮绿色
  			'test-inactive': '#666666',    // 暗灰色
  			'test-error': '#ff0040',       // 亮红色  
  			'test-warning': '#ffaa00',     // 亮橙色
  			'test-info': '#00bfff',        // 亮蓝色
  			
  			// RGB LED 效果色
  			'rgb-red': '#ff0000',
  			'rgb-green': '#00ff00', 
  			'rgb-blue': '#0000ff'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'mouse': '1.25rem'
  		},
  		fontFamily: {
  			'display': ['Inter', 'system-ui', 'sans-serif'],
  			'mono': ['JetBrains Mono', 'Fira Code', 'monospace']
  		},
  		fontSize: {
  			'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
  			'title': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
  			'subtitle': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'112': '28rem'
  		},
  		animation: {
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'bounce-gentle': 'bounce 2s infinite',
  			'click-feedback': 'clickFeedback 0.2s ease-in-out'
  		},
  		keyframes: {
  			clickFeedback: {
  				'0%': { transform: 'scale(1)' },
  				'50%': { transform: 'scale(0.95)' },
  				'100%': { transform: 'scale(1)' }
  			}
  		},
  		boxShadow: {
  			'mouse': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  			'mouse-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  			'test-active': '0 0 20px rgba(34, 197, 94, 0.3)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
