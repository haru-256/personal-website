import Image from 'next/image'
import { FC } from 'react'

type MdxImageProps = {
  src: string
  alt: string
}

const MdxImage: FC<MdxImageProps> = ({ src, alt }) => {
  return (
    <div className="relative flex h-[300px] w-full justify-center md:h-[400px] lg:h-[500px]">
      <Image src={src} alt={alt} fill={true} className="object-contain" />
    </div>
  )
}

export default MdxImage
