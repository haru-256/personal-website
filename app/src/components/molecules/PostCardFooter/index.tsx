import { FC } from 'react'
import Tag, { TagProps } from '@/components/atoms/Tag'

export type PostFooterProps = {
  tags: Array<TagProps>
}

const Tags: FC<PostFooterProps> = (props) => {
  const { tags } = props
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Tag key={tag.name} {...tag} />
      ))}
    </div>
  )
}

export default Tags
