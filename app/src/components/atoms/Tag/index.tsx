import { FC } from 'react'
import Link from 'next/link'

export type TagProps = {
  href: string
  name: string
}

const Tag: FC<TagProps> = (props) => {
  const { name, href } = props
  return (
    <div
      key={name}
      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
    >
      <Link href={href} className="hover:underline">
        {`#${name}`}
      </Link>
    </div>
  )
}

export default Tag
