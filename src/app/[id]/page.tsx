import { type JSX, Suspense } from 'react'

import { PostDetailServer } from './_components/postDetailServer'

export const dynamic = 'force-dynamic' // ISR対応
export const revalidate = 3600 // 1時間キャッシュ
export const fetchCache = 'force-cache'

type PageProps = { params: Promise<{ id: string }> }

/**
 * 投稿詳細ページ
 *
 * 動的ルートで投稿IDを受け取り、投稿詳細を表示します。
 *
 * @param props - ページプロパティ
 * @returns 投稿詳細ページコンポーネント
 */

export default async function Page(props: PageProps): Promise<JSX.Element> {
  /* === props === */
  const { id } = await props.params

  /* === return === */
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PostDetailServer id={id} />
    </Suspense>
  )
}
