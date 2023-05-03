import {useEffect, useState} from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getUniqueAssets } from 'lib/commercetools/productHelper'

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
      const assets = getUniqueAssets(variant.assets)

      // 2. Sort by sortOrder (or if empty, in order of appearance)
      const sortedAssets = assets.sort((a, b) => {
        const sortOrderA = a.custom?.fields?.sortOrder ?? '';
        const sortOrderB = b.custom?.fields?.sortOrder ?? '';
    
        if (sortOrderA !== '' && sortOrderB !== '' ) {
          return sortOrderA > sortOrderB ? 1 : -1
        } else {
          return 1
        }
      })
    
      // 3. Extract data to feed to galleryWidget
      const mediaAssets = sortedAssets.map(asset => {
        const spinSetTags = asset.tags?.filter(x => x.includes('spinset')) ?? []
        const isSpinset = spinSetTags.length > 0
        const isVideo =
          !isSpinset && asset.sources[0].contentType?.startsWith('video')

        if (isSpinset) {
          return {
            tag: spinSetTags[0],
            mediaType: 'spin'
          }
        } else {
          return {
            publicId: asset.sources[0].uri,
            mediaType: isVideo ? 'video' : 'image'
          }
        }
      })

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
