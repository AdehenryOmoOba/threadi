import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import PostThread from '@/components/forms/PostThread'
import HeadText from '@/components/shared/HeadText'
import { getServerSession } from 'next-auth'
import {redirect} from "next/navigation"


async function page() {

  const session = await getServerSession(authOptions)

  const user = session?.user

  if(!user) redirect("/login")

  if(!user.onboarded) redirect("/onboarding")

  return (
    <>
      {/* <h1 className='head-text'>Create Thread</h1> */}
      <HeadText content='Create Thread' />
      <PostThread userId={user.pgUUID}/>
    </>
  )
}

export default page