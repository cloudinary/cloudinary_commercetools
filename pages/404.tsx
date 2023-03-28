import React from 'react'
import {ParsedUrlQuery} from 'querystring'
import {GetStaticProps} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface Params extends ParsedUrlQuery {
  slug: string[]
}

function Custom404() {
  return <div>Sorry, but we couldn&apos;t find this product.</div>
}

export const getStaticProps: GetStaticProps<any, Params> = async ({
  preview,
  locale,
}) => {
  const translations = await serverSideTranslations(locale!, ['common'])

  return {
    props: {
      ...translations,
      preview: preview ?? false,
    },
    // Next.js will attempt to re-generate the page:
    // https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
    // - When a request comes in
    // - At most once every 5 second
    revalidate: 5, // In seconds
  }
}

export default Custom404
