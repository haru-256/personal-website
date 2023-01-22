import { FC } from 'react'
import Balancer from 'react-wrap-balancer'
import Tag from '@/components/atoms/Tag'

type PostHeaderProps = {
  title: string
  date: string
  description: string
  tags: {
    name: string
    href: string
  }[]
}

const PostHeader: FC<PostHeaderProps> = (props) => {
  const { title, date, tags, description } = props
  return (
    <>
      <div className="text-right text-lg text-slate-500">{date}</div>
      <h1 className="mt-5 text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
        <Balancer>{title}</Balancer>
      </h1>
      <div className="mt-8 flex flex-wrap gap-1 text-base">
        {tags.map((tag) => (
          <Tag key={tag.name} {...tag} />
        ))}
      </div>
      <div>
        <p className="mt-10 text-xl leading-8 text-gray-500">{description}</p>
      </div>
    </>
  )
}

export default PostHeader
