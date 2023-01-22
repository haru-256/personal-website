import { FC } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import icon from 'public/icon.png'

type Tab = {
  name: string
  href: string
  isHighlight: boolean
}

type HeaderProps = {
  tabs: Array<Tab>
}

const Header: FC<HeaderProps> = (props) => {
  const { tabs } = props
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                {/* Header Icon */}
                <div className="flex items-center">
                  <Link href={'/'}>
                    <Image
                      className="block h-10 w-auto rounded-full"
                      src={icon}
                      placeholder="blur"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                {/* Header Tabs for Desktop */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {tabs.map((tab) => {
                    return (
                      <Link
                        key={tab.name}
                        href={tab.href}
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                          tab.isHighlight
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-indigo-500'
                        }`}
                      >
                        {tab.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
              {/* Header menu button for Mobile */}
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {tabs.map((tab) => {
                return (
                  <Disclosure.Button
                    key={tab.name}
                    as="a"
                    href={tab.href}
                    className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                      tab.isHighlight
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </Disclosure.Button>
                )
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
