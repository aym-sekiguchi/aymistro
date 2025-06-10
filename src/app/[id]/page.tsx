import { notFound } from 'next/navigation'
import { type JSX, Suspense } from 'react'

import { getPost } from '@/actions'
import { createMetadata } from '@/setup'

import { BackToListButton } from './_components/backToListButton'
import { PostDetailServer } from './_components/postDetailServer'
import { RecipePageSkeleton } from './_components/recipePageskeleton'
import { RefreshPostButton } from './_components/refreshPostButton'

import type { Metadata } from 'next'

export const dynamic = 'force-dynamic' // ISR対応
export const revalidate = 3600 // 1時間キャッシュ
export const fetchCache = 'force-cache'

type PageProps = { params: Promise<{ id: string }> }

// metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params

  const post = await getPost({ id })

  if (!post) notFound()

  return createMetadata({
    description: post.description || `「${post.title}」の詳細ページです。`,
    path: id,
    title: post.title,
  })
}

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
    <>
      <BackToListButton />
      <Suspense fallback={<RecipePageSkeleton />}>
        <PostDetailServer id={id} />
      </Suspense>
      <RefreshPostButton id={id} />
    </>
  )
}
