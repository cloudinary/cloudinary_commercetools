import {AdvancedImage, placeholder, responsive} from '@cloudinary/react'
import {CloudConfig, CloudinaryImage} from '@cloudinary/url-gen'
import {fill, thumbnail} from '@cloudinary/url-gen/actions/resize'
import {AssetInfo} from 'lib/types'
import {useEffect, useState} from 'react'
import classNames from 'classnames'

export type AssetImageProps = {
  publicId: string | undefined
  width?: number
  height?: number
  isThumbnail?: boolean
}

const cloudinaryConfig = new CloudConfig({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
})

const AssetImage = ({
  publicId,
  width,
  height,
  isThumbnail = false,
}: AssetImageProps) => {
  const [image, setImage] = useState<CloudinaryImage>()
  const [isOpen, setOpen] = useState<boolean>(false)
  const [info, setInfo] = useState<AssetInfo>()

  const toggleInfoPane = (e: any) => {
    e.preventDefault()

    setOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => {
        setOpen(false)
      }, 5000)
    }
  }

  // const perfObserver = (list: PerformanceObserverEntryList, observer: PerformanceObserver) => {
  //   list.getEntries().forEach(entry => {
  //     const encodedId = publicId?.replaceAll(' ', '%20')
  //     if (encodedId && entry.initiatorType === 'img' && entry.name.includes(encodedId)) {
  //       //const size = entry.transferSize;
  //       //console.log('perfObserver', { publicId, size, entry})
  //       console.log('perfObserver', {entry, info})

  //       //updateInfo(entry.name)
  //     }
  //   })
  // }

  // const observer = new PerformanceObserver(perfObserver)
  // observer.observe({ entryTypes: [ "resource"]})

  const updateInfo = (url: string) => {
    // TODO: is there a better way to manipulate this url?
    const infoUrl = url.replace('upload/', 'upload/fl_getinfo,')
    console.log('updateInfo', {url, infoUrl})

    fetch(infoUrl)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((res: AssetInfo) => {
        const newInfo = info ? {...info} : {...res}
        if (info) {
          newInfo.output = res.output
          newInfo.updates = (newInfo.updates ?? 0) + 1
        } else {
          newInfo.updates = 0
        }

        setInfo(newInfo)
      })
  }

  useEffect(() => {
    const cldImage = new CloudinaryImage(publicId, cloudinaryConfig)

    if (isThumbnail) {
      cldImage.resize(
        thumbnail()
          .width(width ?? 136)
          .height(height ?? 142),
      )
    } else {
      cldImage.resize(
        fill()
          .height(height ?? 700)
          .width(width ?? 600),
      )
    }

    setImage(cldImage)

    if (!isThumbnail) {
      updateInfo(cldImage.toURL())
    }
  }, [publicId, isThumbnail])

  if (isThumbnail) {
    return <div>{image && <AdvancedImage cldImg={image} />}</div>
  }

  return (
    <div className="relative">
      <div>
        {image && (
          <AdvancedImage
            cldImg={image}
            plugins={[responsive(), placeholder()]}
          />
        )}
      </div>
      <div className="absolute top-0 left-0 flex flex-row">
        <div>
          <button onClick={toggleInfoPane} className=" p-4">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9667 18H13.3667V10.8H10.9667V18ZM12.1667 0C5.54275 0 0.166748 5.376 0.166748 12C0.166748 18.624 5.54275 24 12.1667 24C18.7907 24 24.1667 18.624 24.1667 12C24.1667 5.376 18.7907 0 12.1667 0ZM12.1667 21.6C6.87475 21.6 2.56675 17.292 2.56675 12C2.56675 6.708 6.87475 2.4 12.1667 2.4C17.4587 2.4 21.7667 6.708 21.7667 12C21.7667 17.292 17.4587 21.6 12.1667 21.6ZM10.9667 8.4H13.3667V6H10.9667V8.4Z"
                fill="#3448C5"
              />
            </svg>
          </button>
        </div>
        {info && info.input && info.output && (
          <div
            className={classNames(
              'mt-4  bg-white p-4 text-base font-medium leading-6 text-black drop-shadow transition-all	duration-500',
              {
                'opacity-0': !isOpen,
                'opacity-90': isOpen,
              },
            )}
          >
            <div>
              Original({info.input.width} x {info.input.height})
            </div>
            <div className="">{Math.round(info.input.bytes / 1024)} kB</div>
            <div className="h-[10px] w-full bg-redNew"></div>
            <div className="mt-4">
              Optimized ({info.output.width} x {info.output.height})
            </div>
            <div
              className="h-[10px] bg-blueNew"
              style={{
                width: Math.round((100 * info.output.bytes) / info.input.bytes),
              }}
            ></div>
            {/*<div className="ml-4">Format: {info.output.format}</div>*/}
            <div>{Math.round(info.output.bytes / 1024)} kB</div>
            <div className="mt-4 flex flex-row justify-end text-[#3448C5]">
              <span>
                {100 - Math.round((100 * info.output.bytes) / info.input.bytes)}
                % Smaller
              </span>
            </div>
            {/* <div>Updates: {info.updates}</div> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default AssetImage
