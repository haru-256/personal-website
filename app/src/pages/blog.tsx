import Head from 'next/head'
import { NextPage } from 'next'
import { PostCardListProps } from '@/components/organism/PostCardList'
import { GetStaticProps } from 'next'
import {
  fetchPostsFromHatena,
  fetchPostsFromQiita,
  fetchPostsFromZenn,
  fetchPostsFromContentful,
} from '@/libs/getAllPosts'
import { getEnvVariable } from '@/utils'
import initApolloClient from '@/graphql/apollo-client'
import Posts from '@/components/templates/Posts'

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
  // get haru256 Posts
  const haru256Posts = await fetchPostsFromContentful(initApolloClient())
  // join haru256 posts, qiita posts and zenn posts
  let posts = haru256Posts
    .concat(zennPosts)
    .concat(qiitaPosts)
    .concat(hatenaPosts)
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
