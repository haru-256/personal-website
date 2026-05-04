import { StaticImageData } from 'next/image'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type BlogPostCard = {
  postedSite: {
    name: string
    icon: StaticImageData
  }
  title: string
  href: string
  description: string
  date: string
  datetime: string
  tags: {
    href: string
    name: string
  }[]
}

export type BlogPost = {
  title: string
  description: string
  date: string
  body: MDXRemoteSerializeResult
  tags: {
    href: string
    name: string
  }[]
}

export type RawBlogPost = Omit<BlogPost, 'body'> & { body: string }
