import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../../public/threadi.png"
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs'
import logoutSvg from "../../public/assets/logout.svg"
import {dark} from "@clerk/themes"


function TopBar() {
  return (
    <nav className='topbar'>

      <Link href="/" className='flex items-center gap-4'>
        <Image src={logo} alt='logo' width={20} height={20}/>
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threadi</p>
      </Link>

      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src={logoutSvg} alt='logout' width={24} height={24}/>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher appearance={{elements: {organizationSwitcherTrigger: "py-2 px-4"}, baseTheme: dark}} />
      </div>
    </nav>
  )
}

export default TopBar