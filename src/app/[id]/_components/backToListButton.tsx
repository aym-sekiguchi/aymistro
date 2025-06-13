import Link from 'next/link'

import type { JSX } from 'react'

/**
 * 一覧ページへの戻るボタンを表示するコンポーネントです。
 *
 * 画面右下に固定表示され、クリックするとトップページ（一覧）へ遷移します。
 * ボタンには左向きのUターン矢印アイコンと「一覧に戻る」というテキストが表示されます。
 *
 * @returns {JSX.Element} 一覧に戻るボタンのReact要素
 */

export function BackToListButton(): JSX.Element {
  /* === return === */
  return (
    <Link
      href='/'
      className={`bg-primary focus:ring-primary fixed right-2 bottom-2 z-1000 flex items-center gap-2 rounded-full px-4 py-2 text-white shadow-md transition duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:opacity-80 hover:shadow-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:outline-none`}
      aria-label='一覧ページに戻る'
    >
      <ArrowUTurnLeftIcon />
      <span>一覧に戻る</span>
    </Link>
  )
}

function ArrowUTurnLeftIcon(): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='size-5'
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
      />
    </svg>
  )
}
