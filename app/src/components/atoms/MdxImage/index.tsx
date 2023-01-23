import Image from 'next/image'
import { FC } from 'react'

type MdxImageProps = {
  src: string
  alt: string
  height: number | undefined
  width: number | undefined
}

const MdxImage: FC<MdxImageProps> = ({ src, alt, height, width }) => {
  return (
    <div className="flex justify-center">
      <Image src={src} alt={alt} height={height} width={width} />
    </div>
  )
}

export default MdxImage
