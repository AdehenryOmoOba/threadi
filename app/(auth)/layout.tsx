import "../globals.css"
import type { Metadata } from 'next'
import {ClerkProvider} from "@clerk/nextjs"
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Threadi',
    description: 'A social blogging website powered by NextJS',
  }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${inter.className} bg-dark-1`}>
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}
