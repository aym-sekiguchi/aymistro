import type { JSX } from 'react'

export function Footer(): JSX.Element {
  /* === return === */
  return (
    <footer className='border-t border-black p-4 text-center text-xs'>
      &copy;{new Date().getFullYear()} Aymistro
    </footer>
  )
}
