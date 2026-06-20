'use client'
import { useState } from 'react'
import { Phone, MessageCircle, Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DK</span>
            </div>
            <div className="leading-tight">
              <span className="font-bold text-gray-900 text-sm tracking-wide">DARKOM</span>
              <p className="text-[10px] text-emerald-700 font-medium tracking-widest uppercase">Immobilier</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">Accueil</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">Acheter</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">Louer</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">Estimer</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50">
              <Phone size={15} />
              Appeler
            </Button>
            <Button size="sm" className="gap-2 bg-emerald-700 hover:bg-emerald-800 text-white">
              <MessageCircle size={15} />
              WhatsApp
            </Button>
            <button className="ml-2 text-gray-500 hover:text-emerald-700 transition-colors">
              <Globe size={18} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <a href="#" className="text-sm font-medium text-gray-700">Accueil</a>
          <a href="#" className="text-sm font-medium text-gray-700">Acheter</a>
          <a href="#" className="text-sm font-medium text-gray-700">Louer</a>
          <a href="#" className="text-sm font-medium text-gray-700">Estimer</a>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="gap-2 flex-1 border-emerald-700 text-emerald-700">
              <Phone size={15} /> Appeler
            </Button>
            <Button size="sm" className="gap-2 flex-1 bg-emerald-700 text-white">
              <MessageCircle size={15} /> WhatsApp
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}