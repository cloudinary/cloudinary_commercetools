import {useEffect, useState} from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { convertToMediaAsset, getUniqueAssets } from 'lib/commercetools/productHelper'

type GalleryWidgetProps = {
  productId: string
  variant: any
  //assets: CtAsset[]
}

const GalleryWidget = ({productId, variant}: GalleryWidgetProps) => {
  const [isLoaded, setLoaded] = useState(false) 
  const galleryName = `my-gallery-${productId}-${variant.id}`

  useEffect(() => {
    // Loop until window.cloudinary object is available
    const interval = setInterval(() => {
      if (window.cloudinary) {
        clearInterval(interval) 
        setLoaded(true)
      }
    }, 250)
    return () => clearInterval(interval) 
  }, [])

  useEffect(() => {
    if (isLoaded && window.cloudinary) {
      // 1. Get "unique" assets (i.e. avoid showing more than 1 image of the same spinset)
      const assets = getUniqueAssets(variant.assets, true)
   
      // 2. Extract data to feed to galleryWidget
      const mediaAssets = assets.map(asset => convertToMediaAsset(asset))

      // console.log('GalleryWidget', {galleryName, mediaAssets})
      const myGallery = window.cloudinary.galleryWidget({
        container: `#${galleryName}`,
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
        mediaAssets: mediaAssets,
        queryParam: "AN",
        spinProps: {
          spinDirection: "clockwise"
        }
      })

      myGallery.render()
    }
  }, [isLoaded, variant])

  return (
    <div className="relative">
      <div id={galleryName} />
    </div>
  )
}

export default GalleryWidget
