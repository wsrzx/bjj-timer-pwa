import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientLayout from './client-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BJJ Simple Timer',
  description: 'Simple timer for BJJ',
  manifest: '/manifest.json',
  themeColor: '#1f2937',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`${inter.className} w-full h-full p-0 m-0`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

