'use client'
import { useState } from 'react'
import { SlidersHorizontal, RotateCcw } from 'lucide-react'
import { wilayas } from '@/data/mock-listings'

const propertyTypes = [
  { value: '', label: 'Tous les types' },
  { value: 'appartement', label: 'Appartements' },
  { value: 'villa', label: 'Villas' },
  { value: 'terrain', label: 'Terrains' },
  { value: 'local', label: 'Locaux commerciaux' },
]

const priceRangesVente = [
  { value: '', label: 'Prix min' },
  { value: '50000000', label: '50 Millions' },
  { value: '100000000', label: '100 Millions' },
  { value: '500000000', label: '500 Millions' },
  { value: '1000000000', label: '1 Milliard' },
]

const priceRangesVenteMax = [
  { value: '', label: 'Prix max' },
  { value: '100000000', label: '100 Millions' },
  { value: '500000000', label: '500 Millions' },
  { value: '1000000000', label: '1 Milliard' },
  { value: '5000000000', label: '5 Milliards' },
]

const surfaceOptions = [
  { value: '', label: 'Surface min' },
  { value: '30', label: '30 m²' },
  { value: '60', label: '60 m²' },
  { value: '100', label: '100 m²' },
  { value: '200', label: '200 m²' },
]

interface Filters {
  transaction: string
  type: string
  wilaya: string
  priceMin: string
  priceMax: string
  surfaceMin: string
}

interface FilterBarProps {
  onFilter: (filters: Filters) => void
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [filters, setFilters] = useState<Filters>({
    transaction: '',
    type: '',
    wilaya: '',
    priceMin: '',
    priceMax: '',
    surfaceMin: '',
  })

  const update = (key: keyof Filters, value: string) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
    onFilter(updated)
  }

  const reset = () => {
    const empty: Filters = {
      transaction: '',
      type: '',
      wilaya: '',
      priceMin: '',
      priceMax: '',
      surfaceMin: '',
    }
    setFilters(empty)
    onFilter(empty)
  }

  const selectClass =
    'w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none'

  return (
    <section className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Header row */}
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal size={16} className="text-emerald-700" />
          <span className="text-sm font-medium text-gray-700">Filtrer les biens</span>
        </div>

        {/* Filters grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <select
            value={filters.transaction}
            onChange={(e) => update('transaction', e.target.value)}
            className={selectClass}
          >
            <option value="">Vente / Location</option>
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => update('type', e.target.value)}
            className={selectClass}
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          <select
            value={filters.wilaya}
            onChange={(e) => update('wilaya', e.target.value)}
            className={selectClass}
          >
            <option value="">Toutes les wilayas</option>
            {wilayas.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>

          <select
            value={filters.priceMin}
            onChange={(e) => update('priceMin', e.target.value)}
            className={selectClass}
          >
            {priceRangesVente.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          <select
            value={filters.priceMax}
            onChange={(e) => update('priceMax', e.target.value)}
            className={selectClass}
          >
            {priceRangesVenteMax.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          <select
            value={filters.surfaceMin}
            onChange={(e) => update('surfaceMin', e.target.value)}
            className={selectClass}
          >
            {surfaceOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Reset */}
        <div className="flex justify-end mt-3">
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-700 transition-colors"
          >
            <RotateCcw size={12} />
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </section>
  )
}