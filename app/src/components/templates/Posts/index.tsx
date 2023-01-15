import { FC } from 'react'
import BlogHeader from '@/components/molecules/BlogHeader'
import PostCardList from '@/components/organism/PostCardList'
import { PostCardListProps } from '@/components/organism/PostCardList'

const Posts: FC<PostCardListProps> = (props) => {
  const { posts } = props
  return (
    <div className="bg-white px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-5xl">
        <BlogHeader
          title="ブログ一覧"
          description="機械学習やWeb系の技術について書いています"
        />
        <PostCardList posts={posts} />
      </div>
    </div>
  )
}

export default Posts
