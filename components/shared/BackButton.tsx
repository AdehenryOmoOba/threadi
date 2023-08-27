"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {MdOutlineKeyboardBackspace} from "react-icons/md"
import React from 'react'


const routeMaps = new Map([
  ["/", "home"],
  ["/search", "search"],
  ["/activity", "activity"],
  ["/create-thread", "create-thread"],
  ["/communities", "communities"],
  ["/profile", "profile"],

])

function BackButton() {
  const searchParams = useSearchParams()
  const path =  usePathname()
  const router = useRouter()

  const isCurrentUser = searchParams.has("current_user")

  if(routeMaps.has(path) || isCurrentUser) return null

  return (
    <div className='w-full h-max -mt-8 mb-4 md:-mt-4 max-w-[900px]'>
      <button onClick={() => router.back()} className='text-light-1 text-heading3-bold'>
        <MdOutlineKeyboardBackspace />
      </button>
    </div>
  )
}

export default BackButton