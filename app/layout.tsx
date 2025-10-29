import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Nextor University',
  description: 'Framework per gestire landing page dinamiche in base alle richieste degli utenti.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
