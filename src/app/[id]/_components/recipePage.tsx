import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

import { Tag } from '@/components'

import type { PostDetailClientProps } from './postDetailClient'
import type { JSX } from 'react'

type recipePage = PostDetailClientProps

/**
 * レシピページコンポーネント
 *
 * レシピカード風のデザインでブログ記事を表示します。
 * 複数の影で重ねたカード効果、リング付きのデザイン、
 * Markdownコンテンツの解析とYouTube動画の埋め込み機能を提供します。
 *
 * @param props - レシピページのプロパティ
 * @param props.post - 表示する記事データ
 * @param props.post.contents - Markdown形式の記事内容
 * @param props.post.createdTime - 記事作成日時
 * @param props.post.description - 記事の説明文
 * @param props.post.tags - 記事に付与されたタグの配列
 * @param props.post.title - 記事のタイトル
 *
 * @returns レシピカード風にスタイリングされた記事表示コンポーネント
 */

export function RecipePage(props: recipePage): JSX.Element {
  /* === props === */
  const { contents, createdTime, description, tags, title } = props.post

  const processedContents = contents.replace(/(\n\n\n\n)/g, '\n\n<br />\n')

  /* === return === */
  return (
    <div className='relative mt-4 h-fit'>
      {/* カード効果のための背景レイヤー */}
      <div className='shadow-notepad absolute top-0.5 left-0.5 z-300 h-full w-full rounded-xl bg-white' />
      <div className='shadow-notepad absolute top-1 left-1 z-200 h-full w-full rounded-xl bg-white' />
      <div className='shadow-notepad absolute top-1.5 left-1.5 z-100 h-full w-full rounded-xl bg-[url(/images/recipe-card-cover.webp)]' />

      {/* 内容 */}
      <div className='shadow-notepad relative z-400 rounded-xl bg-white p-4 md:p-8'>
        {/* リング */}
        <div className='relative -mt-10 mb-10 h-8 w-full bg-[url(/images/recipe-card-ring.svg)] bg-contain bg-repeat-space' />

        {/* タイトル */}
        <h2 className='font-kaisei-decol border-b border-dashed pb-2 text-center text-2xl md:text-3xl'>
          {title}
        </h2>

        {/* 作成日 */}
        <p className='font-kaisei-decol my-2 text-right text-sm'>
          {new Date(createdTime).getFullYear() +
            '.' +
            (Number(new Date(createdTime).getMonth()) + 1) +
            '.' +
            new Date(createdTime).getDate()}
        </p>

        {/* タグ */}
        {tags.length > 0 && (
          <div className='my-2 flex w-full flex-wrap gap-2'>
            {tags.map((value) => (
              <Tag key={value} value={value} />
            ))}
          </div>
        )}

        {/* 説明 */}
        {description && (
          <div className='my-2 bg-[#fefbef] p-2 shadow-md'>
            <p className='text-black/80'>{description}</p>
          </div>
        )}

        {/* 内容 */}
        <article
          className='prose'
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #44180099, #44180099 1px, #fff 1px, #fff)',
            backgroundSize: '2.5rem 2.5rem',
          }}
        >
          <ReactMarkdown
            children={processedContents}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              a({ children, href }) {
                if (children !== 'video') {
                  return (
                    <Link
                      href={`/${href?.replace('https://www.notion.so/', '')}`}
                      target='_blank'
                    >
                      {children}
                    </Link>
                  )
                }
                if (
                  children === 'video' &&
                  (href?.includes('youtube.com') || href?.includes('youtu.be'))
                ) {
                  // YouTube埋め込みURLに変換
                  const videoId = extractYouTubeId(href)
                  if (videoId) {
                    return (
                      <span className='block aspect-video max-h-full max-w-full'>
                        <iframe
                          className='aspect-video w-full'
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title='YouTube video'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                        />
                      </span>
                    )
                  }
                }

                // 通常のリンクとして表示
                return <a href={href}>{children}</a>
              },
              hr() {
                return (
                  <div className='relative'>
                    <hr className='border-primary absolute top-0 w-full border-t-2' />
                  </div>
                )
              },
              table({ children }) {
                return (
                  <div className='overflow-y-auto'>
                    <div className='!mb-2 w-fit bg-white px-3 pt-5 pb-3'>
                      <table>{children}</table>
                    </div>
                  </div>
                )
              },
            }}
          />
        </article>
      </div>
    </div>
  )
}

// YouTubeのURLから動画IDを抽出
function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return match ? match[1] : null
}
