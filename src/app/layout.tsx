import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { Topbar } from '@/components/Topbar'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'RecoSphere Lite',
  description: 'AI Powered Recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 md:ml-64 flex flex-col">
            <Topbar />
            <main className="flex-1 p-6 lg:p-10 z-10 w-full overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
        <Toaster theme="dark" />
      </body>
    </html>
  )
}
