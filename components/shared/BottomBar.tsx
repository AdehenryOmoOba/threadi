"use client"
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function BottomBar() {
  const path = usePathname()

  return (
    <section className='bottombar'>
      <div className="bottombar_container">
      {sidebarLinks.map((link) => {

        const isActive = path.includes(link.route)

        return (
          <Link key={link.label} href={link.route} className={`bottombar_link ${isActive && "bg-primary-500"}`}>
          <Image src={link.imgURL} alt={link.label} width={24} height={24} />
          <p className="text-light-1 text-subtle-medium max-sm:hidden">{link.label.split(" ")[0]}</p>
        </Link>
        )
        })}
      </div>
    </section>
  )
}

export default BottomBar