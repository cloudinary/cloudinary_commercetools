import React, { useState } from 'react'
import {GetStaticProps} from 'next'
import {Params} from '../lib/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {CloudConfig, CloudinaryImage} from '@cloudinary/url-gen'
import {AdvancedImage} from '@cloudinary/react'

const cloudinaryConfig = new CloudConfig({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
})

function TestPage() {
  const [test, setTest] = useState<number>(0)

  const onClick = () => {
    setTest(test + 1)
  }

  // const publicId =
  //   'ecommsamples/Vintage Leather Bag/SplitShire-5013'

  const publicId = 'CldLogo3D_ek1rgb'
  const cldImage = new CloudinaryImage(publicId, cloudinaryConfig, {
    analytics: false,
    queryParams: {
      _i: 'AN'
    }
  })
  //cldImage.resize(fill().width(500).height(800))  

  cldImage
    .format('webp')
    .backgroundColor('#3448C5')
    .addFlag('animated')

  console.log('re-render')

  return (
    <>
      <div className="max-w-md" onClick={onClick}>
        <AdvancedImage 
          cldImg={cldImage} 
          // plugins={[responsive(), placeholder(), lazyload()]} 
        />
      </div>
      <div>Number of clicks: {test}</div>
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
