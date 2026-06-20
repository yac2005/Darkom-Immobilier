import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Darkom Immobilier — Trouvez votre bien idéal en Algérie',
  description: 'Découvrez notre sélection exclusive de biens immobiliers en Algérie. Appartements, villas, terrains et locaux commerciaux.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}