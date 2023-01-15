import axios from 'axios'
import qiitaIcon from 'public/qiita.png'
import { PostType } from '@/types'

type QiitaPosts = {
  title: string
  created_at: string
  url: string
  tags: [{ name: string }]
}[]

export async function fetchPostsFromQiita(token: string): Promise<PostType[]> {
  const { data } = await axios.get<QiitaPosts>(
    'https://qiita.com/api/v2/authenticated_user/items',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const qiitaPosts: PostType[] = data.map((qiitaPost) => {
    const { title, url, created_at, tags } = qiitaPost
    return {
      postedSite: {
        name: 'qiita',
        icon: qiitaIcon,
      },
      title,
      href: url,
      description: '',
      date: new Date(created_at).toLocaleDateString(),
      datetime: created_at,
      tags: tags.map((tag) => ({ name: tag.name, href: '' })),
    }
  })
  return qiitaPosts
}
