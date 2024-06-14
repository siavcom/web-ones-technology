# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

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


/////////////////////////////////////////////////////////////

Instalar como demonio projecto de NODE y/o NUXT
////////////////////////////////////////////////////////////

debe de existir nvm en root

sudo su
apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 

source ~/.profile   

ya instalado el nvm (node version manager)
instalar el node en root
exit
nvm install 20.11


Vamos a utilizar el paquete pm2 para poner nustros demonios de servidores de nuxt y node 

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04

sudo npm install pm2@latest -g

 hay que posisionarnos donde corre el back-end

pm2 start server_socekt.js

te va dar un comando a ejecutar

sudo env PATH=$PATH:/home/soporte/.config/nvm/versions/node/v20.11.1/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u soporte --hp /home/soporte

por ultimo


pm2 save



aumentar projecto nuxt a pm2
en nuxt.config.ts

aumentar host:0

devServer: {
    host:'0',   // indica la direccion ip a servir
    port: 3000
  },

hacer un web-ones.sh para que corra nuxt con pm2
con la instruccion
npx nuxi dev

start 
pm2 start web-ones.sh
y 
pm2 save

para guardar 




