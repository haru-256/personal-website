# app

Next.js アプリケーション本体です。セットアップ手順の詳細はリポジトリルートの [README.md](../README.md) を参照してください。

## クイックスタート

Node.js と pnpm は [mise](https://mise.jdx.dev/) で管理します（バージョンは `mise.toml` を参照）。

```bash
mise install
pnpm install
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## `vercel.json` について

Vercel 上でもローカルと同じ pnpm（`10.34.5`）を使うための設定です。経緯と、将来削除してよいかの判断基準はルート README の「なぜ `vercel.json` で pnpm を固定しているか」を参照してください。
