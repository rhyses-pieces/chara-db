import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { defaultCustom } from './custom-theme';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{svelte,html,js,ts}',
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*./**/*.{svelte,html,js,ts}'),
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ["'Intel One Mono'", ...defaultTheme.fontFamily.mono],
        // 'sans': ["Luciole", ...defaultTheme.fontFamily.sans],
      }
    },
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

