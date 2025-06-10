import { RecipePage } from './recipePage'

import type { JSX } from 'react'

export type PostDetailClientProps = {
  post: {
    contents: string
    createdTime: string
    description: string | undefined
    lastEditedTime: string
    tags: string[]
    title: string
  }
}

/**
 * 投稿詳細クライアントコンポーネント
 *
 * サーバーコンポーネントから受け取った投稿データを
 * レシピページコンポーネントに渡してレンダリングします。
 * クライアントサイドでの処理が必要な場合の橋渡し役として機能します。
 *
 * @param props - クライアントコンポーネントのプロパティ
 * @param props.post - 表示する投稿データ
 * @param props.post.contents - Markdown形式の投稿内容
 * @param props.post.createdTime - 投稿作成日時（ISO形式）
 * @param props.post.description - 投稿の説明文（オプション）
 * @param props.post.lastEditedTime - 最終編集日時（ISO形式）
 * @param props.post.tags - 投稿に付与されたタグの配列
 * @param props.post.title - 投稿のタイトル
 *
 * @returns レシピページとしてレンダリングされた投稿詳細
 */

export function PostDetailClient(props: PostDetailClientProps): JSX.Element {
  /* === props === */
  const { post } = props

  /* === return === */
  return <RecipePage post={post} />
}
