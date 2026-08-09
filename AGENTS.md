# AGENTS.md

## Cursor Cloud specific instructions

This repository is a single Next.js 16 (Pages Router) personal website. All code and
commands live in the `app/` directory. See [`README.md`](./README.md) and
[`app/package.json`](./app/package.json) for the standard scripts.

### Tooling (mise)

Node.js and pnpm are managed by [mise](https://mise.jdx.dev/) via [`app/mise.toml`](app/mise.toml)
(Node.js 24.11.1, pnpm 10.34.5). Always use mise — do not install or switch Node/pnpm via nvm
or Corepack for this project.

```bash
cd app
mise install   # installs the pinned Node.js + pnpm from mise.toml
pnpm install
```

A login shell already activates mise shims (`mise activate bash --shims` in `~/.bashrc`), so
`node` / `pnpm` resolve to the mise installs when you work under `app/`.

### Services / commands

There is one service: the Next.js app. Run everything from `app/`:

- Dev server: `pnpm dev` (Next.js + Turbopack, serves http://localhost:3000)
- Lint: `pnpm lint` (oxlint) — used by CI
- Format check: `pnpm format:check` (oxfmt) — used by CI
- Build / prod: `pnpm build` && `pnpm start`
- GraphQL codegen: `pnpm codegen`

### Non-obvious notes

- The `/blog` routes require external Contentful CMS credentials and return HTTP 500
  without them. Set `NEXT_PUBLIC_CONTENTFUL_ENDPOINT` and `CONTENTFUL_TOKEN` (via the
  Secrets panel) to exercise blog pages. The rest of the site (`/`, `/about`, `/project`)
  renders fully without any secrets and is enough to verify the environment.
- `/about` and `/project` are intentional placeholder pages (they only set `<Head>`); a blank
  main body there is expected app content, not an environment failure.
- Lint/format use standalone `oxlint`/`oxfmt` binaries (not ESLint/Prettier).
