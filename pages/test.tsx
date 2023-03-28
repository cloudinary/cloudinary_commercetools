import React, { useState } from 'react'
import {GetStaticProps} from 'next'
import {Params} from '../lib/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {CloudConfig, CloudinaryImage} from '@cloudinary/url-gen'
import {accessibility, AdvancedImage, lazyload, placeholder, responsive} from '@cloudinary/react'
import {fill, thumbnail} from '@cloudinary/url-gen/actions/resize'

const cloudinaryConfig = new CloudConfig({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
})

function TestPage() {
  const [test, setTest] = useState<number>(0)

  const onClick = () => {
    setTest(test + 1)
  }

  const publicId =
    'ecommsamples/Vintage Leather Bag/SplitShire-5013'

  const cldImage = new CloudinaryImage(publicId, cloudinaryConfig)
  //cldImage.resize(fill().width(500).height(800))

  console.log('re-render')

  return (
    <>
      <div className="max-w-md" onClick={onClick}>
        <AdvancedImage cldImg={cldImage} plugins={[responsive(), placeholder(), lazyload()]} />
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
