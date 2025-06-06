export const dynamic = 'force-dynamic'

import { type JSX, Suspense } from 'react'

import { PostListServer } from './_components/postListServer'
import { RecipeCardSkeleton } from './_components/recipeCardSkeleton'

export default function Home(): JSX.Element {
  /* === return === */
  return (
    <Suspense
      fallback={
        <div className='grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8'>
          <RecipeCardSkeleton />
        </div>
      }
    >
      <PostListServer />
    </Suspense>
  )
}
