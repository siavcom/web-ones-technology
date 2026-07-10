import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      spacing: {
        // Legacy widths used in TS class strings (e.g. w-30, w-60, w-100)
        '30': '7.5rem',
        '40': '10rem',
        '60': '15rem',
        '80': '20rem',
        '100': '25rem',
      },
    },
  },
  safelist: [
    // Block/container dynamic classes assigned from TS objects
    'w-full',
    'sm:w-full',
    'md:w-1/4',
    'md:w-64',
    'lg:w-1/4',
    'lg:w-1/3',
    'lg:w-30',
    'lg:w-40',
    'lg:w-60',
    'lg:w-80',
    'lg:w-100',
  ],
} satisfies Config
