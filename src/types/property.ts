export type PropertyType = 'appartement' | 'villa' | 'terrain' | 'local'
export type TransactionType = 'vente' | 'location'

export interface Property {
  id: string
  title: string
  description: string
  type: PropertyType
  transaction: TransactionType
  price: number
  surface: number
  rooms: number
  floor?: number
  totalFloors?: number
  bathrooms?: number
  parking?: boolean
  furnished?: boolean
  elevator?: boolean
  balcony?: boolean
  wilaya: string
  commune: string
  address?: string
  lat?: number
  lng?: number
  images: string[]
  featured: boolean
  createdAt: Date
}