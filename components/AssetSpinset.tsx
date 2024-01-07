import { AdvancedImage } from '@cloudinary/react'
import { CloudConfig, CloudinaryImage, Transformation } from '@cloudinary/url-gen'
import { opacity } from '@cloudinary/url-gen/actions/adjust'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { scale, thumbnail } from '@cloudinary/url-gen/actions/resize'
import { Position } from '@cloudinary/url-gen/qualifiers'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import {image} from '@cloudinary/url-gen/qualifiers/source'
import {useEffect, useState} from 'react'

export type AssetSpinsetProps = {
  id: string
  publicId: string
  tags: string[]
  width?: number
  height?: number
  isThumbnail?: boolean
}

const cloudinaryConfig = new CloudConfig({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
})

const AssetSpinset = ({
  id,
  publicId, 
  width, 
  height, 
  tags, 
  isThumbnail = false
}: AssetSpinsetProps) => {
  const [isLoaded, setLoaded] = useState(false) 
  const galleryName = `my-gallery-${id}`

  useEffect(() => {
    if (!isThumbnail) {
      // Loop until window.cloudinary object is available
      const interval = setInterval(() => {
        if (window.cloudinary) {
          clearInterval(interval) 
          setLoaded(true)
        }
      }, 250)
      return () => clearInterval(interval) 
    }
  }, [isThumbnail])

  useEffect(() => {
    if (isLoaded && window.cloudinary) {
      const tag = tags.find(x => x.includes('spinset'))
      if (tag) {
        const myGallery = window.cloudinary.galleryWidget({
          container: `#${galleryName}`,
          carouselStyle: 'none',
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
          mediaAssets: [{tag: tag, mediaType: "spin"}],
          queryParam: "AN",
          spinProps: {
            spinDirection: "clockwise"
          },
          privateCdn: true
        })

        myGallery.render()
      }
    }
  }, [tags, isLoaded])

  if (isThumbnail) {
    const cldImage = new CloudinaryImage(publicId, cloudinaryConfig, {
      analytics: false,
      queryParams: {
        _i: 'AN'
      }
    })
    cldImage
      .resize(thumbnail()
        .width(width ?? 136)
        .height(height ?? 142))
      .overlay(
        source(
          image('360-overlay-black_mjok7x').transformation(
            new Transformation()
              .resize(scale().width(75))
              .adjust(opacity(30)),
          ),
        ).position(new Position().gravity(compass('center'))),  
      )

    return <div><AdvancedImage cldImg={cldImage} /></div>
  } 

  return (
    <div className="relative">
      <div id={galleryName} />
    </div>
  )
}

export default AssetSpinset
