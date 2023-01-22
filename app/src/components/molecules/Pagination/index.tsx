import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type PaginationProps = {
  currentPage: number
  pages: number
}

const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage, pages } = props

  const router = useRouter()
  const pathname = router.pathname

  return (
    <nav className="flex items-center justify-between border-t border-gray-200">
      <div className="-mt-px flex w-0 flex-1">
        <Link
          href={{
            pathname,
            query: { page: Math.max(currentPage - 1, 1) },
          }}
          className={`inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${
            currentPage === 1 ? 'hidden' : 'visible'
          }`}
        >
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {Array.from(Array(pages).keys())
          .map((x) => x + 1)
          .map((page) => {
            return (
              <Link
                key={page}
                href={{
                  pathname,
                  query: { page: page },
                }}
                className={`inline-flex items-center border-t-2  px-4 pt-4 text-sm font-medium ${
                  currentPage === page
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {page}
              </Link>
            )
          })}
      </div>
      {/* FIXME: ページが多いときはdotsを使用するようにする */}
      {/* <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
        ...
      </span> */}
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Link
          href={{
            pathname,
            query: { page: Math.min(currentPage + 1, pages) },
          }}
          className={`inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${
            currentPage === pages ? 'hidden' : 'visible'
          }`}
        >
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Link>
      </div>
    </nav>
  )
}

export default Pagination
