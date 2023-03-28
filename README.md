To get started: `npm install`

Make sure you have
[prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
&
[eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
extensions installed.

Configure the languages you need to support in `next-i18next.config.js`.
Configure the domain where your images are hosted in `next.config.js`
images.domain.

Configure API keys & locales in `.env.development.local` & `.env.production`

Start dev server: `npm run dev`

Create static build: `npm run build`

Start local server (create static build first): `npm start`

Run Storybook: `npm run storybook`

Create Storybook static build: `npm run build-storybook`

`.storybook/` contains Storybook configuration

`stories/` contains Storybook stories

`components/` contains reusable components.

`layouts/` contains the layout for the different content types.

`lib/` contains all the logic to connect to external APIs & the file system.

`pages/` contains all the different pages you want to generate. `[...slug].tsx`
is a catch all route, every URL which doesn't have a separate file will be
processed in this file.

`public/` contains all static assets (logos, favicon...) & translations (under
`locales/`)

`styles/` contains everything CSS related

`utils/` contains reusable logic (custom hooks etc)
