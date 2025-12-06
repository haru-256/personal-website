import Head from 'next/head'
import Image from 'next/image'
import icon from 'public/icon.png'

import { FC } from 'react'

const HomeHeader: FC<Record<string, never>> = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-indigo-600">Home</h2>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            haru256.dev
          </h1>
          <p className="mx-auto my-5 max-w-xl text-xl text-gray-500">
            haru256の個人サイト
          </p>
          <div className="my-5 flex justify-center">
            <Image
              className="max-h-80 w-auto rounded-full"
              src={icon}
              placeholder="blur"
              alt="icon"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>haru256.dev</title>
        <meta key="description" name="description" content="Home" />
      </Head>
      <div>
        <HomeHeader />
      </div>
    </>
  )
}
