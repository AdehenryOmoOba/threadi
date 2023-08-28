"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { HiOutlineLogin } from 'react-icons/hi'

function LoginButton() {
  const router = useRouter()
  return (
    <Button onClick={() => router.push("/login")} className='bg-transparent rounded-lg text-[24px] text-slate-500'>
      <HiOutlineLogin />
    </Button>
  )
}

export default LoginButton