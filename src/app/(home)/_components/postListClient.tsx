'use client'

import { motion } from 'framer-motion'
import {
  createContext,
  type Dispatch,
  type JSX,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { getPostList } from '@/actions'
import { ListContext } from '@/contexts'
import { useToggle } from '@/hooks'

import { Filter } from './filter'
import { RecipeCard } from './recipeCard'
import { RecipeCardSkeleton } from './recipeCardSkeleton'

// 型定義
export type List = {
  created_time: string
  description: string
  id: string
  tags: string[]
  title: string
}

type PostList = {
  list: (List | undefined)[]
  next_cursor: string | null
  tags: string[]
}

/**
 * 投稿リストクライアントコンポーネント
 * 無限スクロール機能付きでレシピカードのリストを表示する
 *
 * 機能:
 * - レシピカードのグリッド表示
 * - 無限スクロール（Intersection Observer使用）
 * - ローディング状態の管理とスケルトン表示
 * - framer-motionによるフェードインアニメーション
 * - エラーハンドリング
 *
 * @param {PostList} props - 投稿リストのプロパティ
 * @param {(List | undefined)[]} props.list - 表示する投稿のリスト
 * @param {string | null} [props.next_cursor=null] - 次のページ取得用のカーソル
 * @returns {JSX.Element} レスポンシブグリッドレイアウトの投稿リスト
 */

export function PostListClient(props: PostList): JSX.Element {
  /* === props === */
  const { list, next_cursor = null, tags } = props

  /* === hooks === */
  const [postList, setPostList] = useState<PostList['list']>(list)

  const [nextCursor, setNextCursor] = useState<string | null>(next_cursor)

  const [isLoading, setIsLoading] = useToggle(false)

  const [activeTags, setActiveTags] = useState<string[]>(tags)

  const [search, setSearch] = useState<string>('')

  const observerRef = useRef<HTMLDivElement | null>(null)

  /* === functions === */
  // 無限スクロールで投稿を読み込む関数
  const handleLoadMore = useCallback(async (): Promise<void> => {
    // nextCursorがなければそれ以上のpostはないので終了
    if (!nextCursor || isLoading) return

    setIsLoading(true)

    try {
      // postListを取得
      const postList = await getPostList({
        size: 10,
        start_cursor: nextCursor,
        tags: activeTags,
      })

      // postListが取得できなければ終了
      if (!postList.list) return

      // postListが取得できたらpostListを更新
      setPostList((prevPostList) =>
        !prevPostList ? postList.list : [...prevPostList, ...postList.list],
      )

      // 次のカーソルを更新
      setNextCursor(postList.next_cursor)
    } catch (error) {
      console.error('投稿の読み込み中にエラーが発生しました:', error)
    } finally {
      setIsLoading(false)
    }
  }, [
    nextCursor,
    isLoading,
    activeTags,
    setPostList,
    setNextCursor,
    setIsLoading,
  ])

  // Intersection Observerを使用して無限スクロールを実装
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && nextCursor && !isLoading) {
          handleLoadMore().catch((error) => {
            console.error('無限スクロールでエラーが発生しました:', error)
          })
        }
      },
      {
        threshold: 0.1,
      },
    )

    const targetElement = observerRef.current

    if (targetElement) {
      observer.observe(targetElement)
    }

    return (): void => {
      if (targetElement) {
        observer.unobserve(targetElement)
      }
    }
  }, [handleLoadMore, nextCursor, isLoading])

  // ListContextの初期値
  const contextValue = {
    activeTags: activeTags,
    isLoading: false,
    list: postList,
    next_cursor: nextCursor,
    search,
    setActiveTags: setActiveTags,
    setIsLoading: setIsLoading,
    setList: setPostList,
    setNextCursor: setNextCursor,
    setSearch,
  }

  return (
    <ListContext value={contextValue}>
      <Filter tags={tags} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8'
      >
        {postList?.map((post, index) => {
          if (!post) return

          const {
            created_time: createdTime,
            description,
            id,
            tags,
            title,
          } = post
          return (
            <RecipeCard
              ref={index === postList.length - 1 ? observerRef : null}
              key={id}
              date={createdTime}
              description={description}
              tags={tags}
              title={title}
              id={id}
            />
          )
        })}
        {isLoading && <RecipeCardSkeleton />}
      </motion.div>
    </ListContext>
  )
}
