import { Footer, Header } from '@/components'
import { createMetadata, KaiseiDecol, notoSansJP, zenOldMincho } from '@/setup'

import '../globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = createMetadata()

type RootLayoutProps = Readonly<{ children: React.ReactNode }>

export default function RootLayout(props: RootLayoutProps): React.ReactNode {
  /* === props === */
  const { children } = props

  /* === return === */
  return (
    <html
      lang='ja'
      className={`${zenOldMincho.variable} ${notoSansJP.variable} ${KaiseiDecol.variable} antialiased`}
    >
      {/* body */}
      <body className='flex min-h-svh flex-col'>
        {/* header */}
        <Header />

        {/* main */}
        <main className='flex-1 p-4'>{children}</main>

        {/* footer */}
        <Footer />
      </body>
    </html>
  )
}
