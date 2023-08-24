# clean cache 
npx nuxi clean

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
npx nuxi dev 
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


================= < Ojo >===================================================================

npx update-browserslist-db@latest

Sponsored by Evil Martians
Why You Need to Call it Regularly

npx update-browserslist-db@latest updates caniuse-lite version in your npm, yarn or pnpm lock file.

This update will bring data about new browsers to polyfills tools like Autoprefixer or Babel and reduce already unnecessary polyfills.

You need to do it regularly for three reasons:

    To use the latest browser?s versions and statistics in queries like last 2 versions or >1%. For example, if you created your project 2 years ago and did not update your dependencies, last 1 version will return 2-year-old browsers.
    Actual browsers data will lead to using less polyfills. It will reduce size of JS and CSS files and improve website performance.
    caniuse-lite deduplication: to synchronize version in different tools.


