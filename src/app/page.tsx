'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import FilterBar from '@/components/home/FilterBar'
import PropertyGrid from '@/components/home/PropertyGrid'
import Footer from '@/components/layout/Footer'

interface Filters {
  transaction: string
  type: string
  wilaya: string
  priceMin: string
  priceMax: string
  surfaceMin: string
}

const defaultFilters: Filters = {
  transaction: '',
  type: '',
  wilaya: '',
  priceMin: '',
  priceMax: '',
  surfaceMin: '',
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <FilterBar onFilter={setFilters} />
      <PropertyGrid filters={filters} />
      <Footer />
    </main>
  )
}