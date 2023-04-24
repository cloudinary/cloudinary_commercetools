import classNames from 'classnames'
import {CtAsset} from 'lib/types'
import AssetImage from './AssetImage'
import AssetVideo from './AssetVideo'
import AssetSpinset from './AssetSpinset'

type AssetRendererProps = {
  asset: CtAsset
  width?: number
  height?: number
  isThumbnail?: boolean
  className?: string
}

const AssetRenderer = ({
  asset,
  width,
  height,
  isThumbnail = false,
  className,
}: AssetRendererProps) => {
  const spinSetTags = asset.tags?.filter(x => x.includes('spinset')) ?? []
  const isSpinset = spinSetTags.length > 0
  const isVideo =
    !isSpinset && asset.sources[0].contentType?.startsWith('video')
  const isImage = !isSpinset && !isVideo

  return (
    <div
      className={classNames(className, {
        'w-full': !isThumbnail,
        'relative w-full': isThumbnail,
      })}
    >
      {isSpinset && (
        <AssetSpinset
          id={asset.id}
          publicId={asset.sources[0].uri}
          tags={asset.tags}
          isThumbnail={isThumbnail}
        />
      )}
      {isImage && (
        <AssetImage
          publicId={asset.sources[0].uri}
          isThumbnail={isThumbnail}
          width={width}
          height={height}
        />
      )}
      {isVideo && (
        <AssetVideo
          publicId={asset.sources[0].uri}
          isThumbnail={isThumbnail}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}

export default AssetRenderer
