import Head from 'next/head'
import Header from '@/components/organism/Header'

import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

function Profile() {
  const { data, error, isLoading } = useSWR(
    'https://random-data-api.com/api/users/random_user',
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // render data
  return <div>hello {data.name}!</div>
}

export default function Page() {
  return (
    <>
      <Head>
        <title>Project - haru256.dev</title>
        <meta key="description" name="description" content="Blog Post" />
      </Head>
      <div className="inset-0 flex justify-center sm:px-[5rem]">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
            <Header
              tabs={[
                { name: 'Home', href: '/', isHighlight: false },
                { name: 'Blog', href: '/blog', isHighlight: false },
                { name: 'Project', href: '/project', isHighlight: true },
                { name: 'About', href: '/about', isHighlight: false },
              ]}
            />
            <Profile />
          </div>
        </div>
      </div>
    </>
  )
}
