# AGENTS.md

## Cursor Cloud specific instructions

This repository is a single Next.js 16 (Pages Router) personal website. All code and
commands live in the `app/` directory. See [`README.md`](./README.md) and
[`app/package.json`](./app/package.json) for the standard scripts.

### Services / commands

There is one service: the Next.js app. Run everything from `app/`:

- Dev server: `pnpm dev` (Next.js + Turbopack, serves http://localhost:3000)
- Lint: `pnpm lint` (oxlint) — used by CI
- Format check: `pnpm format:check` (oxfmt) — used by CI
- Build / prod: `pnpm build` && `pnpm start`
- GraphQL codegen: `pnpm codegen`

### Non-obvious notes

- Node is managed by nvm and the default alias is pinned to `24.11.1` (matches
  `app/mise.toml` and CI). A fresh login shell already resolves `node -v` = 24.11.1 and
  `pnpm -v` = 10.34.5 (via Corepack), so no manual `nvm use` is needed. `mise` itself is
  not installed; nvm covers the pinned Node version.
- The `/blog` routes require external Contentful CMS credentials and return HTTP 500
  without them. Set `NEXT_PUBLIC_CONTENTFUL_ENDPOINT` and `CONTENTFUL_TOKEN` (via the
  Secrets panel) to exercise blog pages. The rest of the site (`/`, `/about`, `/project`)
  renders fully without any secrets and is enough to verify the environment.
- Lint/format use standalone `oxlint`/`oxfmt` binaries (not ESLint/Prettier); they are
  fast and unaffected by the Node version.
