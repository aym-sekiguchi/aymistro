import { CardShadowLayers, NotePadRing, RecipeContent } from './recipePage'

import type { JSX } from 'react'

/**
 * レシピページのスケルトンローディングコンポーネント
 *
 * レシピページがロード中の際に表示されるスケルトン画面を提供します。
 * ノートパッド風のデザインで、以下の要素のプレースホルダーを表示：
 * - タイトル
 * - 作成日
 * - タグ
 * - 説明文
 * - レシピ内容（3行分）
 *
 * @returns {JSX.Element} レシピページのスケルトン画面
 */

export function RecipePageSkeleton(): JSX.Element {
  /* === return === */
  return (
    <div className='relative mt-4 h-fit'>
      <CardShadowLayers />

      {/* 内容 */}
      <div className='shadow-notepad relative z-400 rounded-xl bg-white p-4 md:p-8'>
        <NotePadRing />

        <div className='animate-pulse'>
          {/* タイトル */}
          <div className='font-kaisei-decol border-b border-dashed pb-2 text-center text-2xl md:text-3xl'>
            <div className='h-[calc(2/1.5*1em)] rounded-full bg-[#d5c9b4] md:h-[calc(2.25/1.875*1em)]' />
          </div>

          {/* 作成日 */}
          <p className='font-kaisei-decol my-2 h-[calc(1.25/0.875*1em)] rounded-full bg-[#d5c9b4] text-right text-sm' />

          {/* タグ */}
          <div className='flex h-[calc(1.4285714286em+0.5rem)] w-[calc(3em+2.5rem)] flex-wrap gap-1 rounded-full bg-[#d5c9b4] text-sm' />

          {/* 説明 */}
          <div className='my-2 bg-[#fefbef] p-2 shadow-md'>
            <div className='h-[1.5em] rounded-full bg-[#d5c9b4]' />
          </div>

          {/* 内容 */}
          <RecipeContent>
            <>
              {[...Array(3).keys()].map((i) => (
                <div
                  className='flex h-[2.5rem] items-center'
                  key={`skeleton-line-${i}`}
                >
                  <div className='h-[2rem] w-full rounded-full bg-[#d5c9b4]' />
                </div>
              ))}
            </>
          </RecipeContent>
        </div>
      </div>
    </div>
  )
}
