import Image from 'next/image'

export type ImageCardProps = {
  src: string
  title: string
  text: string
}

const ImageCard = ({title, text, src}: ImageCardProps) => (
  <div className="relative h-96 w-64 p-6">
    <Image src={src} alt="Shanghai" fill className="object-cover" />
    <div className="absolute bottom-6">
      <p className="text-3xl font-bold text-white">{title}</p>
      <p className="text-white xl:bg-red-50">{text}</p>
    </div>
  </div>
)

export default ImageCard
