'use server'

import { revalidatePath } from 'next/cache'

/**
 * 投稿詳細ページのキャッシュを削除
 *
 * @param id - 投稿ID
 */

// eslint-disable-next-line @typescript-eslint/require-await
export async function revalidatePostPath(id: string): Promise<void> {
  revalidatePath(`/${id}`)
}
