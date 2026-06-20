import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DK</span>
              </div>
              <div>
                <p className="font-bold text-white text-sm">DARKOM</p>
                <p className="text-[10px] text-emerald-400 tracking-widest uppercase">Immobilier</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Votre partenaire immobilier de confiance en Algérie.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              {['Accueil', 'Acheter', 'Louer', 'Estimer', 'Contact'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Types de biens</h4>
            <ul className="space-y-2 text-sm">
              {['Villas', 'Appartements', 'Terrains', 'Locaux commerciaux'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                Alger, Algérie
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={15} className="text-emerald-500 shrink-0" />
                +213 XX XX XX XX
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={15} className="text-emerald-500 shrink-0" />
                contact@darkom.dz
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          © 2026 Darkom Immobilier. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}