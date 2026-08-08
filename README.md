# Personal Website

個人のウェブサイトプロジェクトです。

## ディレクトリ構成

プロジェクトのルートディレクトリには、Next.jsアプリケーションを含む`app`ディレクトリがあります。

```text
.
├── app/                  # Next.js アプリケーション本体
│   ├── src/              # ソースコード (コンポーネント、ロジック等)
│   ├── public/           # 静的アセット
│   ├── package.json      # 依存関係定義（pnpm）
│   ├── pnpm-lock.yaml    # pnpm lockfile
│   ├── mise.toml         # ローカルの Node.js / pnpm バージョン
│   ├── vercel.json       # Vercel でも同じ pnpm を使うための install 設定
│   ├── next.config.js    # Next.js 設定
│   ├── tailwind.config.js # Tailwind CSS 設定
│   └── ...
├── .github/              # GitHub 関連の設定
└── README.md             # プロジェクトドキュメント (このファイル)
```

## 技術スタックと選定理由

本プロジェクトでは、パフォーマンス、アクセシビリティ、開発者体験を重視し、以下のモダンな技術スタックを採用しています。

### Core
- **Next.js 16 (App Router)**: 最新のReact機能（RSC, Server Actions）を活用し、パフォーマンスとSEOを最適化。
- **TypeScript**: 型安全性による堅牢なコードベースと開発効率の向上。

### Styling & UI
- **Tailwind CSS**: ユーティリティファーストなスタイリングで、迅速かつ一貫性のあるデザインを実現。
- **Headless UI**: アクセシビリティに配慮した、スタイルに依存しないUIコンポーネント。
- **React Wrap Balancer**: タイトルや見出しの改行位置を自動調整し、視覚的な美しさを向上。

### Content Management (MDX)
- **Unified / Remark / Rehype**: MDX処理のパイプラインを構築し、数式 (KaTeX) やシンタックスハイライト (Shiki) などの高度なコンテンツ表現を実現。
- **next-mdx-remote**: 柔軟なMDXレンダリング。

### Data & State
- **GraphQL (Apollo Client)**: 必要なデータのみを効率的に取得。
- **SWR**: クライアントサイドでのデータフェッチとキャッシュ管理。

## こだわりポイント (Appeal)

- **モダンな開発環境**: React 19, Next.js 16, ESLint 9 (Flat Config) など、常に最新の安定版技術を追従しています。
- **高度なコンテンツ表現**: 技術ブログとしての質を高めるため、MDXを活用したリッチなテキスト表現（数式、コードブロック、目次生成など）を自前で実装しています。
- **パフォーマンスとDX**: 画像最適化や型安全なAPI連携により、ユーザー体験と開発者体験の両立を目指しています。

## ソースコード構成

`app/src` ディレクトリ内の詳細な構成：

```text
src/
├── components/                    # React コンポーネント (Atomic Design)
│   ├── atoms/                     # 最小単位のコンポーネント (Divider, MdxImage, MdxLink, etc.)
│   ├── molecules/                 # 複数のatomsから構成 (BlogHeader, Pagination, etc.)
│   ├── organism/                  # 機能単位 (Header, Footer, PostCard, TableOfContents, etc.)
│   └── templates/                 # ページテンプレート
├── graphql/                       # GraphQL 関連
│   ├── apollo.ts                  # Apollo Client 設定
│   ├── query.graphql              # GraphQL クエリ定義
│   └── generated/                 # 自動生成されたGraphQL型定義
├── libs/                          # ユーティリティライブラリ (custom-rehype-toc, getAllPosts)
├── pages/                         # Next.js ページ
│   ├── blog/                      # ブログ関連ページ
│   └── ...
├── styles/                        # グローバルスタイル (mdx, karatex, shiki, etc.)
├── types/                         # TypeScript 型定義
└── utils/                         # 汎用ユーティリティ関数
```

## セットアップ方法

