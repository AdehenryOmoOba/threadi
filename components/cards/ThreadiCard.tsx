import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
    authorImage: string,
    linkDisabled?: boolean
    comments?:     {
      comment_uuid: string
      comment_author: {
        name: string
        image: string
        uuid: string
      }
    }[]
}

function ThreadiCard({id,currentUser, content, authorId,authorName,authorImage,commentsCount,isComment=false,linkDisabled=false}: Props) {

 
  const commentTense = commentsCount < 2 ? "comment" : "comments"
  const linkState = linkDisabled ? "#" : `/thread/${id}?user=${currentUser}&author_image=${authorImage}&table=${isComment ? "comments_replies" : "threadis"}`
  const isCurrentUser = (currentUser && currentUser === authorId) ? true : false

  return (
    <article className={`flex w-full flex-col rounded-xl bg-dark-2 p-7 ${isComment && "bg-transparent mb-2 px-0 xs:px-7"}`}>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link  href={`/profile/${authorId}?${isCurrentUser ? `current_user=${authorName}` : ""}`} className='relative h-11 w-11 overflow-hidden'>
              <div className='relative rounded-full h-11 w-11 overflow-hidden'>
                <Image src={authorImage} alt="profile image" fill className='cursor-pointer rounded-full object-fill'/>
              </div>
            </Link>
            <div className='thread-card_bar' />
          </div>
          <div>
            <Link href={`/profile/${authorId}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>{authorName}</h4>
            </Link>
            <p className='mt-2 text-small-regular text-light-2'>{content}</p>
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