import Image from 'next/image'
import { FC } from 'react'

type MdxImageProps = {
  src: string
  alt: string
  hrem: number | undefined
  height: number | undefined
  width: number | undefined
}

const MdxImage: FC<MdxImageProps> = ({
  src,
  alt,
  hrem = 25,
  height,
  width,
}) => {
  if (height && width) {
    return (
      <div className="flex justify-center">
        <Image src={src} alt={alt} height={height} width={width} />
      </div>
    )
  }
  return (
    <div className={`relative flex h-[${hrem}rem] w-full justify-center`}>
      <Image src={src} alt={alt} fill={true} className="m-0 object-contain" />
    </div>
  )
}

export default MdxImage
