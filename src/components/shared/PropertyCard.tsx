import { MapPin, BedDouble, Maximize2, Phone, Eye } from 'lucide-react'
import { mockListings, formatPrice } from '@/data/mock-listings'
import { Property } from '@/types/property'
export default function PropertyCard({ property }: { property: Property }) {
  const typeLabels: Record<string, string> = {
    appartement: 'Appartement',
    villa: 'Villa',
    terrain: 'Terrain',
    local: 'Local commercial',
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Transaction Badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-lg ${
          property.transaction === 'vente'
            ? 'bg-emerald-700 text-white'
            : 'bg-amber-500 text-white'
        }`}>
          {property.transaction === 'vente' ? 'À vendre' : 'À louer'}
        </span>

        {/* Type Badge */}
        <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-lg bg-black/50 text-white backdrop-blur-sm">
          {typeLabels[property.type]}
        </span>

        {/* Featured ribbon */}
        {property.featured && (
          <span className="absolute bottom-3 left-3 text-xs font-medium px-2.5 py-1 rounded-lg bg-white/90 text-emerald-700 backdrop-blur-sm">
            ★ Coup de cœur
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1.5">
          <MapPin size={12} />
          <span>{property.commune}, {property.wilaya}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-3 line-clamp-2">
          {property.title}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          {property.rooms > 0 && (
            <div className="flex items-center gap-1">
              <BedDouble size={13} className="text-emerald-600" />
              <span>{property.rooms} pièces</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize2 size={13} className="text-emerald-600" />
            <span>{property.surface} m²</span>
          </div>
        </div>

        {/* Price */}
        <p className="text-base font-bold text-emerald-700 mb-4">
          {formatPrice(property.price, property.transaction)}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium border border-emerald-700 text-emerald-700 hover:bg-emerald-50 transition-colors py-2 rounded-xl">
            <Phone size={13} />
            Appeler
          </button>
          <a
          href={`/property/${property.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-emerald-700 hover:bg-emerald-800 text-white transition-colors py-2 rounded-xl"
            >
              <Eye size={13} />
              Voir plus
            </a>
        </div>
      </div>
    </div>
  )
}