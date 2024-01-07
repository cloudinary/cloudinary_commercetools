import AssetImage from './AssetImage'

export interface HeroProps {
  public_id: string
  title: string
  width: number
  description?: string
}


const Hero = ({public_id, title, width, description}: HeroProps) => {
  return (
    <div className="relative h-[300px] w-full overflow-hidden lg:h-[500px] 3xl:h-[700px]">
      <div className="h-full w-full overflow-hidden">
      <AssetImage
          publicId={public_id}
          format='jpg'
          altText={title}
          width={width}
      />
      </div>
      <div className="absolute inset-0 z-10 h-full w-full max-w-[65vw] p-[6.25vw] lg:max-w-[100vw]">
        <h1 className="mb-8 text-6xl font-normal text-orangeNew animate-in fade-in slide-in-from-top-2 duration-1000 ">
          {' '}
          {title}
        </h1>
        <p className="max-w-xl text-3xl font-light animate-in fade-in slide-in-from-top-2 duration-1000">
          {description}
        </p>
      </div>
    </div>
  )
}

export default Hero
