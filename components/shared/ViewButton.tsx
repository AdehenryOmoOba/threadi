"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'


function ViewButton({id, name, email, image}: {id: string, name: string, email: string, image: string}) {
    const router = useRouter()

    return (<Button onClick={() => router.push(`/profile/${id}?current_user=${name}&profile_email=${email}&profile_image=${image}&profile_name=${name}`)} className='user-card_btn'>View</Button>)
}

export default ViewButton

