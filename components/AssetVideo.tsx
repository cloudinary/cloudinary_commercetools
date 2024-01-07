import {
  AdvancedImage,
  AdvancedVideo,
  placeholder,
  responsive,
} from '@cloudinary/react'
import {CloudConfig, CloudinaryVideo, Transformation} from '@cloudinary/url-gen'
import {source} from '@cloudinary/url-gen/actions/overlay'
import {fill, scale, thumbnail} from '@cloudinary/url-gen/actions/resize'
import {Position} from '@cloudinary/url-gen/qualifiers'
import {compass} from '@cloudinary/url-gen/qualifiers/gravity'
import {image} from '@cloudinary/url-gen/qualifiers/source'

export type AssetVideoProps = {
  publicId: string | undefined
  width?: number
  height?: number
  isThumbnail?: boolean
  forceImage?: boolean
}

const AssetVideo = ({
  publicId,
  width,
  height,
  isThumbnail = false,
  forceImage = false,
}: AssetVideoProps) => {
  const cloudinaryConfig = new CloudConfig({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  })

  const video = new CloudinaryVideo(publicId, cloudinaryConfig, {
    privateCdn: true
  })

  if (isThumbnail) {
    video
      .resize(thumbnail().width(136).height(142))
      .overlay(
        source(
          image('play-icon-white-png-8_jajw2z').transformation(
            new Transformation().resize(scale().width(100)),
          ),
        ).position(new Position().gravity(compass('center'))),
      )
      .format('jpg')

    return (
      <div>
        <AdvancedImage cldImg={video} />
      </div>
    )
  }

  video.resize(
    fill()
      .width(width ?? 600)
      .height(height ?? 700),
  )

  if (forceImage) {
    video.format('jpg')

    return (
      <div>
        <AdvancedImage cldImg={video} />
      </div>
    )
  }

  return (
    <div>
      <AdvancedVideo
        cldVid={video}
        controls
        plugins={[responsive(), placeholder()]}
      />
    </div>
  )
}

export default AssetVideo
