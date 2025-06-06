/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'

/**
 * useToggle は、真偽値の状態を管理・切り替えるためのカスタム React フックです。
 *
 * @param {Object} props - オプションの初期値を含むオブジェクト
 * @param {boolean} [props.value] - 初期状態の値（true または false）。指定がない場合は false。
 * @returns {[boolean, (value?: any) => void]} - 現在の状態と、状態を切り替える関数の配列。
 *   - 状態は true / false の boolean 値
 *   - toggle 関数は引数を与えないと状態を反転し、true または false を与えるとその値に設定します。
 */

export function useToggle(value: boolean): [boolean, (value?: any) => void] {
  /* === props === */

  const [state, setState] = useState(value !== undefined ? value : false)

  const toggle = (value: any): void =>
    typeof value === 'boolean' ? setState(value) : setState((prev) => !prev)

  return [state, toggle] as const
}
