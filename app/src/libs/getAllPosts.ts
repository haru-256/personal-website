import axios from 'axios'
import qiitaIcon from 'public/qiita.png'
import zennIcon from 'public/zenn.png'
import hatenaIcon from 'public/hatena.png'
import { BlogPostCard } from '@/types'
import { load as cheerioLoad } from 'cheerio'

type QiitaBlogPostCard = {
  title: string
  created_at: string
  url: string
  tags: [{ name: string }]
}

export async function fetchBlogPostCardsFromQiita(
  token: string
): Promise<BlogPostCard[]> {
  const { data } = await axios.get<QiitaBlogPostCard[]>(
    'https://qiita.com/api/v2/authenticated_user/items',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const qiitaBlogPostCards: BlogPostCard[] = data.map((qiitaBlogPostCard) => {
    const { title, url, created_at, tags } = qiitaBlogPostCard
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
  return qiitaBlogPostCards
}

type zennBlogPostCard = {
  articles: {
    path: string
    title: string
    emoji: string
    published_at: string
  }[]
}

export async function fetchBlogPostCardsFromZenn(): Promise<BlogPostCard[]> {
  const { data } = await axios.get<zennBlogPostCard>(
    'https://zenn.dev/api/articles?username=haru256'
  )
  const { articles } = data

  const zennBlogPostCards: BlogPostCard[] = await Promise.all(
    articles.map(async (article) => {
      const { path, title, published_at } = article
      const url = `https://zenn.dev${path}`
      const tags = await parseZennBlogPostCard(url)
      return {
        postedSite: {
          name: 'zenn.dev',
          icon: zennIcon,
        },
        title,
        href: url,
        description: '',
        date: new Date(published_at).toLocaleDateString(),
        datetime: published_at,
        tags,
      }
    })
  )
  return zennBlogPostCards
}

async function parseZennBlogPostCard(url: string) {
  const { data } = await axios.get(url)
  const $ = cheerioLoad(data)
  const re = new RegExp('^View_topicName__.+$')
  const tags: { name: string; href: string }[] = []
  $('div')
    .filter((_, el) => re.test(el.attribs.class))
    .each((i, el) => {
      tags[i] = { name: $(el).text(), href: '' }
    })
  return tags
}

export async function fetchBlogPostCardsFromHatena(): Promise<BlogPostCard[]> {
  const monotaroURLs = [
    'https://tech-blog.monotaro.com/entry/2022/06/30/090000',
  ]
  const hatenaBlogPostCards: BlogPostCard[] = await Promise.all(
    monotaroURLs.map(async (url) => {
      const { title, date, datetime, tags } =
        await parseMonotaroHatenaBlogPostCard(url)
      return {
        postedSite: {
          name: 'hatena.blog.com',
          icon: hatenaIcon,
        },
        title,
        href: url,
        description: '',
        date: date,
        datetime: datetime,
        tags,
      }
    })
  )
  return hatenaBlogPostCards
}

async function parseMonotaroHatenaBlogPostCard(url: string) {
  const { data } = await axios.get(url)
  const $ = cheerioLoad(data)
  // get title
  const titleReg = new RegExp('entry-title-link')
  const title = $('a')
    .filter((_, el) => titleReg.test(el.attribs.class))
    .text()
  // get date and datetime
  const result = url.match(/entry\/(\d+\/\d+\/\d+)\/\d+$/)
  let dateString: string
  let datetimeString: string
  if (result) {
    const dateStringList = result[1].split('/').map((d) => parseInt(d))
    const date = new Date(
      dateStringList[0],
      dateStringList[1],
      dateStringList[2]
    )
    dateString = date.toLocaleDateString()
    datetimeString = date.toISOString()
  } else {
    throw Error('datetime is not found')
  }
  // get tags
  const tagRe = new RegExp('entry-category-link')
  const tags: { name: string; href: string }[] = []
  $('a')
    .filter((_, el) => tagRe.test(el.attribs.class))
    .each((i, el) => {
      tags[i] = { name: $(el).text(), href: '' }
    })

  return {
    title,
    date: dateString,
    datetime: datetimeString,
    tags,
  }
}
