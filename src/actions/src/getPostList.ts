'use server'

import { isFullPage } from '@notionhq/client'
import { cache } from 'react'

import {
  DescriptionProperty,
  isMultiSelectProperty,
  notion,
  TitleProperty,
} from '@/libraries'

export const getPostList = cache(
  async (options: { size?: number; start_cursor?: string } = {}) => {
    /* === options === */
    const { size, start_cursor } = options

    try {
      // データを取得
      const postList = await notion.databases.query({
        database_id: process.env.NOTION_PAGE_ID || '',
        page_size: size,
        start_cursor: start_cursor,
      })

      // データが取得できなかった場合は空の配列を返す
      if (!postList)
        throw new Error('データの取得には成功しましたが、データがありません。')

      // allData.resultsからpostsを取得
      const results = postList.results

      const list = results.map((result) => {
        if (
          // オブジェクトが完全であるかどうかを判断
          !isFullPage(result) ||
          // 各プロパティが期待される形式であるかどうかを確認
          !isMultiSelectProperty(result.properties.Tags) ||
          !TitleProperty(result.properties.Title)
        )
          throw new Error('データの形式が正しくありません。')

        const _createdTime = new Date(result.created_time)
        const createdTime =
          _createdTime.getFullYear() +
          '.' +
          (Number(_createdTime.getMonth()) + 1) +
          '.' +
          _createdTime.getDate()

        return {
          created_time: createdTime,
          description: DescriptionProperty(result.properties.Description)
            ? result.properties.Description?.rich_text[0]?.text.content
            : '',
          id: result.id,
          tags: result.properties.Tags.multi_select.map((tag) => tag.name),
          title: result.properties.Title.title[0].text.content,
        }
      })

      return { list, next_cursor: postList.next_cursor }
    } catch (error) {
      // エラーが発生した場合は空の配列を返す
      console.error('getAllPostsでデータの取得に失敗しました。', error)
      return { list: [], next_cursor: null }
    }
  },
)
