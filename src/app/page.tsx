export const dynamic = 'force-dynamic'

import { getAllPosts } from '@/actions'

import type { JSX } from 'react'

export default async function Home(): Promise<JSX.Element> {
  const allPosts = await getAllPosts()

  if (!allPosts || allPosts.length === 0) {
    return <p>No posts found.</p>
  }

  /* === return === */
  return (
    <>
      {allPosts.map((post) => {
        if (!post) return

        const { created_time: createdTime, description, id, tags, title } = post
        return (
          <p key={post.id}>
            {title} | {createdTime} | {description || '説明'} | {id} |{' '}
            {tags.map((tag) => (
              <span key={`${id}-tag-${tag.name}`}>{tag.name}</span>
            ))}
          </p>
        )
      })}
    </>
  )
}
