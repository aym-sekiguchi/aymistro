import type { JSX } from 'react'

/**
 * タグコンポーネント
 *
 * 赤い背景の丸いタグを表示するコンポーネントです。
 *
 * @param props - コンポーネントのプロパティ
 * @param props.value - タグに表示するテキスト
 * @param props.rest - span要素に渡されるその他のHTML属性（classNameを除く）
 * @returns タグ要素のJSX
 *
 */

export function Tag(
  props: { value: string } & Omit<
    React.HtmlHTMLAttributes<HTMLSpanElement>,
    'className'
  >,
): JSX.Element {
  /* === props === */
  const { value, ...rest } = props

  /* === return === */
  return (
    <span
      className='font-kaisei-decol bg-primary block rounded-full px-5 py-1 text-sm text-white'
      {...rest}
    >
      {value}
    </span>
  )
}
