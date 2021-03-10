import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy'

const production = !process.env.ROLLUP_WATCH;
const base_output_dir = '../public/products';

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'yf-src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `${base_output_dir}/index.js`
	},
	plugins: [
		svelte({
			customElement:true,
			// enable run-time checks when not in production
			dev: !production,
			preprocess: sveltePreprocess({
				postcss: {
				  plugins: [require('tailwindcss'), require('autoprefixer')],
				},
			  }),
		}),
		json({
			compact: true
		}),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
		}),
		copy({
			targets: [
			  { src: production ? 'yf-src/demo.html' : 'yf-src/index.html', dest: base_output_dir },
			]
		  }),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run post-app-build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
