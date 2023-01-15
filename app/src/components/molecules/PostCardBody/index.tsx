import { FC } from 'react'
import Link from 'next/link'

type PostCardBodyProps = {
  title: string
  href: string
  description: string
}

const PostCardBody: FC<PostCardBodyProps> = (props) => {
  const { href, title, description } = props
  const re = /^https:\/\//
  return (
    <Link
      href={href}
      className="block"
      target={re.test(href) ? '_blank' : undefined}
      rel={re.test(href) ? 'noopener noreferrer' : undefined}
    >
      <p className="text-2xl font-semibold text-gray-900">{title}</p>
      <p className="mt-3 text-base text-gray-500">{description}</p>
    </Link>
  )
}

export default PostCardBody
