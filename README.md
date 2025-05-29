# Project Title

プロジェクトの概要や目的をここに記述します。

## 🚀 セットアップ

```bash
bun install
bun run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて動作を確認できます。

## 📦 技術スタック

- **Next.js 15**（App Router）
- **TypeScript 5**
- **Tailwind CSS 4**
- **Bun**
- **Google Fonts**（`Inter`, `Noto Sans JP` 使用）
- **ESLint (Flat Config)**
- **Prettier + 各種 plugin**
  - `prettier-plugin-tailwindcss`
  - `prettier-plugin-sort-json`
  - `prettier-plugin-packagejson`

## 🧪 使用ツール

- **ESLint**: Flat Config 形式、TypeScript/React 対応、import 順/キー順ソート対応
- **Prettier**: Tailwind 順対応、JSON 整形、自動整形対応
- **Husky + lint-staged**: コミット前に Lint / Format を自動実行

## 📁 ディレクトリ構成（初期）

```
src/
  app/           - App Router エントリ
  components/    - UI コンポーネント置き場
  setup/         - フォント / SEO / metadata 構成管理
    ├── fonts.ts        - Google Fonts 読み込み設定
    └── seo.ts          - createMetadata 関数で SEO 一括管理
```

---

## 🧩 カスタマイズポイント

以下のファイルを必要に応じて修正してください：

- `src/app/page.tsx`: トップページコンテンツ
- `src/global.css`: カスタムテーマやカラーの設定
- `src/setup/seo.ts`: ページごとの metadata を生成する共通関数（`createMetadata()`）を定義
- `src/setup/fonts.ts`: `Zen_Old_Mincho`, `Noto Sans JP` を Google Fonts 経由で読み込み（`--font-zen-old-mincho`, `--font-noto-sans-jp` に変数化）
- `eslint.config.mts`: 使用ルールの調整（Flat Config）
- `tsconfig.json`: 型設定やパスエイリアスの調整

## 🌐 SEO 対策について

- 各ページの `metadata` は `src/setup/seo.ts` に定義された `createMetadata()` を使って設定します
- `title`, `description`, `og:image`, `twitter:card` など主要なタグに対応済み
- `layout.tsx` でも `createMetadata()` を使用することで、トップページ用の metadata を自動的に生成可能
- 画像は `public/og/` に設置してください（例：`/og/og-image.png`）

## ⚙️ 環境変数（.env）

プロジェクトの SEO や URL 管理に必要な環境変数は `.env` に記述してください。Git には含めず `.env.example` を共有します。

```env
# .env.example
SITE_TITLE=MySite
SITE_DESCRIPTION=MySite Description
SITE_URL=https://example.com
```

> 本番環境ではホスティングサービス側の設定画面から上記の環境変数を登録してください。

## 📝 プロジェクト開始時に確認すること

- `package.json` の `name` を確認
- `README.md` のタイトルと概要を調整
- `.env.example` をコピーして `.env` を作成し、環境変数を設定
- 必要なライブラリを追加・削除

## 🪪 License

This project is licensed under the MIT License.

> ⚠️ 本リポジトリは転職活動のポートフォリオとして作成・公開されたものであり、他者による再利用や派生物の作成を目的としたものではありません。
