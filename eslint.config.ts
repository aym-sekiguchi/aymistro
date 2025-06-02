import js from '@eslint/js'
import react from '@eslint-react/eslint-plugin'
import next from '@next/eslint-plugin-next'
import parser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import * as importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import * as reactCompiler from 'eslint-plugin-react-compiler'
import reactHooks from 'eslint-plugin-react-hooks'
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys'
import sortExportAll from 'eslint-plugin-sort-export-all'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys'
import tseslint from 'typescript-eslint'

type ESLintPluginConfig = {
  rules: Record<string, unknown>
}

type ESLintPlugin = {
  configs?: Record<string, unknown>
  // @next/eslint-plugin-next用
  flatConfig?: {
    [key: string]: ESLintPluginConfig | undefined
    recommended?: ESLintPluginConfig
  }
  flatConfigs?: {
    [key: string]: ESLintPluginConfig | undefined
    recommended?: ESLintPluginConfig
  }
}

export const plugins: Record<string, ESLintPlugin> = {
  importPlugin: importPlugin as ESLintPlugin,
  jsxA11y: jsxA11y as ESLintPlugin,
  next: next as ESLintPlugin,
  sortDestructureKeys: sortDestructureKeys as ESLintPlugin,
  sortKeysFix: sortKeysFix as ESLintPlugin,
  typescriptSortKeys: typescriptSortKeys as ESLintPlugin,
}

const {
  importPlugin: typedImportPlugin,
  jsxA11y: typedJsxA11y,
  next: typedNext,
  sortDestructureKeys: typedSortDestructureKeys,
  sortKeysFix: typedSortKeysFix,
  typescriptSortKeys: typedTypescriptSortKeys,
} = plugins

export default [
  /* 無視するファイル */
  {
    ignores: ['.next', 'dist'],
    name: 'ignores',
  },

  /* JavaScript */
  {
    ...js.configs.recommended,
    name: '@eslint/js',
  },

  /* TypeScript */
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.d.ts', '**/*.ts', '**/*.tsx'],
  })),
  {
    files: ['**/*.d.ts', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        projectService: true,
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    name: 'typescript-eslint/language-options',
    rules: {
      '@typescript-eslint/await-thenable': 'warn', // awaitをthenableに対して使用することを警告
      '@typescript-eslint/consistent-type-imports': 'warn', // 一貫性のある型インポートを強制
      '@typescript-eslint/explicit-function-return-type': 'warn', // 関数の戻り値の型を明示的に指定することを警告
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // モジュールの境界での型を明示的に指定することを警告
      '@typescript-eslint/no-floating-promises': 'error', // 浮動するPromiseを禁止
      '@typescript-eslint/no-non-null-assertion': 'warn', // 非nullアサーションを禁止
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // 未使用の変数を警告（アンダースコアで始まる引数は無視）
      '@typescript-eslint/prefer-as-const': 'warn', // as constの使用を推奨
      '@typescript-eslint/require-await': 'warn', // async関数でawaitを要求
    },
  },

  /* accessibility */
  {
    ...typedJsxA11y.flatConfigs?.recommended,
    name: 'jsx-a11y/recommended',
    rules: {
      ...typedJsxA11y.flatConfigs?.recommended?.rules,
      // 静的要素のインタラクションを警告
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      // 画像のaltテキストを警告
      'jsx-a11y/aria-props': 'warn',
      // ARIAプロパティの使用を警告
      'jsx-a11y/aria-proptypes': 'warn',
      // ARIAプロパティの型を警告
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn', // サポートされていないARIA要素を警告
      'jsx-a11y/role-has-required-aria-props': 'warn', // 役割に必要なARIAプロパティを警告
      'jsx-a11y/role-supports-aria-props': 'warn', // 役割がサポートするARIAプロパティを警告
    },
  } as const,

  /* import */
  {
    ...typedImportPlugin.flatConfigs?.recommended,
    rules: {
      ...typedImportPlugin.flatConfigs?.recommended?.rules,
      'import/order': [
        'warn',
        {
          alphabetize: {
            // アルファベット順に並べ替え
            caseInsensitive: true,
            order: 'asc', // 大文字小文字を区別しない
          },
          distinctGroup: true,
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          // 名前付きインポートとデフォルトインポートを分けて改行
          named: true,
          'newlines-between': 'always', // 名前付きインポートを並べ替え
          warnOnUnassignedImports: true, // 未割り当てのインポートも並べ替え（警告のみ）
        },
      ], // インポートの順序を強制
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // optional: DefinitelyTyped も見る
          project: './tsconfig.json', // tsconfig の場所を明示
        },
      },
    },
  },

  /* sort-export-all */
  // exportの順序を強制するためのプラグイン
  {
    files: ['**/index.ts'],
    name: 'sort-export-all',
    plugins: { 'sort-export-all': sortExportAll },
    rules: {
      'sort-export-all/sort-export-all': 'warn',
    },
  },

  /* sort-destructure-keys */
  // オブジェクトの分割代入のキーをソートするためのプラグイン
  {
    name: 'sort-destructure-keys',
    plugins: { 'sort-destructure-keys': typedSortDestructureKeys },
    rules: {
      'sort-destructure-keys/sort-destructure-keys': [
        1,
        { caseSensitive: false },
      ],
    },
  },

  /* typescript-sort-keys */
  // TypeScriptのオブジェクトのキーをソートするためのプラグイン
  {
    name: 'typescript-sort-keys',
    plugins: { 'typescript-sort-keys': typedTypescriptSortKeys },
    rules: {
      'typescript-sort-keys/interface': [
        'warn',
        'asc',
        { caseSensitive: false },
      ], // インターフェースのキーを昇順にソート
      'typescript-sort-keys/string-enum': [
        'warn',
        'asc',
        { caseSensitive: false },
      ], // 文字列列挙型のキーを昇順にソート
    },
  },

  /* sort-keys-fix */
  // オブジェクトのキーをソートするためのプラグイン
  {
    name: 'sort-keys-fix',
    plugins: { 'sort-keys-fix': typedSortKeysFix },
    rules: {
      'sort-keys-fix/sort-keys-fix': 'warn',
    },
  },

  /* React */
  {
    ...react.configs['recommended-type-checked'],
    rules: {
      ...react.configs['recommended-type-checked'].rules,
      '@eslint-react/dom/no-missing-iframe-sandbox': 'off', // iframeのsandbox属性が欠落している場合に警告
      '@eslint-react/jsx-no-duplicate-props': 'warn', // JSX内での重複プロパティを警告
      '@eslint-react/jsx-no-undef': 'warn', // JSX内で未定義の変数を警告
      '@eslint-react/jsx-uses-vars': 'warn', // JSX内で使用されている変数を警告
      '@eslint-react/no-useless-fragment': 'warn', // 不要なフラグメントを警告
    },
  },
  { ...reactHooks.configs['recommended-latest'] },
  {
    ...reactCompiler.configs.recommended,
    name: 'react-compiler/recommended',
  },

  /* Next.js */
  { ...typedNext.flatConfig?.coreWebVitals },

  /* Prettierとの競合するルールを無効化 */
  {
    ...prettier,
    name: 'eslint-config-prettier',
  },
]
