import { finUserThreadsAndComments } from '@/lib/utils'
import React from 'react'
import ThreadiCard from '../cards/ThreadiCard'

type UserThreadsAndComments = {
  thread_uuid: string
  thread_text: string
  thread_created_at: string
  thread_author: {
    author_name: string
    author_image: string
    author_uuid: string
  }
  comments: 
    {
      comment_uuid: string
      comment_author: {
        name: string
        image: string
        uuid: string
      }
    }[]
  replies_count: number
}[]


type Props = {
  currentUserId: string | undefined
  profileUserId: string
  accountType: "user" | "community"
}

export default async function ThreadsTab({accountType, profileUserId, currentUserId}: Props) {

  const userThreadsAndComments: UserThreadsAndComments = await finUserThreadsAndComments(profileUserId)

    // TODO: fetch profile threads 
  return (
    <section className='mt-9 flex flex-col gap-10'>
      {userThreadsAndComments.map(({comments,replies_count,thread_author,thread_created_at,thread_text,thread_uuid}) => (
        <ThreadiCard key={thread_uuid} id={thread_uuid} authorId={thread_author.author_uuid} currentUser={currentUserId} content={thread_text} createdAt={thread_created_at} commentsCount={replies_count} authorName={thread_author.author_name} authorImage={thread_author.author_image} comments={comments}/>
      ))}
    </section>
  )
}
