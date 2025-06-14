# Aymistro

Notionを使ったレシピ管理・共有サイトです。Notionのデータベースからレシピを取得し、美しいノートパッド風デザインで表示します。

## ✨ 主な機能

- 📝 **Notionベースのレシピ管理**: Notionデータベースから動的にレシピを取得
- 🔍 **レシピ検索・フィルタリング**: キーワード検索とタグによるフィルタリング
- 📱 **レスポンシブデザイン**: モバイル・デスクトップ対応のノートパッド風UI
- ♾️ **無限スクロール**: Intersection Observerによるパフォーマンス最適化
- 🔄 **リアルタイム更新**: 手動リフレッシュ機能でNotionデータを即座に反映
- 🎨 **アニメーション**: Motion.jsによる滑らかなUI/UXアニメーション

## 🚀 セットアップ

### 環境変数の設定

`.env`ファイルを作成し、以下の環境変数を設定してください：

```bash
# Notion Integration
NOTION_SECRET=your_notion_integration_secret
NOTION_PAGE_ID=your_notion_database_id

# Site Configuration
SITE_URL=http://localhost:3000
SITE_TITLE=Aymistro
SITE_DESCRIPTION=Notionを使ったレシピ管理・共有サイト
```

### インストール・実行

```bash
# 依存関係のインストール
bun install

# 開発サーバー起動
bun run dev

# 本番ビルド
bun run build
bun run start
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて動作を確認できます。

## 📦 技術スタック

### フロントエンド

- **Next.js 15** (App Router) - React フレームワーク
- **TypeScript 5** - 型安全性とDX向上
- **Tailwind CSS 4** - ユーティリティファーストCSS
- **Motion.js** - アニメーションライブラリ

### バックエンド・API

- **Notion API** - コンテンツ管理
- **notion-to-md** - Notion→Markdown変換
- **react-markdown** - Markdown→React変換

### 開発・品質管理

- **Bun** - 高速なJavaScript実行環境
- **ESLint (Flat Config)** - コード品質管理
- **Prettier** - コード整形
- **Husky + lint-staged** - Git hooks

### フォント・デザイン

- **Google Fonts** (Noto Sans JP, Zen Old Mincho, Kaisei Decol)
- **カスタムアイコン** - SVGアイコンシステム

## 📁 プロジェクト構成

```tree
src/
├── actions/              # Server Actions
│   └── src/
│       ├── getPost.ts           # 単一レシピ取得
│       ├── getPostList.ts       # レシピ一覧取得
│       └── refreshPost.ts       # レシピ更新
├── app/                  # App Router
│   ├── (home)/                  # ホームページ
│   │   └── _components/
│   │       ├── postListClient.tsx    # レシピ一覧（無限スクロール）
│   │       ├── recipeCard.tsx        # レシピカード
│   │       ├── searchBar.tsx         # 検索バー
│   │       └── tagFilter.tsx         # タグフィルター
│   ├── [id]/                    # 動的ルート（レシピ詳細）
│   │   └── _components/
│   │       ├── recipePage.tsx        # レシピ詳細表示
│   │       ├── recipePageskeleton.tsx # ローディング状態
│   │       └── backToListButton.tsx  # 戻るボタン
│   ├── layout.tsx               # ルートレイアウト
│   └── globals.css             # グローバルスタイル
├── components/           # 共通コンポーネント
│   ├── header.tsx              # ヘッダー
│   ├── footer.tsx              # フッター
│   └── icons/                  # アイコンコンポーネント
├── libraries/            # 外部ライブラリ設定
│   └── src/
│       ├── notion.ts           # Notion API設定
│       └── notionProperties.ts # Notion型定義
├── setup/                # アプリ設定
│   └── src/
│       ├── fonts.ts            # フォント設定
│       └── seo.ts              # SEO・メタデータ管理
└── types/                # 型定義
    └── src/
        └── list.ts             # 共通型定義
```

## ⚡ Next.js キャッシュ戦略

このアプリケーションでは、Notionのコンテンツの即座反映を重視したキャッシュ戦略を採用しています。

### 🏠 一覧ページのキャッシュ戦略

**Dynamic Rendering（動的生成）**

```tsx
// src/app/(home)/page.tsx
export const dynamic = 'force-dynamic'

