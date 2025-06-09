import Link from 'next/link'

import { Tag } from '@/components'

import type { JSX } from 'react'

type recipeCard = {
  date: string
  description: string
  id: string
  ref: React.RefObject<HTMLDivElement | null> | null
  tags: string[]
  title: string
}

/**
 * レシピカードコンポーネント
 * ノートパッドスタイルのデザインでレシピ情報を表示するカード
 *
 * 特徴:
 * - 3D効果のある重なったカードデザイン
 * - ホバー時のアニメーション効果
 * - レシピ詳細ページへのリンク機能
 * - タイトル、日付、タグ、説明を表示
 * - リング穴付きノートパッドスタイル
 *
 * @param {recipeCard & React.HTMLAttributes<HTMLDivElement>} props - レシピデータとHTML div属性
 * @returns {JSX.Element} レシピカードのJSX要素
 */

export function RecipeCard(
  props: recipeCard & React.HTMLAttributes<HTMLDivElement>,
): JSX.Element {
  /* === props === */
  const { date, description, id, ref, tags, title, ...rest } = props

  /* === return === */
  return (
    <div className='relative mt-4 h-fit' ref={ref} {...rest}>
      {/* ノートの中身 */}
      <div
        className='shadow-notepad absolute top-0.5 left-0.5 h-full w-full rounded-xl bg-white'
        style={{ zIndex: 300 }}
      ></div>
      <div
        className='shadow-notepad absolute top-1 left-1 h-full w-full rounded-xl bg-white'
        style={{ zIndex: 200 }}
      ></div>

      {/* 裏表紙 */}
      <div
        className='shadow-notepad absolute top-1.5 left-1.5 h-full w-full rounded-xl'
        style={{
          backgroundImage: 'url(/images/recipe-card-cover.webp)',
          zIndex: 100,
        }}
      ></div>

      {/* 表紙 */}
      <Link
        href={`/${id}`}
        className='font-kaisei-decol shadow-notepad notepad-hover relative flex min-h-46.25 origin-top-right flex-col items-center gap-2 rounded-xl px-4 py-2 transition duration-500'
        style={{
          backgroundImage: 'url(/images/recipe-card-cover.webp)',
          zIndex: 400,
        }}
      >
        {/* リング */}
        <div
          className='-mt-4 h-8 w-full bg-contain bg-repeat-space'
          style={{ backgroundImage: 'url(/images/recipe-card-ring.svg)' }}
        ></div>

        {/* タイトル */}
        <p className='font-kaisei-decol text-2xl'>{title}</p>

        <hr className='w-full border-t border-current' />

        {/* 日付 */}
        <p className='w-full text-sm'>{date}</p>

        {/* タグ */}
        <div className='flex w-full flex-wrap gap-1'>
          {tags.map((value) => (
            <Tag key={value} value={value} />
          ))}
        </div>

        {/* 説明 */}
        <p className='w-full truncate'>{description}</p>
      </Link>
    </div>
  )
}
