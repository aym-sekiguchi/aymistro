import { type JSX, use, useEffect, useRef } from 'react'

import { Tag } from '@/components'
import { ListContext } from '@/contexts'
import { useDebounce, useFetchPosts } from '@/hooks'

/**
 * タグ選択コンポーネント
 *
 * 投稿のタグを選択して絞り込み検索を行うためのコンポーネントです。
 * タグをクリックすることで選択/解除ができ、選択されたタグに基づいて
 * 投稿リストがフィルタリングされます。
 *
 * @param props - コンポーネントのプロパティ
 * @param props.tags - 選択可能なタグの配列
 * @returns タグ選択UI要素
 *
 */

export function TagSelector(props: { tags: string[] }): JSX.Element {
  /* === props === */
  const { tags } = props

  /* === hooks === */
  const { activeTags, setActiveTags } = use(ListContext)

  const { debouncedValue } = useDebounce<string[]>(activeTags, 750)

  const { fetchPosts } = useFetchPosts()

  // 初回レンダリングかどうかを判定するためのref
  const isInitialRender = useRef(true)

  useEffect(() => {
    // 初回レンダリングの場合はスキップ
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    void fetchPosts()
  }, [debouncedValue]) //eslint-disable-line react-hooks/exhaustive-deps

  /* === handlers === */
  const handleTagClick = (tag: string): void => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }

  /* === return === */
  return (
    <div className='flex flex-wrap gap-2'>
      {tags.map((tag) => (
        <button
          aria-pressed={activeTags.includes(tag)}
          aria-label={`${tag}タグで絞り込み`}
          key={tag}
          onClick={() => handleTagClick(tag)}
          type='button'
          className={`cursor-pointer transition ${activeTags.includes(tag) ? 'hover:opacity-75' : 'opacity-50 grayscale-100 hover:grayscale-50'}`}
        >
          <Tag value={tag} />
        </button>
      ))}
    </div>
  )
}
