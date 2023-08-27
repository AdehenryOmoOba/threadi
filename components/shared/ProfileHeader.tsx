import Image from 'next/image'
import React from 'react'

type Props = {
  currentUserId: string | undefined
  profileUserId: string
  name: string | undefined
  userHandle: string | undefined
  imgUrl: string
  bio: string
}

function ProfileHeader({currentUserId, profileUserId, name, userHandle, imgUrl, bio}: Props) {
  return (
    <div className='flex w-full flex-col justify-start'>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className='relative h-20 w-20 object-cover'>
                    <Image src={imgUrl} alt="profle image" fill className='rounded-full object-cover shadow-2xl'/>
                </div>
                <div className="flex-1">
                    <h2 className='text-left text-heading3-bold text-light-1'>{name}</h2>
                    <p className='text-base-medium text-gray-1'>{userHandle}</p>
                </div>
            </div>
        </div>
            {/* TODO: Community Info */}
            <p className="mt-6 max-w-lg text-small-semibold text-gray-1">{bio}</p>
            <div className='mt-2 h-0.5 w-full bg-dark-3' />
    </div>
  )
}

export default ProfileHeader