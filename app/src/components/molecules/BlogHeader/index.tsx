import { FC } from 'react'

type BlogHeaderProps = {
  title: string
  description: string
}

const BlogHeader: FC<BlogHeaderProps> = (props) => {
  const { title, description } = props
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-1 px-6 sm:py-1 lg:flex lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-5 text-lg text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogHeader
