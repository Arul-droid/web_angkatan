'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { getMenfessListAction } from '@/actions/menfess'

import MenfessCard from '../../molecules/MenfessCard'
import type { MenfessRecord } from '@/types/menfess'

const ITEMS_PER_PAGE = 6

const getPaginationItems = (
  currentPage: number,
  totalPages: number
) => {
  const pages: (number | string)[] = []
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    )
  }
  if (currentPage <= 3) {
    pages.push(1, 2, 3, '...', totalPages)
    return pages
  }
  if (currentPage >= totalPages - 2) {
    pages.push(
      1,
      '...',
      totalPages - 2,
      totalPages - 1,
      totalPages
    )

    return pages
  }
  pages.push(
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  )
  return pages
}

const Menfess = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [items, setItems] = useState<MenfessRecord[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMenfess = async () => {
      setLoading(true)

      const result = await getMenfessListAction({
        page: currentPage,
        limit: ITEMS_PER_PAGE
      })

      if (result.success && result.data) {
        setItems(result.data.items)

        setTotalPages(
          Math.max(
            1,
            Math.ceil(
              result.data.total /
                ITEMS_PER_PAGE
            )
          )
        )
      }

      setLoading(false)
    }

    loadMenfess()
  }, [currentPage])

  return (
    <section 
      id="menfess-container" 
      className="bg-blue-cs-40 relative z-10 flex w-full items-center justify-center pb-24 px-6 lg:px-4"
    >
      <Image
          src="/assets/images/fess-bg.png" // Langsung gunakan path dari root
          alt="Menfess Background"
          draggable={false}
          fill
          priority
          className="object-cover object-top -z-10 mix-blend-color-dodge pointer-events-none select-none"
      />

      <div className="from-[#0B1E38] to-[#173679]/0 absolute inset-0 bg-gradient-to-b pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col gap-10">
        {/* Container Cards: flex-col untuk Mobile, md:grid-cols-2 untuk Desktop */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 w-full">
          {loading ? (
            <div className="col-span-2 py-20 text-center text-white">
              Loading...
            </div>
          ) : items.length === 0 ? (
            <div className="col-span-2 py-20 text-center text-white">
              No menfess found.
            </div>
          ) : (
            items.map((data) => (
              <MenfessCard
                key={data.id}
                id={data.id}
                from={data.from ?? '-'}
                to={data.to ?? '-'}
                message={data.message}
                timestamp={new Date(data.created_at).toLocaleString()}
                reactions={{
                  laugh: 0,
                  love: 0,
                  sad: 0,
                  angry: 0
                }}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-white">
            {/* Prev */}
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (prev) => prev - 1
                )
              }
              className={`
                flex h-8 w-8 items-center justify-center rounded transition
                ${
                  currentPage === 1
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:bg-white/10 cursor-pointer'
                }
              `}
            >
              &lt;
            </button>

            {getPaginationItems(
              currentPage,
              totalPages
            ).map((item, index) => {
              if (item === '...') {
                return (
                  <span
                    key={`dots-${index}`}
                    className="px-1"
                  >
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={item}
                  onClick={() =>
                    setCurrentPage(
                      item as number
                    )
                  }
                  className={`
                    flex h-8 w-8 items-center justify-center rounded transition
                    ${
                      currentPage === item
                        ? 'bg-white font-bold text-[#0B1E38]'
                        : 'border border-white hover:bg-white/10 cursor-pointer'
                    }
                  `}
                >
                  {item}
                </button>
              )
            })}

            {/* Next */}
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(
                  (prev) => prev + 1
                )
              }
              className={`
                flex h-8 w-8 items-center justify-center rounded transition
                ${
                  currentPage === totalPages
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:bg-white/10 cursor-pointer'
                }
              `}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Menfess