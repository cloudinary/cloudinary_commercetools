import React from 'react'
import {GetStaticProps} from 'next'
import {PageProps, Params} from '../../lib/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {fetchAllProducts} from 'lib/commercetools/commercetools'
import ProductListPageLayout from 'layouts/productListPageLayout'

type ProductsPageProps = PageProps & {
  products: any[]
}

function ProductsPage(props: ProductsPageProps) {
  return (
    <div>
      <ProductListPageLayout products={props.products} />
    </div>
  )
}

export const getServerSideProps: GetStaticProps<any, Params> = async ({
  preview,
  locale,
}) => {
  const allProducts = await fetchAllProducts()
  const translations = await serverSideTranslations(locale!, ['common'])

  return {
    props: {
      ...translations,
      products: allProducts,
      preview: preview ?? false,
    },
  }
}

export default ProductsPage
