import Head from 'next/head'
import Header from '@/components/organism/Header'

export default function Page() {
  return (
    <>
      <Head>
        <title>About - haru256.dev</title>
        <meta key="description" name="description" content="Blog Post" />
      </Head>
      <div className="inset-0 flex justify-center sm:px-[5rem]">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
            <Header
              tabs={[
                { name: 'Home', href: '/', isHighlight: false },
                { name: 'Blog', href: '/blog', isHighlight: false },
                { name: 'Project', href: '/project', isHighlight: false },
                { name: 'About', href: '/about', isHighlight: true },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}
