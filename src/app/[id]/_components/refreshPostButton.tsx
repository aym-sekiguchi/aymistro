'use client'

import { type JSX, useState } from 'react'

import { revalidatePostPath } from '@/actions'

type RefreshPostButtonProps = {
  id: string
}

/**
 * 投稿データを更新するボタンコンポーネント
 *
 * ISRキャッシュを削除してデータを再取得します。
 *
 * @param {RefreshPostButtonProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} 投稿データを更新するボタンのReact要素
 */

export function RefreshPostButton({ id }: RefreshPostButtonProps): JSX.Element {
  const [updateStatus, setUpdateStatus] = useState<
    'idle' | 'processing' | 'completed'
  >('idle')

  const handleRefresh = async (): Promise<void> => {
    if (updateStatus === 'processing') return

    setUpdateStatus('processing')
    try {
      await revalidatePostPath(id)
      setUpdateStatus('completed')

      // 2秒後にボタンを通常状態に戻す
      setTimeout(() => {
        setUpdateStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('データの更新開始に失敗しました:', error)
      setUpdateStatus('idle')
    }
  }

  const getButtonText = (): string => {
    switch (updateStatus) {
      case 'processing':
        return '更新開始中...'
      case 'completed':
        return '更新を開始しました'
      default:
        return 'データを更新する'
    }
  }

  const getStatusMessage = (): JSX.Element | null => {
    if (updateStatus === 'completed') {
      return (
        <p className='mt-2 text-center text-sm text-gray-600'>
          データの更新を開始しました。反映まで数秒かかる場合があります。
        </p>
      )
    }
    return null
  }

  /* === return === */
  return (
    <div className='mt-8 flex flex-col items-center justify-center'>
      <button
        onClick={() => void handleRefresh()}
        type='button'
        disabled={updateStatus === 'processing' || updateStatus === 'completed'}
        className={
          'bg-primary flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-white shadow-md' +
          'transition duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:opacity-80 hover:shadow-none' +
          'focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:outline-none' +
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0'
        }
      >
        <ArrowPath />
        <span>{getButtonText()}</span>
      </button>
      {getStatusMessage()}
    </div>
  )
}

function ArrowPath(): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='size-5'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
      />
    </svg>
  )
}
