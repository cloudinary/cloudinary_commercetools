import {CtAsset, CtPrice} from 'lib/types'

export const getName = (product: any, locale: string | undefined) =>
  product?.masterData?.current?.name[locale ?? 'en-US']

export const getSku = (product: any) =>
  product?.masterData?.current?.masterVariant?.sku

export const getProductType = (product: any) => product?.productType?.obj?.name

export const getProductAttribute = (product: any, attributeName: string) =>
  product?.masterData?.current?.masterVariant?.attributes?.find(
    (x: any) => x.name === attributeName,
  )?.value

export const getVariantAttribute = (variant: any, attributeName: string) =>
  variant?.attributes?.find((x: any) => x.name === attributeName)?.value

export const getPrice = (product: any): CtPrice | undefined => {
  if ((product?.masterData?.current?.masterVariant?.prices?.length ?? 0) > 0) {
    const firstPrice = product.masterData.current.masterVariant.prices[0]
    return firstPrice.value
  }

  return undefined
}

export const getAllAssets = (product: any, sort?: boolean): CtAsset[] => {
  const assets = product?.masterData?.current?.masterVariant?.assets ?? []

  return sort ? sortAssets(assets) : assets
}

export const getUniqueAssets = (assets: CtAsset[], sort?: boolean): CtAsset[] => {
  // Only return unique assets, avoiding to return multiple assets from the same spinset
  const uniqueAssets: CtAsset[] = []
  const spinsets: string[] = []

  assets.forEach(asset => {
    const spinsetTags = asset.tags?.filter(tag => tag.includes('spinset'))
    const isSpinset = spinsetTags.length > 0
    if (!isSpinset) {
      // Take all assets that are NOT spinsets
      uniqueAssets.push(asset)
    } else if (!spinsets.includes(spinsetTags[0])){
      // Then add all unique spinsets (avoiding to add multiple thumbnails for the same spinset)
      uniqueAssets.push(asset)
      spinsets.push(spinsetTags[0])
    }
  })

  return sort ? sortAssets(uniqueAssets) : uniqueAssets
}

export const sortAssets = (assets: CtAsset[]): CtAsset[] => {
  const sortPropertyName = process.env.NEXT_PUBLIC_COMMERCETOOLS_PROPERTY_SORT || 'sortNumber'
  return assets.sort((a, b) => {
    const sortOrderA = (a.custom?.fields || {} as any)[sortPropertyName];
    const sortOrderB = (b.custom?.fields || {} as any)[sortPropertyName];

    if (sortOrderA && sortOrderB) {
      return sortOrderA > sortOrderB ? 1 : -1
    } else if (sortOrderA) {
      return -1
    } else {
      return 1
    }
  })
}

export const getImageAssets = (product: any): CtAsset[] =>
  getAllAssets(product).filter(
    x => !x.sources[0]?.contentType?.startsWith('video'),
  ) ?? []

export const getAssetName = (asset: any, locale: string | undefined) =>
  asset?.name ? asset.name[locale ?? 'en-US'] : ''

export const getAssetDescription = (asset: any, locale: string | undefined) =>
  asset?.description ? asset.description[locale ?? 'en-US'] : ''

export const getAssetUri = (asset: CtAsset): string | undefined =>
  asset?.sources[0]?.uri

export const getAllVariants = (product: any) => [
  product?.masterData?.current?.masterVariant,
  ...product?.masterData?.current?.variants,
]
