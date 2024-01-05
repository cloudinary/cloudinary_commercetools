import React, {useEffect} from 'react'
import {GetStaticProps} from 'next'
import {PageProps, Params} from '../../lib/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {
  fetchProduct,
  fetchRelatedProducts,
} from 'lib/commercetools/commercetools'
import ProductDetailPageLayout from 'layouts/productDetailPageLayout'

type ProductDetailPageProps = PageProps & {
  product: any
  relatedProducts: any[]
}

function ProductDetailPage(props: ProductDetailPageProps) {
  useEffect(() => {
    document.title = {...props.product.masterData.current.name["en-US"]};
  }, []);
  return (
    <div>
      <ProductDetailPageLayout {...props} />
    </div>
  )
}

export const getServerSideProps: GetStaticProps<any, Params> = async ({
  params,
  preview,
  locale,
}) => {
  const productId = params?.id as string | undefined
  if (productId) {
    const product = await fetchProduct(productId)
    if (product && product.statusCode !== 404) {
      const relatedProducts = await fetchRelatedProducts(3)
      const translations = await serverSideTranslations(locale!, ['common'])

      return {
        props: {
          ...translations,
          product,
          relatedProducts,
          preview: preview ?? false,
        },
      }
    }
  }

  return {
    notFound: true,
  }
}

export default ProductDetailPage
