"use client"
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSession } from 'next-auth/react'
import LinkItems from './LinkItems'


function BottomBar() {
  const path = usePathname()
  const {data: user} = useSession()

  return (
    <section className='bottombar'>
      <div className="bottombar_container">
      {sidebarLinks.map((link) => {
        // if(!user && link.route === "/profile") link.route = "#"
        return (<LinkItems key={link.label} imgURL={link.imgURL} label={link.label} route={link.route} />)
      })}
      </div>
    </section>
  )
}

export default BottomBar