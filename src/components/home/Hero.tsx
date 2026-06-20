'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function Hero() {
  const [query, setQuery] = useState('')
  const [transaction, setTransaction] = useState<'vente' | 'location'>('vente')

  return (
    <section className="relative h-[85vh] min-h-[580px] flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-700/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          +2500 biens disponibles en Algérie
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Trouvez votre{' '}
          <span className="text-emerald-400">propriété</span>
          <br />
          idéale
        </h1>

        <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Découvrez notre sélection exclusive de biens immobiliers à travers toute l'Algérie
        </p>

        {/* Transaction Toggle */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
            <button
              onClick={() => setTransaction('vente')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                transaction === 'vente'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Acheter
            </button>
            <button
              onClick={() => setTransaction('location')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                transaction === 'location'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Louer
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto">
          <Search className="text-gray-400 ml-2 shrink-0" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par wilaya, commune, type de bien..."
            className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent py-2 px-1"
          />
          <button className="bg-emerald-700 hover:bg-emerald-800 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-xl">
            Rechercher
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">✓</span>
            +2500 biens disponibles
          </div>
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">✓</span>
            Agence agréée par l'État
          </div>
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">✓</span>
            Annonces vérifiées
          </div>
        </div>
      </div>
    </section>
  )
}