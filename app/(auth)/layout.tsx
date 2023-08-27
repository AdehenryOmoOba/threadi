import "../globals.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from "./NextAuthSessionProvider"


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
      <NextAuthSessionProvider>
        <body className={`${inter.className} bg-dark-1`}>
          {children}
        </body>
      </NextAuthSessionProvider>
    </html>
  )
}
