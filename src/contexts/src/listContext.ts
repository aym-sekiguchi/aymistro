'use client'

import { createContext } from 'react'

import type { List } from '@/app/(home)/_components/postListClient'
import type { Dispatch, SetStateAction } from 'react'

export type ListContextType = {
  activeTags: string[]
  isLoading?: boolean
  list: (List | undefined)[]
  next_cursor: string | null
  search: string
  setActiveTags: Dispatch<SetStateAction<string[]>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setList: Dispatch<SetStateAction<(List | undefined)[]>>
  setNextCursor: Dispatch<SetStateAction<string | null>>
  setSearch: Dispatch<SetStateAction<string>>
}

/**
 * リスト状態管理用のReactコンテキスト
 *
 * @description
 * ホーム画面での投稿一覧表示、検索、フィルタリング機能で使用される状態を一元管理するコンテキスト
 *
 * 管理する状態:
 * - activeTags: アクティブなタグフィルター配列
 * - isLoading: ローディング状態のフラグ
 * - list: 表示する投稿リストデータ
 * - next_cursor: ページネーション用のカーソル文字列
 * - search: 検索キーワード文字列
 *
 * 提供する更新関数:
 * - setActiveTags: アクティブタグを更新
 * - setIsLoading: ローディング状態を切り替え
 * - setList: 投稿リストを更新
 * - setNextCursor: ページネーションカーソルを更新
 * - setSearch: 検索キーワードを更新
 *
 * @default 初期値として空の配列・文字列とno-op関数を設定
 */

export const ListContext = createContext<ListContextType>({
  activeTags: [],
  isLoading: false,
  list: [],
  next_cursor: null,
  search: '',
  setActiveTags: () => {},
  setIsLoading: () => {},
  setList: () => {},
  setNextCursor: () => {},
  setSearch: () => {},
})
