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

export const getAllAssets = (product: any): CtAsset[] =>
  product?.masterData?.current?.masterVariant?.assets ?? []

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
