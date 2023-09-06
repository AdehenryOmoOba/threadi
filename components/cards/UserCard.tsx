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
      <div className='relative h-12 w-12 object-cover'>
        <Image src={imgUrl} alt={name} fill className='rounded-full object-cover' />
      </div>
      <div className="flex flex-1 items-center gap-x-2 pl-2 pr-4 justify-between">
          <div className='max-w-[55%]'>
            <h4 className='flex text-base-semibold text-light-1 truncate'>
              {name}
              <span className='ml-1 text-small-medium text-gray-1 block truncate'>@{userhandle}</span>
            </h4>
          </div>
  
          <ViewButton id={id} name={name} email={email} image={imgUrl}/>
       </div>
    </article>
  )
}

export default UserCard