import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopBar from '@/components/shared/TopBar'
import LeftSideBar from '@/components/shared/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar'
import BottomBar from '@/components/shared/BottomBar'
import NextAuthSessionProvider from '../(auth)/NextAuthSessionProvider'
import BackButton from '@/components/shared/BackButton'


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
        <body className={`${inter.className}`}>
          <TopBar />
          <main className='flex flex-row'>
            <LeftSideBar />
            <section className="main-container">
              <BackButton />
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSideBar />
          </main>
          <BottomBar/>
        </body>
      </NextAuthSessionProvider>
    </html>
  )
}
