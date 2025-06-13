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

        if (block && block.type === 'paragraph' && block.parent === '') {
          return {
            ...block,
            parent: '\n', // 空のparagraphを明示的な改行に変換
          }
        }

        // link_to_pageブロックでなければそのまま返す
        if (!(block.type === 'link_to_page')) return result

        // link_to_pageブロックからURLを取得
        const parent = block.parent
        const match = parent.match(/\((https?:\/\/[^)]+)\)/)
        const url = match ? match[1] : null

        // URLがなければそのまま返す
        if (!url) return result

        // URLからリンクページのIDを取得
        const linkPageId = url.replace('https://www.notion.so/', '')

        // IDからリンクページのデータを取得
        const linkPages = await notion.pages.retrieve({
          page_id: linkPageId,
        })

        // リンクページのデータの型があわない場合は処理を終了
        if (!isFullPage(linkPages)) return

        // リンクページタイトルを取得
        const linkPageTitle = TitleProperty(linkPages.properties.Title)
          ? linkPages.properties.Title.title[0]['plain_text']
          : 'No Title'

        // リンクページのタイトルでデータを更新
        result.parent = `[${linkPageTitle}](${url})`

        // 更新したデータを返す
        return result
      }),
    )

    // マークダウン文字列に変換
    const mdString = n2m.toMarkdownString(
      _mdBlocks.filter((block) => {
        return block !== undefined
      }),
    )

    // ページのタイトルを取得
    const title = TitleProperty(pages.properties.Title)
      ? pages.properties.Title.title[0].plain_text
      : 'No Title'

    // ページの説明を取得
    const description = DescriptionProperty(pages.properties.Description)
      ? pages.properties.Description.rich_text[0].plain_text
      : undefined

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
