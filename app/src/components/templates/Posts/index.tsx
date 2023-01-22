import { FC } from 'react'
import BlogHeader from '@/components/molecules/BlogHeader'
import PostCardList from '@/components/organism/PostCards'
import { PostCardListProps } from '@/components/organism/PostCards'

const Posts: FC<PostCardListProps> = (props) => {
  const { posts } = props

  return (
    <div className="bg-white px-6 pt-14 pb-10 lg:px-8 lg:pt-16">
      <div className="relative mx-auto max-w-lg  divide-y-2 divide-gray-200 lg:max-w-5xl">
        <div className="pb-7 sm:pb-10">
          <BlogHeader
            title="ブログ一覧"
            description="機械学習やWeb系の技術について書いています"
          />
        </div>
        <div className="pt-7 sm:pt-10">
          <PostCardList posts={posts} />
        </div>
      </div>
    </div>
  )
}

export default Posts
