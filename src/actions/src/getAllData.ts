'use server'

import { notion } from '@/libraries'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

export async function getAllData(): Promise<QueryDatabaseResponse | undefined> {
  try {
    const allData = await notion.databases.query({
      database_id: process.env.NOTION_PAGE_ID || '',
    })
    return allData
  } catch (error) {
    console.error('getAllDataでデータの取得に失敗しました。', error)
  }
}
