export const dynamic = 'force-dynamic'

import { type JSX, Suspense } from 'react'

import { PostListServer } from './postListServer'

export default function Home(): JSX.Element {
  /* === return === */
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PostListServer />
    </Suspense>
  )
}
