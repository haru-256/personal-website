import Head from 'next/head'
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
      <Posts posts={posts} />
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
