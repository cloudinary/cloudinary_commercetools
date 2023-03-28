import classNames from 'classnames'
import {CtAsset} from 'lib/types'
import AssetImage from './AssetImage'
import AssetVideo from './AssetVideo'

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
  return (
    <div
      className={classNames(className, {
        'w-full': !isThumbnail,
        'relative w-full': isThumbnail,
      })}
    >
      {!asset.sources[0].contentType?.startsWith('video') ? (
        <AssetImage
          publicId={asset.sources[0].uri}
          isThumbnail={isThumbnail}
          width={width}
          height={height}
        />
      ) : (
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
