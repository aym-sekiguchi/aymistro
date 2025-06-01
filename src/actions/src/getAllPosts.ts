'use server'

import { isFullPage } from '@notionhq/client'
import { cache } from 'react'

import {
  DescriptionProperty,
  isMultiSelectProperty,
  TitleProperty,
} from '@/libraries'

import { getAllData } from './getAllData'

export const getAllPosts = cache(async () => {
  try {
    // getAllData関数を呼び出してデータを取得
    const allData = await getAllData()

    // データが取得できなかった場合は空の配列を返す
    if (!allData)
      throw new Error('データの取得には成功しましたが、データがありません。')

    // allData.resultsからpostsを取得
    const results = allData.results

    const allPosts = results.map((result) => {
      if (
        // オブジェクトが完全であるかどうかを判断
        !isFullPage(result) ||
        // 各プロパティが期待される形式であるかどうかを確認
        !isMultiSelectProperty(result.properties.Tags) ||
        !TitleProperty(result.properties.Title) ||
        !DescriptionProperty(result.properties.Description)
      )
        return

      const _createdTime = new Date(result.created_time)
      const createdTime =
        _createdTime.getFullYear() +
        '.' +
        (Number(_createdTime.getMonth()) + 1) +
        '.' +
        _createdTime.getDate()

      return {
        created_time: createdTime,
        description:
          result.properties.Description?.rich_text[0]?.text.content || '',
        id: result.id,
        tags: result.properties.Tags.multi_select,
        title: result.properties.Title.title[0].text.content,
      }
    })

    return allPosts
  } catch (error) {
    // エラーが発生した場合は空の配列を返す
    console.error('getAllPostsでデータの取得に失敗しました。', error)
    return []
  }
})
