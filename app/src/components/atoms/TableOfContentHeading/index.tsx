import { FC } from 'react'
import Link from 'next/link'
import { HTMLElement } from 'node-html-parser'

type TableOfContentHeadingProps = {
  path: string
  headingNode: HTMLElement
}

const TableOfContentHeading: FC<TableOfContentHeadingProps> = (props) => {
  const { path, headingNode } = props

  const headingName = headingNode.textContent
  const headingID = headingNode.id

  return (
    <li className="rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
      <Link href={`${path}#${headingID}`}>{headingName}</Link>
    </li>
  )
}

export default TableOfContentHeading
