import { notFound } from 'next/navigation'
import { type JSX } from 'react'

import { getPost } from '@/actions'

import { PostDetailClient } from './postDetailClient'

type PostDetailServerProps = { id: string }

/**
 * 投稿詳細サーバーコンポーネント
 *
 * サーバーサイドで投稿データを取得し、クライアントコンポーネントに渡します。
 * 投稿が見つからない場合は404ページを表示します。
 *
 * @param props - サーバーコンポーネントのプロパティ
 * @param props.id - 取得する投稿のID
 *
 * @returns 投稿詳細を表示するクライアントコンポーネント
 *
 * @throws {notFound} 指定されたIDの投稿が見つからない場合
 *
 */

export async function PostDetailServer(
  props: PostDetailServerProps,
): Promise<JSX.Element> {
  /* === props === */
  const { id } = props

  /* === actions === */
  const post = await getPost({ id })

  if (!post) notFound()

  /* === return === */
  return <PostDetailClient post={post} />
}
