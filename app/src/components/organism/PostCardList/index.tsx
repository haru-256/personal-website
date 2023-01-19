import { FC } from 'react'
import PostCard, { PostCardProps } from '@/components/organism/PostCard'
import Pagination from '@/components/molecules/Pagination'
import { NextRouter, useRouter } from 'next/router'

export type PostCardListProps = {
  posts: PostCardProps[]
}

function getPage(router: NextRouter, pages: number) {
  const pageQuery = router.query.page
  if (typeof pageQuery === 'string') {
    const page = parseInt(pageQuery)
    if (page < 1) {
      return 1
    }
    if (page > pages) {
      return pages
    }
    return page
  } else if (pageQuery === undefined) {
    return 1
  } else {
    // FIXME: エラーを出す？
    return 1
  }
}

const PostCardList: FC<PostCardListProps> = (props) => {
  const { posts } = props
  const router = useRouter()
  const pageSize = 6
  const pages = Math.ceil(posts.length / pageSize)
  const currentPage = getPage(router, pages)

  return (
    <div className="flex flex-col gap-[4rem]">
      <div className="mx-10 mt-6 grid gap-5 pt-10 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-12">
        {posts
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map((post) => (
            <PostCard key={post.title} {...post} />
          ))}
      </div>
      <Pagination currentPage={currentPage} pages={pages} />
    </div>
  )
}

export default PostCardList
