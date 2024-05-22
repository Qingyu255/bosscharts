import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SMU BOSS Charts',
  description: 'SMU Boss Bidding Charts - Visualise Bid Price History and Analyse Detailed Bid Price Trends For Any Course',
  icons: {
    icon: "/logo.png"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Navbar />
            <div className='min-h-screen'>
              {children}
            </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
