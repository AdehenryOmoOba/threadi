import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../../public/threadi.png"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignOutButton from './SignOutButton'
import {DropdownMenuCheckboxes} from "../shared/DropDownMenu"
import defaultProfileImage from "../../public/assets/profile.svg"
import { Button } from '../ui/button'
import LoginButton from './LoginButton'

async function TopBar() {

  const session = await getServerSession(authOptions)

  const user = session?.user

  return (
    <nav className='topbar'>
      <Link href="/" className='flex items-center gap-4'>
        <Image src={logo} alt='logo' width={20} height={20}/>
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threadi</p>
      </Link>

      <div className='flex items-center gap-1'>
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