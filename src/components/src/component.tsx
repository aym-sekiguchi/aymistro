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

export function Components(props: { children: JSX.Element }): JSX.Element {
  /* === props === */
  const { children } = props

  /* === return === */
  return <div>{children}</div>
}
