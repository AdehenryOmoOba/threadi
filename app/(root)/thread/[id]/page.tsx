import ThreadiCard from '@/components/cards/ThreadiCard'
import CommentBox from '@/components/forms/Comment'
import { getThredAndReplies } from '@/lib/utils'
import React from 'react'


type Props = {
  params: {id: string},
  searchParams: {
    user: string
  }
}

async function page({params: {id}, searchParams: {user}}: Props) {
  
  const tacr = await getThredAndReplies(id)

  if(!tacr) return null
  
  return (
    <section className='relative mt-10'>
      <div>
      <ThreadiCard
       id={tacr.thread_uuid}
       currentUser={user}
       content={tacr.thread_text}
       authorId={tacr.thread_author_uuid}
       authorImage={tacr.thread_author_image}
       authorName={tacr.thread_author_name}
       communityId={tacr.parent_community_uuid || undefined}
       communityName={tacr.thread_community_name || undefined}
       communityImage={tacr.thread_community_image || undefined}
       createdAt={tacr.thread_created_at}
       authorEmail={tacr.thread_author_email}
       commentsCount={tacr.thread_reply_count}
       linkDisabled={true}
       threadParentId={tacr.thread_parent_id}
       isLiked={tacr.thread_likes?.some((id) => id === user) || false}
       likesCount={tacr.thread_likes?.length || 0}
       />
      </div>

      <div className='mt-7'>
        <CommentBox threadId={tacr.thread_uuid} />
      </div>

      <div className='mt-10'>
        { tacr.comments[0] &&
          tacr.comments?.map((child) => (
            <ThreadiCard
            key={child.comment_uuid}
            id={child.comment_uuid}
            currentUser={user}
            content={child.comment_text}
            authorId={child.comment_author_uuid}
            authorImage={child.comment_author_image}
            authorName={child.comment_author_name}
            createdAt={child.comment_created_at}
            commentsCount={Number(child.comment_reply_count)}
            authorEmail={child.comment_author_email}
            isComment={true}
            threadParentId={tacr.thread_uuid}
            isLiked={child.comment_likes?.some((id) => id === user) || false}
            likesCount={child.comment_likes?.length || 0}
            />
          ))
        }
      </div>
    </section>
  )
}

export default page