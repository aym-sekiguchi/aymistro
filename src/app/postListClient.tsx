'use client'

import { type JSX, useState } from 'react'

import { getPostList } from '@/actions'

type List = {
  created_time: string
  description: string
  id: string
  tags: string[]
  title: string
}

type PostList = {
  list: (List | undefined)[]
  next_cursor: string | null
}

export function PostListClient(props: PostList): JSX.Element {
  /* === props === */
  const { list, next_cursor = null } = props

  /* === hooks === */
  const [postList, setPostList] = useState<PostList['list']>(list)

  const [nextCursor, setNextCursor] = useState<string | null>(next_cursor)

  /* === functions === */
  async function handleLoadMore(): Promise<void> {
    // nextCursorがなければそれ以上のpostはないので終了
    if (!nextCursor) return

    // postListを取得
    const postList = await getPostList({ size: 10, start_cursor: nextCursor })

    // postListが取得できなければ終了
    if (!postList.list) return

    // postListが取得できたらpostListを更新
    setPostList((prevPostList) =>
      !prevPostList ? postList.list : [...prevPostList, ...postList.list],
    )

    // 次のカーソルを更新
    setNextCursor(postList.next_cursor)
  }

  return (
    <div>
      {postList?.map((post, index) => {
        if (!post) return

        const { created_time: createdTime, description, id, tags, title } = post
        return (
          <p key={id}>
            <a href={`/${id}`}>
              ({index + 1}). {title} | {createdTime} | {description || '説明'} |{' '}
              {id} |{' '}
              {tags.map((tag) => (
                <span key={`${id}-tag-${tag}`}>{tag}</span>
              ))}
            </a>
          </p>
        )
      })}
      <button
        type='button'
        onClick={() => {
          handleLoadMore().catch((error) => {
            console.error('さらに読み込む処理でエラーが発生しました:', error)
          })
        }}
      >
        さらに読み込む
      </button>
    </div>
  )
}
