import Image from 'next/image'
import Link from 'next/link'

import type { JSX } from 'react'

export function Header(): JSX.Element {
  /* === return === */
  return (
    <header className='space-y-2'>
      {/* awning */}
      <div className='h-24 bg-[url(/images/header-awning.webp)] bg-contain bg-center bg-repeat-x'></div>
      <h1>
        <Link href='/' className='flex items-center justify-center gap-2'>
          <figure>
            <Image
              src='/images/aymistro-icon.svg'
              alt=''
              className='h-full w-8 object-contain md:w-12'
              width={64}
              height={64}
            />
          </figure>
          <p className='font-kaisei-decol text-2xl font-medium md:text-3xl'>
            Aymistro
          </p>
        </Link>
      </h1>
    </header>
  )
}
