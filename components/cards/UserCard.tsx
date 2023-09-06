import Image from 'next/image'
import React from 'react'
import ViewButton from '../shared/ViewButton'


type Props = {
    id: string
    name: string
    imgUrl: string
    userType: "user" | "community",
    email: string
}

function UserCard({id, name, imgUrl, userType, email}: Props) {
  
  const userhandle = email.split("@")[0]

  return (
    <article className='flex w-full'>
      <div className="flex relative flex-1 items-center gap-x-2 pl-2">
        <div className='relative h-12 w-12 object-cover'>
          <Image src={imgUrl} alt={name} fill className='rounded-full object-cover' />
        </div>
        <div className='w-[45vw]'>
          <span className='text-small-medium text-gray-1 block truncate'><span className='text-white font-bold'>{name}</span>{" "}@{userhandle}</span>
        </div>
        <div className='absolute right-0'>
          <ViewButton id={id} name={name} email={email} image={imgUrl}/>
        </div>
       </div>
    </article>
  )
}

export default UserCard