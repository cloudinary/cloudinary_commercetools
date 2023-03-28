import {CtPrice} from 'lib/types'

type ProductPriceProps = {
  price?: CtPrice
}

const ProductPrice = ({price}: ProductPriceProps) => {
  if (!price) {
    return null
  }

  const intValue = Math.floor(price.centAmount / 100)
  const decimals = price.centAmount % 100
  const paddedDecimals = ('0' + decimals).slice(-2)

  return (
    <span className="text-2xl font-medium">
      {intValue}
      <sup className="text-sm">{paddedDecimals}</sup> {price.currencyCode}
    </span>
  )
}

export default ProductPrice
