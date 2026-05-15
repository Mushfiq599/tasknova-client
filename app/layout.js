import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'TaskNova — Micro Task & Earning Platform',
  description: 'Complete micro tasks and earn real money on TaskNova.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}