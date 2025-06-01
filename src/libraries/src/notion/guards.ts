import type { TextRichTextItemResponse } from '@notionhq/client'

export function isMultiSelectProperty(prop: {
  [key: string]: unknown
}): prop is {
  id: string
  multi_select: Array<TextRichTextItemResponse>
  type: 'multi_select'
} {
  return prop.type === 'multi_select'
}

export function TitleProperty(prop: { [key: string]: unknown }): prop is {
  id: string
  title: Array<TextRichTextItemResponse>
  type: 'title'
} {
  return prop.type === 'title'
}

export function DescriptionProperty(prop: { [key: string]: unknown }): prop is {
  id: string
  rich_text: Array<TextRichTextItemResponse>
  type: 'rich_text'
} {
  return prop.type === 'rich_text'
}
