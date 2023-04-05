import React from 'react'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import {appWithTranslation} from 'next-i18next'
import {trpc} from '../utils/trpc'
import NavBar from 'components/NavBar'
import Doormat from 'components/Doormat'
import Script from 'next/script'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <main>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script src="https://product-gallery.cloudinary.com/all.js" />

      <NavBar></NavBar>
      <main>
        <Component {...pageProps} />
      </main>
      <Doormat />
    </main>
  )
}

export default trpc.withTRPC(appWithTranslation(MyApp))
