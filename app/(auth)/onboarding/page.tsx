import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AccountProfile from '@/components/forms/AccountProfile'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import defaultImage from "../../../public/assets/profile.svg"
import HeadText from '@/components/shared/HeadText'


async function page() {
  const session = await getServerSession(authOptions)

  const user = session?.user

  if(!user || user.onboarded === true) return redirect("/")

  const userData = {
    id: user.pgUUID,
    name: user?.name || "",
    image: user?.image ||  defaultImage,
    bio: user.bio || ""
  }

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      {/* <h1 className='head-text text-light-2'>Onboarding...</h1> */}
      <HeadText content='Onboarding' />
      <p className='mt-3 text-base-regular text-light-2'>Welcome threadite 🤗,  complete your profile to start creating threads.</p>
      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile  user={userData}/>
      </section>
    </main>
  )
}

export default page