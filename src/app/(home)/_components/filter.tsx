import { useToggle } from '@/hooks'

import { SearchBar } from './searchBar'
import { TagSelector } from './tagSelector'

import type { JSX } from 'react'

/**
 *
 * コンポーネントのテンプレートです。
 *
 * このファイルをコピーして使ってください。
 *
 * @param props - props.children: JSX.Element
 *
 */

export function Filter(props: { tags: string[] }): JSX.Element {
  /* === props === */
  const { tags } = props

  /* === hooks === */
  const [open, toggle] = useToggle(false)

  /* === return === */
  return (
    <div className='mb-4 rounded-xl border-2 border-dashed bg-white px-2'>
      <button
        aria-expanded={open}
        aria-label='タグフィルターを切り替え'
        type='button'
        className='flex w-full cursor-pointer items-center gap-1 py-4'
        onClick={toggle}
      >
        <FunnelIcon />
        <span className='font-kaisei-decol leading-none'>絞り込み</span>
        <ChevronDownIcon open={open} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] ${open ? 'grid-rows-[2fr] pb-4' : 'grid-rows-[0fr]'}`}
      >
        <div className='overflow-hidden'>
          <SearchBar />
          <TagSelector tags={tags} />
        </div>
      </div>
    </div>
  )
}

function FunnelIcon(): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='size-5'
    >
      <path
        fillRule='evenodd'
        d='M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z'
        clipRule='evenodd'
      />
    </svg>
  )
}

function ChevronDownIcon(props: { open: boolean }): JSX.Element {
  /* === props === */
  const { open } = props

  /* === return === */
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={`size-6 ${open ? 'rotate-180' : ''}`}
    >
      <path
        fillRule='evenodd'
        d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
        clipRule='evenodd'
      />
    </svg>
  )
}
