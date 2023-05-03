import {useEffect, useRef, useState} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import AssetRenderer from './AssetRenderer'
import {CtAsset} from 'lib/types'

type CarouselProps = {
  assets: CtAsset[]
}

const Carousel = ({assets}: CarouselProps) => {
  const [navs, setNavs] = useState<{
    nav1: Slider | null
    nav2: Slider | null
  }>({
    nav1: null,
    nav2: null,
  })
  const sliderRef = useRef<Slider>(null)
  const thumbRef = useRef<Slider>(null)

  useEffect(() => {
    setNavs({
      nav1: sliderRef.current,
      nav2: thumbRef.current,
    })
  }, [])

  if (!assets || assets.length === 0) {
    return null
  }

  const sliderConfig = {
    arrows: true,
    fade: true,
    // autoplay: true,
    // autoplaySpeed: 5000,
  }

  const thumbnailConfig = {
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
    infinite: false,
    vertical: true,
    verticalSwiping: true,
  }

  const sortedAssets = assets.sort((a, b) => {
    const sortOrderA = a.custom?.fields?.sortOrder ?? '';
    const sortOrderB = b.custom?.fields?.sortOrder ?? '';

    return sortOrderA > sortOrderB ? 1 : -1
  })

  return (
    <div className="flex ">
      <div className="carouselTrack mr-4 max-h-[23rem] w-12 lg:max-h-[36rem] lg:w-24 3xl:max-h-[45rem] 3xl:w-32">
        <Slider
          ref={thumbRef}
          asNavFor={navs.nav1 ?? undefined}
          {...thumbnailConfig}
        >
          {sortedAssets.map(asset => (
            <AssetRenderer key={asset.id} asset={asset} isThumbnail />
          ))}
        </Slider>
      </div>
      <div className="carousel w-full max-w-[12rem] border lg:max-w-[24rem] 3xl:max-w-[30rem]">
        <Slider
          ref={sliderRef}
          asNavFor={navs.nav2 ?? undefined}
          {...sliderConfig}
        >
          {sortedAssets.map(asset => (
            <AssetRenderer
              key={asset.id}
              asset={asset}
              width={500}
              height={800}
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Carousel
