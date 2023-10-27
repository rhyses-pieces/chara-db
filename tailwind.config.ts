import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { defaultCustom } from './custom-theme';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{svelte,html,js,ts}',
    join(require.resolve('@skeletonlabs/skeleton'))
  ],
  theme: {
    extend: {},
  },
  plugins: [
    skeleton({
      themes: {
        preset: [
          'skeleton',
          'modern',
        ],
        custom: [defaultCustom],
      }
    }),
  ],
} as Config;

