import { FC } from 'react'
import Link from 'next/link'
import React from 'react'

type MdxLinkProps = {
  href: string
  children: React.ReactNode
}

const MdxLink: FC<MdxLinkProps> = ({ href, children }) => {
  const isExternalLink = /^http(s)*:\/\//.test(href)

  return (
    <Link
      href={href}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  )
}

export default MdxLink
