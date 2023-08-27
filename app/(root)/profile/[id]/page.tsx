import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ProfileHeader from '@/components/shared/ProfileHeader'
import { findUser } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import {redirect} from "next/navigation"
import defaultProfilePic from "../../../../public/assets/profile.svg" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from '@/constants'
import Image from 'next/image'
import ThreadsTab from '@/components/shared/ThreadsTab'


async function page({params}: {params: {id: string}}) {

  const session = await getServerSession(authOptions)

  const profileUser = await findUser(params.id)
  
  const user = session?.user
  
  if(user && !user.onboarded) redirect("/onboarding")
  

  const profileUserHandle = `@${profileUser?.email.split("@")[0]}`

  return (
    <section>
      <ProfileHeader currentUserId={user?.pgUUID} profileUserId={params.id} name={profileUser?.name} userHandle={profileUserHandle} imgUrl={profileUser?.image || defaultProfilePic} bio={profileUser?.bio || ""}/>
      <div className="mt-9">
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className='tab'>
          {
            profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image src={tab.icon} alt={tab.label} width={24} height={24} className='object-contain' />
                <p className='hidden md:block'>{tab.label}</p>
                {tab.label === "Threads" && 
                (<p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>{profileUser?.thread_count}</p>)} 
              </TabsTrigger>
            ))
          }
        </TabsList>
        {profileTabs.map((tab) => (
          <TabsContent key={`content-${tab.label}`} value={tab.value} className='w-full text-light-1'>
            <ThreadsTab currentUserId={user?.pgUUID} profileUserId={params.id} accountType="user" />
          </TabsContent>
        ))}
      </Tabs>
      </div>
    </section>
  )
}

export default page