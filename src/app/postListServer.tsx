import { type JSX } from 'react'

import { getPostList } from '@/actions'

import { PostListClient } from './postListClient'

export async function PostListServer(): Promise<JSX.Element> {
  const { list, next_cursor } = await getPostList({ size: 10 })

  /* === return === */
  return <PostListClient list={list} next_cursor={next_cursor} />
}
