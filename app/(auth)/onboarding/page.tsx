import AccountProfile from '@/components/forms/AccountProfile'
import React from 'react'
import {currentUser} from "@clerk/nextjs"


async function page() {

  const user = await currentUser()

  const userInfo = {
    id: "",
    username: "",
    name: "",
    bio: "",
    image: ""
  }

  const userData = {
    id: user?.id,
    objectId: userInfo?.id || undefined,
    username: userInfo?.username || undefined,
    name: userInfo?.name || user?.firstName || undefined,
    bio: userInfo?.bio || undefined,
    image: userInfo?.image || user?.imageUrl || undefined
  }


  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text text-light-2'>Onboarding...</h1>
      <p className='mt-3 text-base-regular text-light-2'>Welcome threadite 🤗,  complete your profile to start creating threads.</p>
      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile  user={userData}/>
      </section>
    </main>
  )
}

export default page