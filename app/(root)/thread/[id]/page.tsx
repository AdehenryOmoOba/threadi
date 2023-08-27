import ThreadiCard from '@/components/cards/ThreadiCard'
import CommentBox from '@/components/forms/Comment'
import { getComments } from '@/lib/utils'
import React from 'react'


type Props = {
  params: {id: string}, 
  searchParams: {user: string, table: string}

}

async function page({params: {id}, searchParams: {user, table}}: Props) {
  
  const tacr = await getComments(id, table)

  if(!tacr) return null

  return (
    <section className='relative'>
      <div>
      <ThreadiCard
       key={tacr.uuid}
       id={tacr.uuid}
       currentUser={user}
       content={tacr.text}
       authorId={tacr.author}
       authorImage={tacr.thread_author_image}
       authorName={tacr.thread_author_name}
       communityId={tacr.community?.uuid}
       communityName={tacr.community?.name}
       communityImage={tacr.community?.image}
       createdAt={tacr.created_at}
       commentsCount={tacr.replies_count}
       linkDisabled={true}
       />
      </div>

      <div className='mt-7'>
        <CommentBox threadId={id} currentUser={user} />
      </div>

      <div className='mt-10'>
        {
          tacr.replies?.map((child) => (
            <ThreadiCard
            key={child.comment_uuid}
            id={child.comment_uuid}
            currentUser={user}
            content={child.comment_text}
            authorId={child.comment_author_uuid}
            authorImage={child.comment_author_image}
            authorName={child.comment_author_name}
            createdAt={child.comment_created_at}
            commentsCount={Number(child.replies_count)}
            isComment={true}
            />
          ))
        }
      </div>
    </section>
  )
}

export default page