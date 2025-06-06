'use client'

import { motion } from 'framer-motion'

import type { JSX } from 'react'

/**
 * レシピカードのスケルトンコンポーネント
 * データの読み込み中にプレースホルダーとして表示される
 *
 * @returns 2つのスケルトンカードを含むJSX要素
 */

export function RecipeCardSkeleton(): JSX.Element {
  /* === return === */
  return (
    <>
      <Skeleton />
      <Skeleton />
    </>
  )
}

function Skeleton(): JSX.Element {
  return (
    <motion.div
      className='mt-4 h-fit animate-pulse'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex min-h-46.25 flex-col gap-2 rounded-xl bg-[#e8e1d4] px-4 pt-8 pb-2'>
        {/* タイトル */}
        <div className='h-[calc(2/1.5*1em)] w-full rounded-full bg-[#d5c9b4] text-2xl' />

        <hr className='w-full border-t border-[#d5c9b4]' />

        {/* 日付 */}
        <div className='h-[1.4286em] w-[10em] rounded-full bg-[#d5c9b4] text-sm' />

        {/* タグ */}
        <div className='flex h-[calc(1.4285714286em+0.5rem)] w-[calc(3em+2.5rem)] flex-wrap gap-1 rounded-full bg-[#d5c9b4] text-sm' />

        {/* 説明 */}
        <div className='h-[1.5em] w-full rounded-full bg-[#d5c9b4]' />
      </div>
    </motion.div>
  )
}
