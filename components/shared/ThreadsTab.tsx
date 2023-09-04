import React from 'react'
import ThreadiCard from '../cards/ThreadiCard'
import defaultProfileImg from "@/public/assets/user.svg"


type TopThreads = {
  uuid: string;
  text: string;
  author: string;
  community: string | null;
  created_at: string;
  likes: string[] | null;
  reposts: string[] | null;
  shares_count: number;
  views_count: number;
  parent_id: string | null;
  reply_count: number;
}[] | null


type Props = {
  currentUserId: string | undefined
  profileUserId: string
  accountType: "user" | "community"
  topThreads?: TopThreads
  profileName: string,
  profileEmail: string
  profile_image: string | undefined
}

export default async function ThreadsTab({currentUserId, topThreads, profileName, profileEmail, profile_image}: Props) {

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {topThreads && topThreads.map(({uuid, author, text, created_at, reply_count}) => (
        <ThreadiCard key={uuid} id={uuid} authorId={author} currentUser={currentUserId} content={text} createdAt={created_at} commentsCount={reply_count} authorName={profileName} authorEmail={profileEmail} authorImage={profile_image || defaultProfileImg} />
      ))}
    </section>
  )
}
