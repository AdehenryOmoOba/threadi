import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {BsThreeDots} from "react-icons/bs"
import Icons from '../interractiveIcons/Icons'

type Props = {
  id: string
  currentUser: string | undefined
  content: string
  createdAt: string
  isComment?: boolean
  communityId?: string
  communityName?: string
  communityImage?: string
  commentsCount: number
  authorId: string,
  authorName: string,
  authorEmail: string
  authorImage: string,
  linkDisabled?: boolean
  isSUbThread?: boolean
  isLiked?: boolean
  likesCount?: number
  threadParentId: string | null
}

async function ThreadiCard({id,threadParentId,currentUser, content, authorId,authorName,authorImage,authorEmail,commentsCount,isComment=false,linkDisabled=false,isSUbThread=false, isLiked, likesCount}: Props) {

  const linkState = linkDisabled ? "#" : `/thread/${id}?user=${currentUser}`
  const userhandle = authorEmail.split("@")[0]

  return (
    <article className={`flex w-full flex-col rounded-xl bg-dark-2 p-7  ${isComment && "bg-transparent mb-2 px-0 xs:px-7"}`}>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link  href={`/profile/${authorId}?profile_name=${authorName}&profile_email=${authorEmail}&profile_image=${authorImage}`} className='relative h-11 w-11 overflow-hidden'>
              <div className='relative rounded-full h-11 w-11 overflow-hidden'>
                <Image src={authorImage} alt="profile image" fill className='cursor-pointer rounded-full object-fill'/>
              </div>
            </Link>
            <div className='thread-card_bar' />
          </div>
          <div className='w-full'>
            <div className='flex items-center w-full justify-between'>
            <Link href={`/profile/${authorId}?profile_name=${authorName}&profile_email=${authorEmail}&profile_image=${authorImage}`} className='w-fit'>
              <div className='w-[45vw]'>
                  <span className='text-small-medium text-gray-1 block truncate'><span className='text-white font-bold'>{authorName}</span>{" "}@{userhandle}</span>
              </div>
            </Link>
            {!isSUbThread && 
              <div className='text-gray-1 flex justify-center cursor-pointer'>
                <BsThreeDots />
              </div>
            }
            </div>
            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            {!isSUbThread &&
             <Icons linkState={linkState} commentsCount={commentsCount} threadParentId={threadParentId} likeStatus={isLiked || false} currentUserId={currentUser} threadId={id} likesCount={likesCount || 0}/>
            }
          </div>  
        </div>  
      </div>
    </article>
  )
}

export default ThreadiCard