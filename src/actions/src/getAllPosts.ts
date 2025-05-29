'use server'

import { cache } from 'react'

import { getAllData } from './getAllData'

import type {
  PageObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export const getAllPosts = cache(async () => {
  function isMultiSelectProperty(prop: { [key: string]: unknown }): prop is {
    id: string
    multi_select: Array<TextRichTextItemResponse>
    type: 'multi_select'
  } {
    return prop.type === 'multi_select'
  }

  function TitleProperty(prop: { [key: string]: unknown }): prop is {
    id: string
    title: Array<TextRichTextItemResponse>
    type: 'title'
  } {
    return prop.type === 'title'
  }

  function DescriptionProperty(prop: { [key: string]: unknown }): prop is {
    id: string
    rich_text: Array<TextRichTextItemResponse>
    type: 'rich_text'
  } {
    return prop.type === 'rich_text'
  }

  try {
    // getAllData関数を呼び出してデータを取得
    const allData = await getAllData()

    // データが取得できなかった場合は空の配列を返す
    if (!allData)
      throw new Error('データの取得には成功しましたが、データがありません。')

    // allData.resultsからpostsを取得
    const results = allData.results as PageObjectResponse[]

    const allPosts = results.map((post) => {
      if (
        isMultiSelectProperty(post.properties.Tags) &&
        TitleProperty(post.properties.Title) &&
        DescriptionProperty(post.properties.Description)
      ) {
        const _createdTime = new Date(post.created_time)
        const createdTime =
          _createdTime.getFullYear() +
          '.' +
          (Number(_createdTime.getMonth()) + 1) +
          '.' +
          _createdTime.getDate()
        return {
          created_time: createdTime,
          description:
            post.properties.Description?.rich_text[0]?.text.content || '',
          id: post.id,
          tags: post.properties.Tags.multi_select,
          title: post.properties.Title.title[0].text.content,
        }
      }
    })

    return allPosts
  } catch (error) {
    // エラーが発生した場合は空の配列を返す
    console.error('getAllPostsでデータの取得に失敗しました。', error)
    return []
  }
})
