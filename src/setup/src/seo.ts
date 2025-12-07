import type { Metadata } from 'next'

type CreateMetadataOptions = {
  description?: string
  image?: {
    alt?: string
    height?: number
    url: string
    width?: number
  }
  path?: string
  title?: string
}

const defaultSiteName = process.env.SITE_TITLE || ''

const defaultBaseUrl = process.env.SITE_URL || 'http://localhost:3000'

const defaultImage = {
  alt: '',
  height: 630,
  url: '/og/og-image.png',
  width: 1200,
}

/**
 * ページごとの metadata を生成する共通関数
 *
 * @param description ページの説明
 * @param image ページの画像
 * @param path ページのパス
 * @param title ページのタイトル
 *
 * @returns Metadata オブジェクト
 */

export function createMetadata(options: CreateMetadataOptions = {}): Metadata {
  /* === options === */
  const { description, image, path, title } = options

  const fullTitle = title ? `${title} | ${defaultSiteName}` : defaultSiteName

  const url = path ? `${defaultBaseUrl}${path}` : defaultBaseUrl

  return {
    description,
    icons: {
      apple: '/icons/apple-touch-icon.png',
      other: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/icons/icon.svg',
        },
      ],
    },
    manifest: '/manifest.json',
    metadataBase: new URL(defaultBaseUrl),
    openGraph: {
      description,
      images: [
        {
          alt: image?.alt ?? defaultImage.alt,
          height: image?.height ?? defaultImage.height,
          url: image?.url ?? defaultImage.url,
          width: image?.width ?? defaultImage.width,
        },
      ],
      locale: 'ja_JP',
      siteName: defaultSiteName,
      title: fullTitle,
      type: 'website',
      url,
    },
    title: fullTitle,
    twitter: {
      card: 'summary_large_image',
      description: description ?? (process.env.SITE_DESCRIPTION || ''),
      images: [image?.url ?? defaultImage.url],
      title: fullTitle,
    },
  }
}
