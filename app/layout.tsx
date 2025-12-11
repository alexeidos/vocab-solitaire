import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vocabulary Solitaire - Learn English Through Play',
  description: 'A fun card matching game to learn English vocabulary. Match words by category while learning definitions.',
  keywords: ['vocabulary', 'english learning', 'card game', 'solitaire', 'education'],
  openGraph: {
    title: 'Vocabulary Solitaire',
    description: 'Learn English vocabulary through a fun card matching game',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
