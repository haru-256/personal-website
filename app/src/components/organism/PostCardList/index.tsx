import PostCard from '../PostCard'
import { FC } from 'react'
import { PostCardProps } from '../PostCard'

export type PostCardListProps = {
  posts: PostCardProps[]
}

const PostCardList: FC<PostCardListProps> = (props) => {
  const { posts } = props
  return (
    <div className="mx-10 mt-6 grid gap-5 pt-10 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-12">
      {posts.map((post) => (
        <PostCard key={post.title} {...post} />
      ))}
    </div>
  )
}

export default PostCardList
