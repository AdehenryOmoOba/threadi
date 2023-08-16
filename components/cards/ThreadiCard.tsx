import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import defaultProfilePhoto from "../../public/assets/profile.svg"

type Props = {
    id: string
    currentUser: string | undefined
    content: string
    createdAt: string
    isComment?: boolean
    communityId: string
    communityName: string
    communityImage: string
    commentsCount: number
    author: {
      author_uuid: string,
      author_username: string,
      author_name: string,
      author_image: string,
      author_bio: string,
      author_onboarded: boolean
    },
}

function ThreadiCard({id, currentUser, content, author, communityName, communityImage, communityId, createdAt,commentsCount,isComment=false}: Props) {
 
  const commentTense = commentsCount < 2 ? "comment" : "comments"

  return (
    <article className='flex w-full flex-col rounded-xl bg-dark-2 p-7'>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.author_uuid}`} className='relative h-11 w-11'>
              <Image src={defaultProfilePhoto} alt="profile image" fill className='cursor-pointer rounded-full'/>
            </Link>
            <div className='thread-card_bar' />
          </div>
          <div>
            <Link href={`/profile/${author.author_uuid}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>{author.author_name}</h4>
            </Link>
            <p className='mt-2 text-small-regular text-light-2'>{content}</p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image src={"/assets/heart-gray.svg"} alt='heart' width={24} height={24} className='cursor-pointer object-contain'/>
                <Link href={`/thread/${id}`}>
                  <Image src={"/assets/reply.svg"} alt='reply' width={24} height={24} className='cursor-pointer object-contain'/>
                </Link>
                <Image src={"/assets/repost.svg"} alt='repost' width={24} height={24} className='cursor-pointer object-contain'/>
                <Image src={"/assets/share.svg"} alt='share' width={24} height={24} className='cursor-pointer object-contain'/>
              </div>
               {!!commentsCount &&
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>{commentsCount} {commentTense}</p>
                </Link>
              }
            </div>
          </div>  
        </div>  
      </div>
    </article>
  )
}

export default ThreadiCard