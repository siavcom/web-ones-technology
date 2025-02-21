nuxt capacitator :  Building a native mobile aplication with nuxt
https://capgo.app/blog/building-a-native-mobile-app-with-nuxt-3-and-capacitor/#about-capacitor

Nuxt content

https://content.nuxt.com/ : Ducumentation of nuxt

## Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

# Nuxt 3 Minimal Starter

# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun 
bun --bun run dev

## clean proyect
npx nuxi cleanup  

## compile proyect
npx nuxi build

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

## Build the application for production:

https://nuxt.com/docs/api/commands/build
nuxy analyze ( pre produccion)

nuxi build (The build command creates a .output directory with all your application, server and dependencies ready for product)

nuxi preview (The preview command starts a server to preview your Nuxt application after running the build command.)


## compile

# npx
npx nuxi build

# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# compile and Using bun 

  add in defineNuxtConfig.ts
  
    nitro: {
       preset: 'bun',
     },


   Note: Solamente se debe de copiar el directorio .otput al servidor 


# after compile Locally preview production build:
npx nuxi preview

# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# Start server with node
NITRO_PORT=3001 node ./server/index.mjs

# Start server with bun
HOST=0 PORT=3001 bun run ./server/index.mjs

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

clear npm cache
npm cache clear --force
verify npm cache

npm cache verify

# preparar NUXT
sh -c nuxt prepare

npx nuxi prepare [--log-level] [rootDir]
