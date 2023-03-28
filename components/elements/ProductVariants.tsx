import classNames from 'classnames'
import {getVariantAttribute} from 'lib/commercetools/productHelper'
import {useEffect, useState} from 'react'

type ProductVariantsProps = {
  variants: any[]
  setVariant?: (variant: any) => void
}

const ProductVariants = ({variants, setVariant}: ProductVariantsProps) => {
  const defaultVariant =
    variants && variants.length > 0 ? variants[0] : undefined
  //const [selectedVariant, setSelectedVariant] = useState(defaultVariant)
  const [selectedColour, setSelectedColour] = useState<string>(
    getVariantAttribute(defaultVariant, 'colour'),
  )
  const [selectedSize, setSelectedSize] = useState<string>(
    getVariantAttribute(defaultVariant, 'size'),
  )

  const colours = [
    ...new Set<string>(
      variants.map(variant => getVariantAttribute(variant, 'colour')),
    ),
  ]
  const sizes = [
    ...new Set<string>(
      variants.map(variant => getVariantAttribute(variant, 'size')),
    ),
  ]

  useEffect(() => {
    var variant = variants.find(
      x =>
        getVariantAttribute(x, 'colour') === selectedColour &&
        getVariantAttribute(x, 'size') === selectedSize,
    )
    if (variant) {
      //setSelectedVariant(variant)
      if (setVariant) {
        setVariant(variant)
      }
    }
  }, [variants, setVariant, selectedColour, selectedSize])

  if (!variants || variants.length < 2) {
    return null
  }

  return (
    <div>
      <div className="my-6 text-lg">Colour: {selectedColour}</div>
      <div className="mt-2 flex gap-2">
        {colours.map(colour => {
          return (
            <button
              key={colour}
              onClick={() => {
                setSelectedColour(colour)
              }}
              className={classNames(
                'ml-2 mr-2  mb-4 mt-1 h-6 w-6 rounded-full px-2 py-1 text-base outline outline-[1px] outline-offset-4 outline-black',
                {
                  'bg-black': colour === 'black',
                  'bg-white': colour === 'white',
                  'bg-red-500': colour === 'red',
                  'outline-[3px]': colour === selectedColour,
                },
              )}
            />
          )
        })}
      </div>
      <div className="my-6 text-lg">Size: {selectedSize}</div>
      <div className="mt-2 flex gap-2">
        {sizes.map(size => {
          return (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size)
              }}
              className={classNames(
                ' border border-black bg-white/40 px-3 py-1 text-xl ',
                {
                  'border-[3px]': size === selectedSize,
                },
              )}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductVariants
