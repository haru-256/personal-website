import Head from 'next/head'
import { NextPage } from 'next'
import { PostCardListProps } from '@/components/organism/PostCards'
import { GetStaticProps } from 'next'
import {
  fetchBlogPostCardsFromHatena,
  fetchBlogPostCardsFromQiita,
  fetchBlogPostCardsFromZenn,
} from '@/libs/getAllPosts'
import { fetchBlogPostCardsFromContentful } from '@/graphql/apollo'
import { getEnvVariable } from '@/utils'
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
  const qiitaPosts = await fetchBlogPostCardsFromQiita(qiitaToken)
  // get Zenn Posts
  const zennPosts = await fetchBlogPostCardsFromZenn()
  // get hatena Posts
  const hatenaPosts = await fetchBlogPostCardsFromHatena()
  // get haru256 Posts
  const haru256Posts = await fetchBlogPostCardsFromContentful()
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
