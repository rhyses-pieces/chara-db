import { sveltekit } from '@sveltejs/kit/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		// @ts-expect-error
		sveltekit(),
		purgeCss(),
	],
	optimizeDeps: {
		exclude: [
			'svelte-tiptap/*',
			'@tiptap/*',
			'codemirror',
			'@codemirror/lang-html'
		],
	}
});
