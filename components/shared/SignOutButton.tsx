"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import logoutSvg from "../../public/assets/logout.svg"


function SignOutButton() {

  const handleLogout = async () => {
    await signOut()
  }

  return (
  <div onClick={handleLogout} className="flex cursor-pointer md:gap-4">
    <Image src={logoutSvg} alt='logout' width={24} height={24}/>
    <p className='hidden text-light-2 max-lg:hidden md:block'>Logout</p>
  </div>
  )
}

export default SignOutButton

