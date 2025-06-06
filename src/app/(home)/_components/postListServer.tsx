import { type JSX } from 'react'

import { getPostList, getTags } from '@/actions'

import { PostListClient } from './postListClient'

/**
 * サーバーサイドで投稿リストを取得するコンポーネント
 *
 * 機能:
 * - サーバーサイドで投稿データを事前取得
 * - 初期表示用に10件の投稿を取得
 * - 取得したデータをクライアントコンポーネントに渡す
 * - ページネーション用のnext_cursorも含む
 *
 * @async
 * @function PostListServer
 * @returns {Promise<JSX.Element>} 投稿リストクライアントコンポーネントを含むPromise
 * @throws {Error} 投稿データの取得に失敗した場合
 */

export async function PostListServer(): Promise<JSX.Element> {
  const { list, next_cursor } = await getPostList({ size: 10 })

  const tags = await getTags()

  /* === return === */
  return <PostListClient list={list} next_cursor={next_cursor} tags={tags} />
}
