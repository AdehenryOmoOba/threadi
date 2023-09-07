import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Borel } from 'next/font/google'
import logo from "../../public/threadi.png"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignOutButton from './SignOutButton'
import {DropdownMenuCheckboxes} from "../shared/DropDownMenu"
import defaultProfileImage from "../../public/assets/user.svg"
import LoginButton from './LoginButton'


const borel = Borel({weight: "400", subsets: ['latin']})

async function TopBar() {

  const session = await getServerSession(authOptions)

  const user = session?.user

  return (
    <nav className='topbar bg-transparent backdrop-blur-lg md:backdrop-blur-0'>
      <Link href="/" className='flex items-center gap-2'>
        <Image className='hidden sm:flex rounded-full xs:hidden lg:flex' src={logo} alt='logo' width={40} height={40}/>
        <p className={`${borel.className} !flex h-10 leading-10 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]  bg-clip-text text-transparent text-heading4-medium  max-xs:hidden`}>Threadi</p>
      </Link>

      <div className='flex items-center'>
        <div className='block md:hidden'>
          {user && (<SignOutButton />)}
        </div>
        <div className=''>
          {user ? 
          (<DropdownMenuCheckboxes profileImage={user.image || defaultProfileImage} />) 
          : <LoginButton />
          }
        </div>
      </div>
    </nav>
  )
}

export default TopBar