"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'


function LinkItems({label, route, imgURL}: {label: string, route: string, imgURL: string}) {
  
  const path = usePathname()
  const {data} = useSession()

  const isActive = path.includes(route) && route.length > 1 || path === "/" && route === "/" || path.startsWith("/thread") && route === "/"

  if(data?.user && route === "/profile") route = (`/profile/${data.user.pgUUID}?current_user=${data.user.name}&profile_email=${data.user.email}&profile_image=${data.user.image}&profile_name=${data.user.name}`)

  if(!data?.user && route === "/profile") route = "#"

  if(!data?.user && route === "/activity") route = "#"

  if(data?.user && route === "/activity") route = `/activity?user_id=${data.user.pgUUID}&profile_image=${data.user.image}&profile_name=${data.user.name}&profile_email=${data.user.email}`

  return (
    <Link key={label} href={route} className={`leftsidebar_link ${isActive && "bg-primary-500"} `}>
    <Image src={imgURL} alt={label} width={24} height={24} />
    <p className="text-light-1 max-lg:hidden">{label}</p>
  </Link>
  )
}

export default LinkItems