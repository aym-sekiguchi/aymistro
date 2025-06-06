'use client'

import { type JSX, use, useEffect, useRef } from 'react'

import { ListContext } from '@/contexts'
import { useDebounce, useFetchPosts } from '@/hooks'

/**
 *
 * 検索バーコンポーネント
 *
 * @description
 * - キーワード検索機能を提供
 * - デバウンス機能により入力後1秒で検索実行
 * - タイトルまたはDescriptionに含まれる文字列で投稿を検索
 * - 検索アイコン付きの入力フィールド
 *
 * @returns {JSX.Element} 検索入力フィールドとアイコンを含むコンポーネント
 *
 *
 */

export function SearchBar(): JSX.Element {
  /* === hooks === */
  const { search, setSearch } = use(ListContext)

  const { debouncedValue } = useDebounce<string>(search, 1000)

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
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearch(event.target.value)
  }

  /* === return === */
  return (
    <div className='relative mb-4 w-full max-w-xs'>
      <span className='absolute inset-y-0 left-2 my-auto h-fit'>
        <SearchIcon />
      </span>
      <input
        className='w-full rounded-xl border-2 bg-white py-1 pr-1 pl-6 text-sm'
        style={{ borderColor: 'rgba(68, 24, 0, 0.5)' }}
        value={search}
        type='text'
        placeholder='キーワードで検索'
        onChange={handleInputChange}
        aria-label='投稿を検索'
      />
    </div>
  )
}

function SearchIcon(): JSX.Element {
  /* === return === */
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='size-4'
    >
      <path
        fillRule='evenodd'
        d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
        clipRule='evenodd'
      />
    </svg>
  )
}
