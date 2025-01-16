nuxt capacitator :  Building a native mobile aplication with nuxt
https://capgo.app/blog/building-a-native-mobile-app-with-nuxt-3-and-capacitor/#about-capacitor

Nuxt content

https://content.nuxt.com/ : Ducumentation of nuxt

## Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.


# Nuxt 3 Minimal Starter
npx nuxi dev
npx nuxi cleanup

bun --bun run dev

## compiled
npx nuxi build

# solamente se debe de copiar el directorio .otput al servidor 
# para correrlo con bun
HOST=0 PORT=13000 bun run ./server/index.mjs
# para correrlo con node
NITRO_PORT=13000 node ./server/index.mjs


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

 
## Production

Build the application for production:

https://nuxt.com/docs/api/commands/build
nuxy analyze ( pre produccion)

nuxi build (The build command creates a .output directory with all your application, server and dependencies ready for product
nuxi preview (The preview command starts a server to preview your Nuxt application after running the build command.)

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

clear npm cache
npm cache clear --force
verify npm cache

npm cache verify

// preparar NUXT
sh -c nuxt prepare

npx nuxi prepare [--log-level] [rootDir]

Runing con bun
bun run dev
Limpia proyecto
npx nuxi cleanup
