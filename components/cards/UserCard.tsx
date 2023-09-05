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
      <div className='relative h-12 w-12 object-cover mr-3'>
        <Image src={imgUrl} alt={name} fill className='rounded-full object-cover' />
      </div>
      <div className="flex flex-1 items-center justify-between">
          <div className='flex items-center w-full'>
            <h4 className='text-base-semibold text-light-1 mr-1'>{name}</h4>
            <p className='text-small-medium text-gray-1 text-ellipsis'>@{userhandle}</p>
          </div>
          <ViewButton id={id} name={name} email={email} image={imgUrl}/>
       </div>
    </article>
  )
}

export default UserCard