import '@/styles/globals.css'
import '@/styles/rehype-pretty-code.css'
import '@/styles/rehype-katex.css'
import '@/styles/rehype-toc.css'
import type { AppProps } from 'next/app'
import Header from '@/components/organism/Header'
import Footer from '@/components/organism/Footer'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react'
import { Provider as WrapBalancerProvider } from 'react-wrap-balancer'
import React from 'react'

type Tab = {
  name: string
  href: string
  isCurrentTab: boolean
}

export const TabsContext = React.createContext<Tab[]>([])

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const tabs = [
    {
      name: 'Home',
      href: '/',
      isCurrentTab: router.pathname === '/',
    },
    {
      name: 'Blog',
      href: '/blog',
      isCurrentTab: router.pathname === '/blog',
    },
    // {
    //   name: 'Project',
    //   href: '/project',
    //   isHighlight: router.pathname === '/project',
    // },
    // {
    //   name: 'About',
    //   href: '/about',
    //   isHighlight: router.pathname === '/about',
    // },
  ]
  return (
    <>
      <TabsContext.Provider value={tabs}>
        <WrapBalancerProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </WrapBalancerProvider>
      </TabsContext.Provider>
      <Analytics />
    </>
  )
}
