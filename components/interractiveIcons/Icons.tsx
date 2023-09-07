"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import likedHeart from "@/public/assets/heart-liked.svg"
import heart from "@/public/assets/heart-gray.svg"
import { updateLikes } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'

type Prop = {
  linkState: string, 
  commentsCount: number, 
  threadParentId: string | null, 
  likeStatus: boolean
  currentUserId: string | undefined
  threadId: string
  likesCount: number
}

function Icons({linkState, commentsCount, threadParentId, likeStatus, currentUserId, threadId, likesCount}: Prop) {
  const [liked, setliked] = useState(likeStatus)
  const likeref = useRef(false)
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    if(!currentUserId) return
    
    if(likeref.current){
      async function likeUpdate() {
        if(!currentUserId) return
        await updateLikes({currentUserId, threadId, path, likeStatus: liked.toString()})
      }
      likeUpdate()
      router.refresh()
      }
      
    }, [liked])
  
    const handleLike = () => {
     if (!currentUserId) return 
      likeref.current = true
      setliked((prev) => !prev)
    }

  const commentTense = commentsCount < 2 ? "comment" : "comments"
  const replyTense = commentsCount < 2 ? "reply" : "replies"

  return (
    <div className="mt-5 flex flex-col gap-3">
    <div className="flex gap-6">

      <Link href={linkState}>
        <Image src={"/assets/reply.svg"} alt='reply' width={24} height={24} className='cursor-pointer object-contain'/>
      </Link>

       <div className='relative'>
        {!!likesCount && <span className='absolute text-subtle-medium text-gray-1 top-1/2 -translate-y-1/2 -left-7 w-6 flex justify-end'>{likesCount}</span>}
        <Image onClick={handleLike} src={liked ? likedHeart : heart} alt='heart' width={24} height={24} className='cursor-pointer object-contain'/>
      </div>
      
      <Image src={"/assets/repost.svg"} alt='repost' width={24} height={24} className='cursor-pointer object-contain'/>
      
      <Image src={"/assets/share.svg"} alt='share' width={24} height={24} className='cursor-pointer object-contain'/>
    </div>
     {!!commentsCount &&
      <Link href={linkState}>
        <p className='mt-1 text-subtle-medium text-gray-1'>{commentsCount} {threadParentId ? replyTense : commentTense}</p>
      </Link>
    }
  </div>
  )
}

export default Icons