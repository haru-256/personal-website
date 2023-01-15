import { FC } from 'react'
import { TagProps } from '@/components/atoms/Tag'
import PostFooter from '@/components/molecules/PostCardFooter'
import PostCardHeader, {
  PostedSiteType,
} from '@/components/molecules/PostCardHeader'
import PostCardBody from '@/components/molecules/PostCardBody'

export type PostCardProps = {
  postedSite: PostedSiteType
  title: string
  date: string
  datetime: string
  description: string
  href: string
  tags: Array<TagProps>
}

const PostCard: FC<PostCardProps> = (props) => {
  const {
    postedSite,
    title,
    date,
    datetime,
    description = '',
    href,
    tags = [],
  } = props
  return (
    <div
      key={title}
      className="flex flex-1 flex-col justify-between overflow-hidden rounded-lg bg-white p-6 shadow-lg hover:bg-slate-50"
    >
      <div className="mt-1">
        <PostCardHeader
          postedSite={postedSite}
          date={date}
          datetime={datetime}
        />
      </div>
      <div className="mt-7">
        <PostCardBody href={href} description={description} title={title} />
      </div>
      <div className="mt-7">
        <PostFooter tags={tags} />
      </div>
    </div>
  )
}

export default PostCard
