import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {BsThreeDots} from "react-icons/bs"

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
  threadParentId: string | null
}

async function ThreadiCard({id,threadParentId,currentUser, content, authorId,authorName,authorImage,authorEmail,commentsCount,isComment=false,linkDisabled=false,isSUbThread=false}: Props) {

  const commentTense = commentsCount < 2 ? "comment" : "comments"
  const replyTense = commentsCount < 2 ? "reply" : "replies"
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
              <div className='text-slate-400 flex justify-center cursor-pointer'>
                <BsThreeDots />
              </div>
            }
            </div>
            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            {!isSUbThread &&
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image src={"/assets/heart-gray.svg"} alt='heart' width={24} height={24} className='cursor-pointer object-contain'/>
                <Link href={linkState}>
                  <Image src={"/assets/reply.svg"} alt='reply' width={24} height={24} className='cursor-pointer object-contain'/>
                </Link>
                <Image src={"/assets/repost.svg"} alt='repost' width={24} height={24} className='cursor-pointer object-contain'/>
                <Image src={"/assets/share.svg"} alt='share' width={24} height={24} className='cursor-pointer object-contain'/>
              </div>
               {!!commentsCount &&
                <Link href={linkState}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>{commentsCount} {threadParentId ? replyTense : commentTense}</p>
                </Link>
              }
            </div>
            }
          </div>  
        </div>  
      </div>
    </article>
  )
}

export default ThreadiCard