'use server'

import { isFullPage } from '@notionhq/client'
import { cache } from 'react'

import {
  DescriptionProperty,
  isMultiSelectProperty,
  notion,
  TitleProperty,
} from '@/libraries'

import type { NotionFilterUnion } from '@/types'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

type GetPostListOptions = {
  search?: string
  size?: number
  start_cursor?: string
  tags?: string[]
}

export const getPostList = cache(async (options: GetPostListOptions = {}) => {
  /* === options === */
  const { search, size, start_cursor, tags } = options

  try {
    // フィルター条件を構築
    const filters: NotionFilterUnion[] = []

    // タグフィルター
    if (tags && tags.length > 0) {
      if (tags.length === 1) {
        filters.push({
          multi_select: {
            contains: tags[0],
          },
          property: 'Tags',
        })
      } else {
        filters.push({
          or: tags.map((tag) => ({
            multi_select: {
              contains: tag,
            },
            property: 'Tags',
          })),
        })
      }
    }
    // if (tags && tags.length > 0) {
    //   // 複数のタグがある場合はOR条件で検索
    //   if (tags.length === 1) {
    //     filters = {
    //       multi_select: {
    //         contains: tags[0],
    //       },
    //       property: 'Tags',
    //     }
    //   } else {
    //     filters = {
    //       or: tags.map((tag) => ({
    //         multi_select: {
    //           contains: tag,
    //         },
    //         property: 'Tags',
    //       })),
    //     }
    //   }
    // }

    // 検索フィルター（タイトルまたはDescriptionで検索）
    if (search && search.trim()) {
      filters.push({
        or: [
          {
            property: 'Title',
            title: {
              contains: search.trim(),
            },
          },
          {
            property: 'Description',
            rich_text: {
              contains: search.trim(),
            },
          },
        ],
      })
    }

    // 最終的なフィルター
    let filter: NotionFilterUnion | undefined = undefined
    if (filters.length === 1) {
      filter = filters[0]
    } else if (filters.length > 1) {
      filter = {
        and: filters,
      }
    }

    // データを取得
    const postList = await notion.databases.query({
      database_id: process.env.NOTION_PAGE_ID || '',
      filter: filter as QueryDatabaseParameters['filter'],
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
})
