## Cloudinary commercetools demo app repo

This source code is the basis for the [Cloudinary demo app](https://cloudinary-commercetools-demo.netlify.app), a frontend implementation of the Cloudinary commercetools extension. It includes ready-made React components that you can use to display assets on your website or app.

For a full description of the Cloudinary commercetools extension including setup and installation instructions, an operational overview, and a developers guide, see Cloudinary’s [documentation](https://cloudinary.com/documentation/commercetools_integration#the_cloudinary_demo_app).

To find out how to configure Amazon AWS, Google Cloud Platform or Microsoft Azure to host the serverless microservice that integrates Cloudinary assets in your commercetools instance, see the [cloudinary_commercetools_mach](https://github.com/cloudinary/cloudinary_commercetools_mach/tree/main) repository on GitHub.

### Instructions

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
