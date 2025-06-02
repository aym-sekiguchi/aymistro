import { type JSX, Suspense } from 'react'

import { PostContents } from './postContents'

export const dynamic = 'force-dynamic' // ISR対応
export const revalidate = 3600 // 1時間キャッシュ
export const fetchCache = 'force-cache'

type PageProps = { params: Promise<{ id: string }> }

export default async function Page(props: PageProps): Promise<JSX.Element> {
  /* === props === */
  const { id } = await props.params

  /* === return === */
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PostContents id={id} />
    </Suspense>
  )
}
