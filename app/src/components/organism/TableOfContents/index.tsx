import { FC } from 'react'
import { parse } from 'node-html-parser'
import TableOfContentHeading from '@/components/atoms/TableOfContentHeading'

type TableOfContentsProps = {
  path: string
  htmlSource: string
}

const TableOfContents: FC<TableOfContentsProps> = (props) => {
  const { path, htmlSource } = props
  const root = parse(htmlSource)
  const h2Nodes = root.querySelectorAll('h2')

  return (
    <nav className="flex flex-col gap-3 rounded-lg p-3" aria-label="toc">
      <div className="text-base font-bold text-gray-600">TABLE OF CONTENTS</div>
      <ul className="list-disc">
        {h2Nodes.map((h2Node) => (
          <TableOfContentHeading
            key={h2Node.id}
            path={path}
            headingNode={h2Node}
          />
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
