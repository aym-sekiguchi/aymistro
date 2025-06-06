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
