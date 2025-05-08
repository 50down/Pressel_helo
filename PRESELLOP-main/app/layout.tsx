import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yasmin',
  description: 'Privacy',
  generator: 'meninorubens',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
