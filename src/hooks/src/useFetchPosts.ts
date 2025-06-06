import { use } from 'react'

import { getPostList } from '@/actions'
import { ListContext } from '@/contexts'

/**
 * 投稿データを取得するためのカスタムフック
 *
 * @description
 * - タグと検索キーワードによるフィルタリング機能
 * - ローディング状態の管理
 * - エラーハンドリング
 * - リストの初期化とカーソル管理
 *
 * @returns オブジェクト
 * @returns fetchPosts - 投稿データを取得する非同期関数
 *
 */

export function useFetchPosts(): { fetchPosts: () => Promise<void> } {
  const { activeTags, search, setIsLoading, setList, setNextCursor } =
    use(ListContext)

  const fetchPosts = async (): Promise<void> => {
    try {
      // ローディング状態を設定
      setIsLoading(true)

      // 一旦リストを空にする
      setList([])

      // 選択されたタグと検索キーワードに基づいて投稿を取得
      const postList = await getPostList({
        search,
        size: 10,
        tags: activeTags.length > 0 ? activeTags : undefined,
      })

      // 取得した投稿リストをセット
      setList(postList.list)

      // 次のカーソルをセット
      setNextCursor(postList.next_cursor)
    } catch (error) {
      // エラーメッセージ
      console.error('fetchPostsで失敗しました。', error)

      // エラー時は空のリストをセット
      setList([])
      setNextCursor(null)
    } finally {
      // ローディング状態を解除
      setIsLoading(false)
    }
  }

  return { fetchPosts }
}
