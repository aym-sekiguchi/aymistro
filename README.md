# Project Title

Aymistro

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
