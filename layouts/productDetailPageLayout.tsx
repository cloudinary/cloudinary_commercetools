import ProductPrice from 'components/elements/ProductPrice'
import ProductList from 'components/ProductList'

import {getName, getAllVariants, getUniqueAssets} from 'lib/commercetools/productHelper'
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'
import Carousel from 'components/Carousel'
import Breadcrumb from 'components/elements/Breadcrumb'
import ProductVariants from 'components/elements/ProductVariants'
import {useEffect, useState} from 'react'

type ProductDetailPageProps = {
  product: any
  relatedProducts: any[]
}

const ProductDetailPageLayout = ({
  product,
  relatedProducts,
}: ProductDetailPageProps) => {
  const {locale} = useRouter()
  const {t} = useTranslation('common')

  const [variants, setVariants] = useState<any[]>([])
  const [currentVariant, setCurrentVariant] = useState<any>()

  const setVariant = (variant: any) => {
    setCurrentVariant(variant)
  }

  useEffect(() => {
    if (product) {
      const allVariants = getAllVariants(product)

      setVariants(allVariants)
      if (allVariants && allVariants.length > 0) {
        setVariant(allVariants[0])
      }
    }
  }, [product])

  if (!product || !currentVariant) {
    return <div>{t('product-not-found')}</div>
  }

  return (
    <div className="px-[6.25vw] py-[3.25vw]">
      <div className="mb-16 text-2xl">
        <Breadcrumb product={product} locale={locale} />
      </div>
      <div className="mb-16 pb-8 md:grid md:grid-cols-5 lg:mx-[10vw]">
        <div className="col-span-3">
          <Carousel assets={getUniqueAssets(currentVariant.assets)} />
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-row justify-between text-3xl font-medium">
            {getName(product, locale)}
            <ProductPrice price={currentVariant.prices[0]?.value} />
          </div>

          <ProductVariants variants={variants} setVariant={setVariant} />

          {/* <ProductSize variant={currentVariant} /> */}
          <button className="mt-6 rounded-3xl bg-orangeNew px-20 py-3 text-2xl font-medium text-white ">
            Add to cart
          </button>
        </div>
      </div>
      <ProductList products={relatedProducts} onDetailPage />
    </div>
  )
}

export default ProductDetailPageLayout
