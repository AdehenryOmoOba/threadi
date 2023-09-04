import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ProfileHeader from '@/components/shared/ProfileHeader'
import { finUserThreadsAndComments, findUser } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import {redirect} from "next/navigation"
import defaultProfilePic from "../../../../public/assets/user.svg" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from '@/constants'
import Image from 'next/image'
import ThreadsTab from '@/components/shared/ThreadsTab'

type SearchParams = {
  profile_name: string,
  profile_image: string,
  profile_email: string
}


async function page({params, searchParams: {profile_name, profile_image, profile_email}}: {params: {id: string}, searchParams: SearchParams}) {

  const session = await getServerSession(authOptions)

  const user = session?.user
  
  if(user && !user.onboarded) redirect("/onboarding")

  const topThreads = await finUserThreadsAndComments(params.id)

  const profileHandle = `@${profile_email.split("@")[0]}`

  return (
    <section>
      <ProfileHeader currentUserId={user?.pgUUID} profileUserId={params.id} name={profile_name} userHandle={profileHandle} imgUrl={profile_image || defaultProfilePic} bio={topThreads?.user_bio || ""}/>
      <div className="mt-9">
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className='tab'>
          {
            profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image src={tab.icon} alt={tab.label} width={24} height={24} className='object-contain' />
                <p className='hidden md:block'>{tab.label}</p>
                {tab.label === "Threads" && 
                (<p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>{topThreads?.user_threads?.length ?? 0}</p>)} 
              </TabsTrigger>
            ))
          }
        </TabsList>
        {profileTabs.map((tab) => {
          if(tab.label === "Threads") return (
            <TabsContent key={`content-${tab.label}`} value={tab.value} className='w-full text-light-1'>
              <ThreadsTab topThreads={topThreads?.user_threads} currentUserId={user?.pgUUID} profileUserId={params.id} profileName={profile_name} profileEmail={profile_email} profile_image={profile_image} accountType="user" />
            </TabsContent>
          )
          return (
            <TabsContent key={`content-${tab.label}`} value={tab.value} className='w-full text-light-1'>
              <ThreadsTab currentUserId={user?.pgUUID} profileUserId={params.id} profileName={profile_name} profileEmail={profile_email} profile_image={profile_image} accountType="user" />
            </TabsContent>
          )
        }
        )}
      </Tabs>
      </div>
    </section>
  )
}

export default page