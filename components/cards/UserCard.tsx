import Image from 'next/image'
import React from 'react'
import ViewButton from '../shared/ViewButton'


type Props = {
    id: string
    name: string
    userhandle: string
    imgUrl: string
    userType: "user" | "community"
}

function UserCard({id, name, imgUrl, userType, userhandle}: Props) {
  return (
    <article className='user-card'>
        <div className='user-card_avatar'>
            <Image src={imgUrl} alt={name} width={48} height={48} className='rounded-full' />
        <div className="flex-1 text-ellipsis">
            <h4 className='text-base-semibold text-light-1'>{name}</h4>
            <p className='text-small-medium text-gray-1'>{userhandle}</p>
        </div>
        </div>

        <ViewButton id={id}/>
    </article>
  )
}

export default UserCard