import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import {
  initApolloClient,
  fetchBlogPostSlugs,
  fetchBlogPost,
} from '@/graphql/apollo'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { BlogPost } from '@/types'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkEmoji from 'remark-emoji'
// TODO: table of content をカスタムする
// import rehypeToc from '@jsdevtools/rehype-toc'
// import { customizeTOC, customizeTOCItem } from '@/libs/custom-rehype-toc'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import PostHeader from '@/components/molecules/PostHeader'
import MdxImage from '@/components/atoms/MdxImage'
import MdxLink from '@/components/atoms/MdxLink'

type PostProps = {
  post: BlogPost
}

const components = {
  a: MdxLink,
  Image: MdxImage,
}

const Post: NextPage<PostProps> = (props) => {
  const { post } = props
  const headTitle = `${post.title} - haru256.dev`

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta key="description" name="description" content={post.description} />
      </Head>
      <div className="relative overflow-hidden bg-white py-16">
        <div className="relative  px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <PostHeader
              title={post.title}
              date={post.date}
              description={post.description}
              tags={post.tags}
            />
          </div>
          <div className="mt-10">
            <article className="prose prose-lg prose-indigo mx-auto text-zinc-900 prose-code:before:content-none prose-code:after:whitespace-pre prose-code:after:content-none prose-pre:mt-[-0.15em] prose-pre:rounded-tl-none md:prose-pre:mt-[-0.15em]">
              <MDXRemote {...post.body} components={components} />
            </article>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initApolloClient()
  const slugs = await fetchBlogPostSlugs(client, 0)
  const paths = slugs.map((slug) => ({
    params: {
      slug,
    },
  }))

  return { paths, fallback: false }
}

interface PostParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (
  context
) => {
  if (!context.params?.slug) throw new Error()

  const client = initApolloClient()
  const slug = context.params.slug
  const blogPost = await fetchBlogPost(client, slug)
  const body = await serialize(blogPost.body, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath, remarkEmoji],
      rehypePlugins: [
        [rehypePrettyCode, options],
        rehypeKatex,
        rehypeSlug,
        // [rehypeToc, { customizeTOC, customizeTOCItem }],
      ],
    },
  })

  return {
    props: {
      post: {
        ...blogPost,
        body: body,
      },
    },
  }
}

const options = {
  theme: 'dracula',
}
