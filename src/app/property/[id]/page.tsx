'use client'
import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import { mockListings, formatPrice } from '@/data/mock-listings'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PropertyCard from '@/components/shared/PropertyCard'
import {
  MapPin, BedDouble, Maximize2, Bath, Car, Layers,
  CheckCircle2, XCircle, Phone, Mail, ChevronLeft,
  ChevronRight, ArrowLeft
} from 'lucide-react'

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const property = mockListings.find((p) => p.id === id)
  if (!property) notFound()

  const [currentImage, setCurrentImage] = useState(0)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const similar = mockListings.filter(
    (p) => p.id !== property.id && (p.type === property.type || p.wilaya === property.wilaya)
  ).slice(0, 3)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
  }

  const specs = [
    { icon: <Maximize2 size={18} />, label: 'Surface', value: `${property.surface} m²` },
    ...(property.rooms > 0 ? [{ icon: <BedDouble size={18} />, label: 'Pièces', value: `${property.rooms} pièces` }] : []),
    ...(property.bathrooms ? [{ icon: <Bath size={18} />, label: 'Salles de bain', value: `${property.bathrooms}` }] : []),
    ...(property.floor !== undefined ? [{ icon: <Layers size={18} />, label: 'Étage', value: `${property.floor} / ${property.totalFloors ?? '?'}` }] : []),
    ...(property.parking !== undefined ? [{ icon: <Car size={18} />, label: 'Parking', value: property.parking ? 'Oui' : 'Non' }] : []),
  ]

  const amenities = [
    { label: 'Meublé', value: property.furnished },
    { label: 'Ascenseur', value: property.elevator },
    { label: 'Balcon / Terrasse', value: property.balcony },
    { label: 'Parking', value: property.parking },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Back */}
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-700 transition-colors mb-6">
          <ArrowLeft size={15} />
          Retour aux annonces
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COL */}
          <div className="lg:col-span-2 space-y-6">

            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-video">
              <img
                src={property.images[currentImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Transaction badge */}
              <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-lg ${
                property.transaction === 'vente' ? 'bg-emerald-700 text-white' : 'bg-amber-500 text-white'
              }`}>
                {property.transaction === 'vente' ? 'À vendre' : 'À louer'}
              </span>

              {/* Nav arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => (p === 0 ? property.images.length - 1 : p - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentImage((p) => (p === property.images.length - 1 ? 0 : p + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    {currentImage + 1} / {property.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === currentImage ? 'border-emerald-700' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Location */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <MapPin size={14} className="text-emerald-600" />
                    <span>{property.address ?? `${property.commune}, ${property.wilaya}`}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-700">
                    {formatPrice(property.price, property.transaction)}
                  </p>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specs.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <span className="text-emerald-600">{s.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400">{s.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {amenities.some(a => a.value !== undefined) && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Équipements</h2>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((a, i) => (
                    a.value !== undefined && (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        {a.value
                          ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          : <XCircle size={16} className="text-gray-300 shrink-0" />
                        }
                        <span className={a.value ? 'text-gray-700' : 'text-gray-400'}>{a.label}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Map */}
            {property.lat && property.lng && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Localisation</h2>
                <div className="rounded-xl overflow-hidden h-64 bg-gray-100">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.lng - 0.01},${property.lat - 0.01},${property.lng + 0.01},${property.lat + 0.01}&layer=mapnik&marker=${property.lat},${property.lng}`}
                    title="Localisation du bien"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <MapPin size={11} />
                  {property.address ?? `${property.commune}, ${property.wilaya}`}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COL — Sticky sidebar */}
          <div className="space-y-4">
            <div className="sticky top-20 space-y-4">

              {/* Call / WhatsApp */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-sm font-semibold text-gray-900 mb-1">Intéressé par ce bien ?</p>
                <p className="text-xs text-gray-400 mb-4">Contactez-nous directement</p>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+213XXXXXXXXX"
                    className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                  >
                    <Phone size={15} />
                    Appeler maintenant
                  </a>
                  <a
                    href="https://wa.me/213XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-emerald-700 text-emerald-700 hover:bg-emerald-50 text-sm font-medium py-2.5 rounded-xl transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail size={15} className="text-emerald-600" />
                  Envoyer un message
                </p>

                {sent ? (
                  <div className="text-center py-6">
                    <CheckCircle2 size={32} className="text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">Message envoyé !</p>
                    <p className="text-xs text-gray-400 mt-1">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      required
                      type="text"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Téléphone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email (optionnel)"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                    <textarea
                      rows={3}
                      placeholder="Votre message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                    >
                      {sending ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Biens similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}