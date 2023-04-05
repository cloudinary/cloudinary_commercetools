import {useEffect, useState} from 'react'

export type AssetSpinsetProps = {
  tags: string[]
}

const AssetSpinset = ({tags}: AssetSpinsetProps) => {
  const [isLoaded, setLoaded] = useState(false)
  
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
      const tag = tags.find(x => x.includes('spinset'))
      if (tag) {
        const myGallery = window.cloudinary.galleryWidget({
          container: '#my-gallery',
          carouselStyle: 'none',
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
          mediaAssets: [{tag: tag, mediaType: "spin"}],
        })

        console.log('AssetSpinset.1', {tags, myGallery})

        myGallery.render()
      }
    }
  }, [tags, isLoaded])

  return (
    <div className="relative">
      <div id="my-gallery" />
    </div>
  )
}

export default AssetSpinset
