import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		// @ts-expect-error
		sveltekit(),
	],
	optimizeDeps: {
		include: [
			'node_modules/svelte-tiptap/**',
			'node_modules/@tiptap/**/**/*'
		],
	}
});
