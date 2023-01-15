import Image from 'next/image'
import { StaticImageData } from 'next/image'
import { FC } from 'react'

export type PostedSiteType = {
  name: string
  icon: StaticImageData
}

export type PostCardHeaderProps = {
  postedSite: PostedSiteType
  date: string
  datetime: string
}

const PostCardHeader: FC<PostCardHeaderProps> = (props) => {
  const { postedSite, date, datetime } = props
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center space-x-2">
        <Image
          src={postedSite.icon}
          alt={postedSite.name}
          className="inline h-auto w-5"
        />
        <span className="text-base text-gray-500">{postedSite.name}</span>
      </div>
      <div>
        <span className="space-x-1 text-right text-sm text-gray-500">
          <time dateTime={datetime}>{date}</time>
        </span>
      </div>
    </div>
  )
}

export default PostCardHeader
