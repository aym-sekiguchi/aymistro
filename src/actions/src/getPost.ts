import { isFullPage } from '@notionhq/client'
import { cache } from 'react'

import {
  DescriptionProperty,
  isMultiSelectProperty,
  n2m,
  notion,
  TitleProperty,
} from '@/libraries'

export const getPost = cache(async (options: { id: string }) => {
  /* === options === */
  const { id } = options

  try {
    // ページ情報を取得
    const pages = await notion.pages.retrieve({
      page_id: id,
    })

    // ページ情報の型があわない場合は処理を終了
    if (!isFullPage(pages)) return

    const mdBlocks = await n2m.pageToMarkdown(id)

    // linkページのタイトルを取得
    const _mdBlocks = await Promise.all(
      mdBlocks.map(async (block) => {
        const result = { ...block }
        if (!(block.type === 'link_to_page')) return result
        console.log(block.parent)
        const parent = block.parent
        const match = parent.match(/\((https?:\/\/[^)]+)\)/)
        const url = match ? match[1] : null
        if (!url) return result
        const linkPageId = url.replace('https://www.notion.so/', '')
        const linkPages = await notion.pages.retrieve({
          page_id: linkPageId,
        })
        if (!isFullPage(linkPages)) return
        const linkPageTitle = TitleProperty(linkPages.properties.Title)
          ? linkPages.properties.Title.title[0]['plain_text']
          : 'No Title'
        result.parent = `[${linkPageTitle}](${url})`
        return result
      }),
    )
    const mdString = n2m.toMarkdownString(
      _mdBlocks.filter((block) => block !== undefined),
    )

    const title = TitleProperty(pages.properties.Title)
      ? pages.properties.Title.title[0].plain_text
      : 'No Title'

    const description = DescriptionProperty(pages.properties.Description)
      ? pages.properties.Description.rich_text[0].plain_text
      : 'No Description'

    return {
      contents: mdString.parent,
      createdTime: pages.created_time,
      description,
      lastEditedTime: pages.last_edited_time,
      tags: isMultiSelectProperty(pages.properties.Tags)
        ? pages.properties.Tags['multi_select'].map((tag) => tag.name)
        : [],
      title,
    }
  } catch (error) {
    console.error('getPostでデータの取得に失敗しました。', error)
    return
  }
})
