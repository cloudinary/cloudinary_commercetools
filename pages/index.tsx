import React from 'react'
import {GetStaticProps} from 'next'
import {PageProps, Params} from '../lib/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {fetchRelatedProducts} from 'lib/commercetools/commercetools'
import HomePageLayout from 'layouts/homePageLayout'

type HomePageProps = PageProps & {
  products: any[]
}

function HomePage(props: HomePageProps) {
  return (
    <div>
      <HomePageLayout products={props.products} />
    </div>
  )
}

export const getServerSideProps: GetStaticProps<any, Params> = async ({
  preview,
  locale,
}) => {
  const pickedProducts = await fetchRelatedProducts(3)
  const translations = await serverSideTranslations(locale!, ['common'])

  return {
    props: {
      ...translations,
      products: pickedProducts,
      preview: preview ?? false,
    },
  }
}

export default HomePage
