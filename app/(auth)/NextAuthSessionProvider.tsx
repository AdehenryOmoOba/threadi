"use client"
import React from 'react'
import {SessionProvider} from "next-auth/react"
import { authOptions } from '../api/auth/[...nextauth]/route'


function NextAuthSessionProvider({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default NextAuthSessionProvider