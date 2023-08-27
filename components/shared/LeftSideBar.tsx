"use client"
import React from 'react'
import { sidebarLinks } from '@/constants'
import { useSession } from 'next-auth/react'
import SignOutButton from './SignOutButton'
import LinkItems from './LinkItems'


function LeftSideBar() {
  const {data: user} = useSession()

  return (
    <section className='custom_scrollbar leftsidebar'>

      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          return (<LinkItems key={link.label} imgURL={link.imgURL} label={link.label} route={link.route} />)
        })}
      </div>

      <div className="mt-10 p-6">
        {user && (<SignOutButton />)}
      </div>
    </section>
  )
}

export default LeftSideBar