### 前提条件

- [mise](https://mise.jdx.dev/)（Node.js / pnpm のバージョン管理）
- Node.js / pnpm のバージョンは [`app/mise.toml`](app/mise.toml) で固定（Node.js 24.11.1、pnpm 10.34.5）
- Vercel でも同じ pnpm を使うため、[`app/vercel.json`](app/vercel.json) で Corepack 経由の pnpm 10.34.5 を指定（理由は後述）

Next.js 16 の実行には Node.js 20.9.0 以上が必要です。

### なぜ `vercel.json` で pnpm を固定しているか

ローカルでは `mise.toml` と `package.json` の `packageManager` フィールド（`pnpm@10.34.5`）でバージョンを揃えています。

一方 Vercel は、プロジェクトの作成日などをもとに pnpm のメジャーバージョンを決めることがあり、**`packageManager` を読んでも古いプロジェクトでは pnpm 9 のままになる**場合があります（このリポジトリでもその挙動でした）。ローカル（pnpm 10）とデプロイ（pnpm 9）がずれると、lockfile や install スクリプトの挙動差の原因になるため、[`app/vercel.json`](app/vercel.json) の `installCommand` で Corepack 経由の pnpm 10.34.5 を明示しています。

将来 Vercel が `packageManager` を見て自動で同じバージョンを使うようになれば、この `installCommand` は不要になる可能性があります。そのときはビルドログで実際に使われた pnpm バージョンを確認したうえで、削除を検討してください。

### インストール

```bash
cd app
mise install
pnpm install
```

### 開発環境の起動

```bash
pnpm dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

### ビルド

```bash
pnpm build
pnpm start
```

## 主要なスクリプト

| コマンド | 説明 | 実行内容 |
| --- | --- | --- |
| `pnpm dev` | 開発サーバー起動 | `next dev` |
| `pnpm build` | 本番ビルド | `next build` |
| `pnpm start` | ビルド済みアプリ起動 | `next start` |
| `pnpm lint` | コード検査 | `eslint .` |
| `pnpm format` | コード整形 | `prettier ...` |
| `pnpm codegen` | GraphQL型生成 | `graphql-codegen` |

## GraphQL 型の自動生成

GraphQL スキーマから TypeScript 型を自動生成します。コマンドを実行すると `src/graphql/generated/` ディレクトリに型定義ファイルが生成されます。

```bash
pnpm codegen
```

## 主要な機能

### ブログシステム

- MDX形式でのブログコンテンツ管理
- GraphQL経由でのポスト取得
- 検索・ページネーション機能
- 自動目次生成
- シンタックスハイライト対応

### コンテンツ表現

- **数式 (KaTeX)**: LaTeX形式で数学式を記述可能
- **コードハイライト (Shiki)**: 色付きのシンタックスハイライト
- **レスポンシブ画像**: Sharp による画像最適化

## 開発ガイド

### コンポーネント追加時 (Atomic Design)

以下の優先順位で配置してください：

1. **atoms**: 単一の責務を持つ最小単位のコンポーネント
2. **molecules**: 複数のatomsを組み合わせたコンポーネント
3. **organism**: 完全な機能を提供するコンポーネント

### スタイリング (Tailwind CSS)

Tailwind CSS のユーティリティクラスを使用します：

```tsx
export const Button = () => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
  </button>
);
```

### TypeScript の活用

型安全性を重視し、必ず型定義を行ってください：

```tsx
interface Props {
  title: string;
  count: number;
  onSubmit: (data: Data) => void;
}

export const Component: React.FC<Props> = ({ title, count, onSubmit }) => {
  // ...
};
```

## パフォーマンス最適化

- **Next.js Image**: 画像の自動最適化と遅延読込
- **Code Splitting**: ページごとの自動コード分割
- **Static Generation**: 静的生成による高速配信
- **Incremental Static Regeneration**: ISRによる段階的再生成
