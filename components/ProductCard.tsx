import {getName, getPrice, getAllAssets} from 'lib/commercetools/productHelper'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import ProductPrice from './elements/ProductPrice'
import AssetRenderer from './AssetRenderer'

export type ProductCardProps = {
  product: any
  isSmall?: boolean
}

const ProductCard = ({product, isSmall = false}: ProductCardProps) => {
  const {locale} = useRouter()
  const imageAssets = getAllAssets(product)

  return (
    <div className=" overflow-hidden transition-all duration-300 ">
      <Link
        href={`/products/${product.id}`}
        className="block hover:bg-black hover:text-white"
      >
        {imageAssets.length > 0 ? (
          <AssetRenderer
            asset={imageAssets[0]}
            height={isSmall ? 330 : 700}
            forceImage
          />
        ) : (
          <Image
            src="/assets/no-image.jpg"
            alt=""
            width="600"
            height="800"
            style={{maxHeight: 330, objectFit: 'cover'}}
          />
        )}

        <div className="bg-transparent p-4">
          <div className="flex justify-between">
            <h3 className="text-2xl">{getName(product, locale)}</h3>
            <ProductPrice price={getPrice(product)} />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
