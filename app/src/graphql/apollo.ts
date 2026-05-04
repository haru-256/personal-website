import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { HttpLink, from } from '@apollo/client'
import haru256Icon from 'public/icon.png'
import {
  BlogPostIDsDocument,
  BlogPostCardsDocument,
  BlogPostDocument,
} from './generated/graphql'
import { BlogPostCard, BlogPost, RawBlogPost } from '@/types'

const limit = 100

export function initApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_CONTENTFUL_ENDPOINT,
  })
  const setAuthorizationLink = setContext((_, previousContext) => {
    const { headers } = previousContext
    return {
      ...previousContext,
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
      },
    }
  })

  const cache = new InMemoryCache()
  const client = new ApolloClient({
    link: from([setAuthorizationLink, httpLink]),
    cache: cache,
  })

  return client
}

type BlogPostSlugGraphQL = {
  slug: string
}

export async function fetchBlogPostSlugs(
  client: ApolloClient<NormalizedCacheObject>,
  page: number
) {
  const { data, error } = await client.query({
    query: BlogPostIDsDocument,
    variables: { limit, page },
  })
  if (error) {
    throw error
  }

  let blogPostSlugs: string[]
  if (data.blogPostCollection) {
    blogPostSlugs = data.blogPostCollection.blogs
      .filter(
        (p): p is BlogPostSlugGraphQL =>
          p !== undefined && p?.slug !== undefined
      )
      .map((p) => p.slug)
  } else {
    blogPostSlugs = []
  }

  return blogPostSlugs
}

type BlogPostCardGraphQL = {
  slug: string
  title: string
  description: string
  publishDate: string
  tagCollection: {
    tags: {
      slug: string
      name: string
    }[]
  }
}

export async function fetchBlogPostCards(
  client: ApolloClient<NormalizedCacheObject>,
  slugs: string[]
) {
  const { data, error } = await client.query({
    query: BlogPostCardsDocument,
    variables: { slugs },
  })
  if (error) {
    throw error
  }

  let blogPostCards: BlogPostCard[]
  if (data.blogPostCollection) {
    blogPostCards = data.blogPostCollection.blogs
      .filter((e): e is BlogPostCardGraphQL => e !== undefined)
      .map((e) => ({
        postedSite: {
          name: 'haru256.dev',
          icon: haru256Icon,
        },
        title: e.title,
        href: `/blog/${e.slug}`,
        description: e.description,
        date: new Date(e.publishDate).toLocaleDateString(),
        datetime: e.publishDate,
        tags: e.tagCollection.tags.map((e) => ({
          name: e.name,
          href: `/blog?tag=${e.slug}`,
        })),
      }))
  } else {
    blogPostCards = []
  }

  return blogPostCards
}

export async function fetchBlogPostCardsFromContentful() {
  const client = initApolloClient()
  const slugs = await fetchBlogPostSlugs(client, 0)
  const blogPostCards = await fetchBlogPostCards(client, slugs)
  return blogPostCards
}

type BlogPostGraphQL = {
  slug: string
  title: string
  description: string
  publishDate: string
  body: string
  tagCollection: {
    tags: {
      slug: string
      name: string
    }[]
  }
}
export async function fetchBlogPost(
  client: ApolloClient<NormalizedCacheObject>,
  slug: string
): Promise<RawBlogPost> {
  const { data, error } = await client.query({
    query: BlogPostDocument,
    variables: { slug },
  })
  if (error) {
    throw error
  }

  if (!data.blogPostCollection) throw new Error(`not found, slug: ${slug}`)

  const blogPosts = data.blogPostCollection.blogs
    .filter((e): e is BlogPostGraphQL => e !== undefined)
    .map((e) => ({
      title: e.title,
      description: e.description,
      date: new Date(e.publishDate).toLocaleDateString(),
      body: e.body,
      tags: e.tagCollection.tags.map((e) => ({
        name: e.name,
        href: `/blog?tag=${e.slug}`,
      })),
    }))

  if (blogPosts.length !== 1) throw new Error(`not unique, slug: ${slug}`)

  return blogPosts[0]
}
