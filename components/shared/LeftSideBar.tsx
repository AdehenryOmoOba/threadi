"use client"
import React from 'react'
import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname} from 'next/navigation'
import logoutSvg from "../../public/assets/logout.svg"


function LeftSideBar() {
  
  const path = usePathname()
  const router = useRouter()

  return (
    <section className='custom_scrollbar leftsidebar'>

      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {

          const isActive = link.route === path

          return (
            <Link key={link.label} href={link.route} className={`leftsidebar_link ${isActive && "bg-primary-500"}`}>
            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
            <p className="text-light-1 max-lg:hidden">{link.label}</p>
          </Link>
          )
        })}
      </div>

      <div className="mt-10 p-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/login")}>
            <div className="flex cursor-pointer gap-4 ">
              <Image src={logoutSvg} alt='logout' width={24} height={24}/>
              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>

    </section>
  )
}

export default LeftSideBar