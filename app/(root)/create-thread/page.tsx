import React from 'react'
import { findUser } from '@/lib/utils'
import { redirect } from 'next/navigation'
import PostThread from '@/components/forms/PostThread'
import {currentUser} from "@clerk/nextjs"


async function page() {

  const clerkUser = await currentUser()

  if(!clerkUser) return null

  const {username} = clerkUser

  console.log({username})

  const dbUser = username && await findUser(username)

  if(!dbUser) return null

  if(!dbUser.onboarded) redirect("/onboarding")

  return (
    <>
      <h1 className='head-text'>Create Thread</h1>
      <PostThread userId={dbUser.uuid} />
    </>
  )
}

export default page