export default function Home(): JSX.Element {
  return (
    <Suspense fallback={<RecipeCardSkeleton />}>
      <PostListServer />
    </Suspense>
  )
}
```

**特徴:**

- **毎回動的生成**: `force-dynamic`によりリクエストごとに最新データを取得
- **サーバーコンポーネント**: PostListServerで初期データを取得
- **即座反映**: Notionでの記事更新が即座にサイトに反映

### 📄 詳細ページのキャッシュ戦略

**ISR (Incremental Static Regeneration)**

```tsx
// src/app/[id]/page.tsx
export const dynamic = 'force-dynamic' // ISR対応
export const revalidate = 3600 // 1時間キャッシュ
export const fetchCache = 'force-cache'

export default async function PostDetailPage({ params }) {
  const { id } = await params

  return (
    <Suspense fallback={<RecipePageSkeleton />}>
      <RecipePage id={id} />
    </Suspense>
  )
}
```

**特徴:**

- **ISR対応**: `force-dynamic`でインクリメンタル静的再生成を有効化
- **1時間キャッシュ**: `revalidate = 3600`で生成されたページは1時間有効
- **フェッチキャッシュ強制**: `force-cache`でAPIレスポンスをキャッシュ

### 🔄 キャッシュ無効化戦略

**クライアントサイドからの手動更新**

```tsx
// クライアントコンポーネントでの実装例
const handleRefresh = async () => {
  await revalidatePostPath(postId)
}
```

**特徴:**

- **個別ページ更新**: `revalidatePostPath(id)`で特定のレシピページのみキャッシュ無効化
- **ユーザートリガー**: ボタン押下による能動的な更新
- **即座反映**: Notionでレシピを編集後、すぐに最新版を確認可能

### 🎯 設計思想

**一覧ページ (`force-dynamic`)**:

- レシピの追加・削除が頻繁に発生
- データ量が軽量で高速取得可能
- 常に最新の一覧表示が重要

**詳細ページ (`force-dynamic` + `revalidate` + `force-cache`)**:

- ISR対応でパフォーマンスと鮮度のバランスを実現
- 個別レシピの内容は比較的安定
- Markdownレンダリングなど処理が重い
- フェッチキャッシュでNotion APIの負荷軽減

**更新機能 (`revalidatePostPath`)**:

- ユーザーが能動的に最新情報を取得
- 編集後の確認作業をスムーズに
- 個別ページのみの効率的な更新

## 🔧 開発機能

### コード品質管理

- **TypeScript**: 型安全性の確保
- **ESLint**: アクセシビリティ・React・TypeScriptルールを包括
- **Prettier**: コード整形（Tailwind CSS対応）
- **Husky**: Git commit前の自動Lint/Format実行

### パフォーマンス最適化

- **React Compiler**: 自動最適化（Babel Plugin）
- **Intersection Observer**: 効率的な無限スクロール
- **Suspense**: 段階的ローディング
- **ISR + Dynamic Rendering**: 効率的なキャッシュ戦略

### アクセシビリティ

- **jsx-a11y**: アクセシビリティルール適用
- **セマンティックHTML**: 適切なHTML要素使用
- **ARIA属性**: スクリーンリーダー対応

## 🎨 デザインシステム

### テーマカラー

- **ベース**: `#fefbef` (クリーム色)
- **テキスト**: `#441800` (ダークブラウン)
- **プライマリ**: `#a31c00` (赤茶色)

### フォント階層

- **セリフ**: Zen Old Mincho（見出し用）
- **サンセリフ**: Noto Sans JP（本文用）
- **ディスプレイ**: Kaisei Decol（装飾用）

### コンポーネント

- **ノートパッド風カード**: 3D効果とシャドウレイヤー
- **タグシステム**: カテゴリ分類とフィルタリング
- **アニメーション**: Motion.jsによる滑らかな遷移

## 📱 対応ブラウザ

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照してください。

## 📞 サポート

質問や問題がある場合は、[Issues](../../issues)で報告してください。
