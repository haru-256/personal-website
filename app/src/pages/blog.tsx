import Head from 'next/head'
import Header from '@/components/organism/Header'
import Posts from '@/components/templates/Posts'
import { NextPage } from 'next'
import zennIcon from 'public/zenn.ico'
import qiitaIcon from 'public/qiita.png'
import haru256Icon from 'public/icon.png'
import { PostCardListProps } from '@/components/organism/PostCardList'
import { GetStaticProps } from 'next'
import { fetchPostsFromQiita } from '@/libs/getAllPosts'
import { getEnvVariable } from '@/utils'
import { PostType } from '@/types'

const localPosts: PostType[] = [
  {
    postedSite: {
      name: 'haru256.dev',
      icon: haru256Icon,
    },
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    tags: [
      {
        href: '#',
        name: 'React',
      },
      {
        href: '#',
        name: 'NextJS',
      },
    ],
  },
  {
    postedSite: {
      name: 'zenn.dev',
      icon: zennIcon,
    },
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    description:
      'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    tags: [
      {
        href: '#',
        name: 'React',
      },
    ],
  },
  {
    postedSite: {
      name: 'qiita',
      icon: qiitaIcon,
    },
    title: 'Improve your customer experience',
    href: '#',
    description:
      'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    tags: [
      {
        href: '#',
        name: 'React',
      },
    ],
  },
  {
    postedSite: {
      name: 'zenn.dev',
      icon: zennIcon,
    },
    title: 'Writing effective landing page copy',
    href: '#',
    description:
      'Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.',
    date: 'Jan 29, 2020',
    datetime: '2020-01-29',
    tags: [
      {
        href: '#',
        name: 'React',
      },
    ],
  },
]

const Blog: NextPage<PostCardListProps> = (props) => {
  const { posts } = props
  return (
    <>
      <Head>
        <title>Blog - haru256.dev</title>
        <meta key="description" name="description" content="Blog Post" />
      </Head>
      <div className="inset-0 flex justify-center sm:px-[5rem]">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
            <Header
              tabs={[
                { name: 'Home', href: '/', isHighlight: false },
                { name: 'Blog', href: '/blog', isHighlight: true },
                { name: 'Project', href: '/project', isHighlight: false },
                { name: 'About', href: '/about', isHighlight: false },
              ]}
            />
            <Posts posts={posts} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog

export const getStaticProps: GetStaticProps<PostCardListProps> = async () => {
  // get Qiita Posts
  const qiitaToken = getEnvVariable('QIITA_TOKEN')
  const qiitaPosts = await fetchPostsFromQiita(qiitaToken)
  // join haru256 posts, qiita posts and zenn posts
  const posts = localPosts.concat(qiitaPosts)
  return {
    props: {
      posts,
    },
  }
}
