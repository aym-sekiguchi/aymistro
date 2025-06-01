import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { getPost } from '@/actions'

import type { JSX } from 'react'

export async function PostContents(props: {
  id: string
}): Promise<JSX.Element> {
  /* === props === */
  const { id } = props

  /* === actions === */
  const post = await getPost({ id })

  if (!post) notFound()

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div>
        {post.tags.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
      <article>
        <ReactMarkdown
          children={post.contents}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
          components={{
            a({ children, href }) {
              console.log(children)
              if (
                children === 'video' &&
                (href?.includes('youtube.com') || href?.includes('youtu.be'))
              ) {
                // YouTube埋め込みURLに変換
                const videoId = extractYouTubeId(href)
                console.log('YouTube videoId:', videoId)
                if (videoId) {
                  return (
                    <iframe
                      width='560'
                      height='315'
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title='YouTube video'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                  )
                }
              }

              // 通常のリンクとして表示
              return <a href={href}>{children}</a>
            },
          }}
        />
      </article>
    </>
  )
}

// YouTubeのURLから動画IDを抽出
function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return match ? match[1] : null
}
