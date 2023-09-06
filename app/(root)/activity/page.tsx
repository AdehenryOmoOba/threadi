import ThreadiCard from '@/components/cards/ThreadiCard'
import HeadText from '@/components/shared/HeadText'
import { fetchUserActivities } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function page({searchParams: {user_id, profile_image,profile_name,profile_email}}: {searchParams: {user_id: string, profile_image: string,profile_name: string,profile_email: string}}) {

  if(!user_id) return null

  const activities =  await fetchUserActivities(user_id)

  return (
    <section>
      <HeadText content='Activity' />
      <section className='mt-10 flex flex-col gap-5'>
      {!!activities?.length ? (activities.map((activity) => (
      <div key={activity.comment_author_id} className='w-full'>
        <article className='activity-card'>
          <Link className='w-full flex gap-x-2' href={`/thread/${activity.comment_parent_id}?user=${user_id}`}>
            <div className='relative h-5 w-5 overflow-hidden rounded-full object-cover'>
              <Image src={activity.comment_author_image} alt='profile picture' fill className='rounded-full object-cover' />
            </div>
            <p className='!text-small-regular text-light-1'><span className='mr-1 text-primary-500'>{activity.comment_author_name}</span> replied to your thread</p>
          </Link>
          <ThreadiCard authorEmail={profile_email} authorId={user_id} authorImage={profile_image} authorName={profile_name} isComment id={user_id} content={activity.parent_thread_text} createdAt={activity.parent_thread_created_at} currentUser={user_id} commentsCount={0} isSUbThread threadParentId={activity.comment_parent_id}/>
        </article>
      </div>)))
      : (<p className='!text-base-regular text-light-3'>You currently have no activity</p>)}
      </section>

    </section>
  )
}

export default page