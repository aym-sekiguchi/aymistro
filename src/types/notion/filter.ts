// 基本的なフィルター型
export type NotionFilterBase =
  | {
      multi_select: {
        contains: string
      }
      property: string
    }
  | {
      property: string
      rich_text: {
        contains: string
      }
    }
  | {
      property: string
      title: {
        contains: string
      }
    }

// 複合フィルター型
export type NotionFilterCompound =
  | {
      or: NotionFilterBase[]
    }
  | {
      and: (NotionFilterBase | NotionFilterCompound)[]
    }

export type NotionFilterUnion = NotionFilterBase | NotionFilterCompound
