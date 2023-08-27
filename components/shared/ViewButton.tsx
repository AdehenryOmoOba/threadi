"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'


function ViewButton({id}: {id: string}) {
    const router = useRouter()

    return (<Button onClick={() => router.push(`/profile/${id}`)} className='user-card_btn'>View</Button>)
}

export default ViewButton