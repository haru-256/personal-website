import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/organism/Header'
import Footer from '@/components/organism/Footer'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const tabs = [
    {
      name: 'Home',
      href: '/',
      isHighlight: router.pathname === '/',
    },
    {
      name: 'Blog',
      href: '/blog',
      isHighlight: router.pathname === '/blog',
    },
    {
      name: 'Project',
      href: '/project',
      isHighlight: router.pathname === '/project',
    },
    {
      name: 'About',
      href: '/about',
      isHighlight: router.pathname === '/about',
    },
  ]
  return (
    <div className="inset-0 flex justify-center sm:px-[5rem]">
      <div className="flex w-full max-w-7xl lg:px-8">
        <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
          <Header tabs={tabs} />
          <Component {...pageProps} />
          <div className="w-full border-t border-gray-200" />
          <Footer tabs={tabs} />
        </div>
      </div>
    </div>
  )
}
