import { HtmlElementNode, ListItemNode } from '@jsdevtools/rehype-toc'
import { Node } from 'unist'

export function customizeTOC(toc: HtmlElementNode): Node | boolean | undefined {
  console.log(`tagName: ${toc.tagName}`)
  return toc
}

export function customizeTOCItem(
  tocItem: ListItemNode
): Node | boolean | undefined {
  return tocItem
}
