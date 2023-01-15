import { StaticImageData } from 'next/image'

export type PostType = {
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
