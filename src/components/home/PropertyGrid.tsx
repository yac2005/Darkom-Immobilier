'use client'
import { useState, useMemo } from 'react'
import { mockListings, formatPrice } from '@/data/mock-listings'
import { Property } from '@/types/property'
import PropertyCard from '@/components/shared/PropertyCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 6

interface Filters {
  transaction: string
  type: string
  wilaya: string
  priceMin: string
  priceMax: string
  surfaceMin: string
}

export default function PropertyGrid({ filters }: { filters: Filters }) {
  const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
    return mockListings.filter((p: Property) => {
        if (!p || !p.transaction) return false
        if (filters.transaction && p.transaction !== filters.transaction) return false
        if (filters.type && p.type !== filters.type) return false
        if (filters.wilaya && p.wilaya !== filters.wilaya) return false
        if (filters.priceMin && p.price < Number(filters.priceMin)) return false
        if (filters.priceMax && p.price > Number(filters.priceMax)) return false
        if (filters.surfaceMin && p.surface < Number(filters.surfaceMin)) return false
        return true
    })
    }, [filters])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const goTo = (n: number) => {
    setPage(n)
    window.scrollTo({ top: 600, behavior: 'smooth' })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nos biens disponibles</h2>
          <p className="text-sm text-gray-500 mt-1">{filtered.length} résultat{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
          <span>Trier par</span>
          <select className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-emerald-500">
            <option>Plus récent</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Surface</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🏠</p>
          <p className="text-gray-500 text-sm">Aucun bien ne correspond à vos critères.</p>
          <p className="text-gray-400 text-xs mt-1">Essayez de modifier vos filtres.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-700 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goTo(n)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                page === n
                  ? 'bg-emerald-700 text-white border border-emerald-700'
                  : 'border border-gray-200 text-gray-600 hover:border-emerald-700 hover:text-emerald-700'
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-700 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  )
}