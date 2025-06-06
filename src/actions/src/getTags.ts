'use server'

import { cache } from 'react'

import { notion } from '@/libraries'

export const getTags = cache(async () => {
  try {
    // データベースのメタデータを取得
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_PAGE_ID || '',
    })

    // Tagsプロパティの選択肢を取得
    const tagsProperty = database.properties.Tags

    if (tagsProperty?.type === 'multi_select') {
      return tagsProperty.multi_select.options
        .map((option) => option.name)
        .sort()
    }

    return []
  } catch (error) {
    console.error('getTagsでデータの取得に失敗しました。', error)
    return []
  }
})
