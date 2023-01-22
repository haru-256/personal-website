import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* katex css */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
        />
      </Head>
      <body className="flex h-full flex-col bg-zinc-50 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
