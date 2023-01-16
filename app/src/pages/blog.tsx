import Head from 'next/head'
import Header from '@/components/organism/Header'
import Posts from '@/components/templates/Posts'
import { NextPage } from 'next'
import { PostCardListProps } from '@/components/organism/PostCardList'
import { GetStaticProps } from 'next'
import {
  fetchPostsFromHatena,
  fetchPostsFromQiita,
  fetchPostsFromZenn,
} from '@/libs/getAllPosts'
import { getEnvVariable } from '@/utils'

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
  // get Zenn Posts
  const zennPosts = await fetchPostsFromZenn()
  // get hatena Posts
  const hatenaPosts = await fetchPostsFromHatena()
  // join haru256 posts, qiita posts and zenn posts
  let posts = qiitaPosts.concat(zennPosts).concat(hatenaPosts)
  posts = posts
    .sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    )
    .reverse()
  return {
    props: {
      posts,
    },
  }
}
