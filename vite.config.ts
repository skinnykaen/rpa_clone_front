import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import * as path from 'path'

export default defineConfig({
	define: {
		'process.env': process.env
	},
	plugins: [
		react(),
		// {
        //     ...eslint(),
        //     apply: 'build',
        // },
        // {
        //     ...eslint({
        //         failOnWarning: false,
        //         failOnError: false,
        //     }),
        //     apply: 'serve',
        //     enforce: 'post'
        // },
		// svgr(),
	],
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
		port: 5000,
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
})