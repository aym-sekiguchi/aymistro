import { Noto_Sans_JP, Zen_Old_Mincho } from 'next/font/google'

export const zenOldMincho = Zen_Old_Mincho({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-zen-old-mincho',
  weight: ['400', '500', '700'],
})

export const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700'],
})
