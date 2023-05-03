import React, { useEffect, useState } from 'react'
import {GetStaticProps} from 'next'
import {Params} from '../lib/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {CloudConfig, CloudinaryImage} from '@cloudinary/url-gen'
import {AdvancedImage, lazyload, placeholder, responsive} from '@cloudinary/react'

const cloudinaryConfig = new CloudConfig({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
})

function TestPage() {
  const [isLoaded, setLoaded] = useState(false) 
  const [test, setTest] = useState<number>(0)
  const galleryName = `my-gallery-01`

  const onClick = () => {
    setTest(test + 1)
  }

  const publicId =
    'ecommsamples/Vintage Leather Bag/SplitShire-5013'

  const cldImage = new CloudinaryImage(publicId, cloudinaryConfig, {
    analytics: false,
    queryParams: {
      _i: 'AN'
    }
  })
  //cldImage.resize(fill().width(500).height(800))

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
    console.log('useEffect', {isLoaded, cloudinary: window.cloudinary})
    if (isLoaded && window.cloudinary) {
      const myGallery = window.cloudinary.galleryWidget({
        container: `#${galleryName}`,
        // carouselStyle: 'none',
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
        mediaAssets: [
          "ecommsamples/Knee high Floral Dress/201138-Ready-made-Lady-Floral-Prints-Dress_2",
          "ecommsamples/Knee high Floral Dress/201138-Ready-made-Lady-Floral-Prints-Dress_3",
          {publicId: "ecommsamples/Knee high Floral Dress/201138-Ready-made-Lady-Floral-Prints-Dress_3"},
          "ecommsamples/Women's Sidewalk Low-Top Sneakers/runner_shoes_clip_2x",
          {publicId: "ecommsamples/Women's Sidewalk Low-Top Sneakers/runner_shoes_clip_2x", mediaType: "video"},
        ],
        queryParam: "AN",
        // spinProps: {
        //   spinDirection: "clockwise"
        // }
      })

      myGallery.render()
    }
  }, [isLoaded])

  console.log('re-render')

  return (
    <>
      <div className="max-w-md" onClick={onClick}>
        <AdvancedImage cldImg={cldImage} plugins={[responsive(), placeholder(), lazyload()]} />
      </div>
      <div>Number of clicks: {test}</div>
      <div className="relative">
        <div id={galleryName} />
      </div>
    </>
  )
}

export const getServerSideProps: GetStaticProps<any, Params> = async ({
  preview,
  locale,
}) => {
  const translations = await serverSideTranslations(locale!, ['common'])

  return {
    props: {
      ...translations,
      preview: preview ?? false,
    },
  }
}

export default TestPage
