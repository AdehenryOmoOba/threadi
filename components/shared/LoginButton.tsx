"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function LoginButton() {
  const router = useRouter()
  return (
    <Button onClick={() => router.push("/login")} className='bg-dark-1 text-[14px] text-slate-400 font-semibold border border-slate-600'>
      Login
    </Button>
  )
}

export default LoginButton