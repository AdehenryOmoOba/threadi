"use client"
import React from 'react'
import { Form ,FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommentValidationSchema } from '@/lib/validations'
import {z} from "zod"
import Image from 'next/image'
import defaultProfileImage from "../../public/assets/user.svg"
import { createCommentReply } from '@/lib/utils'
import { useSession } from 'next-auth/react'


type CommentProp = {
  threadId: string
  currentUser: string
}

function CommentBox({threadId, currentUser}: CommentProp) {
    const pathname = usePathname()
    const {data} = useSession()
    const router = useRouter()
  
    const form = useForm({
      resolver: zodResolver(CommentValidationSchema),
      defaultValues: {
          thread: "",
      }
    })
  
    const onSubmit = async (values: z.infer<typeof CommentValidationSchema>) => {
      console.log({text: values.thread, author: currentUser, path: pathname, parentId: threadId})
      await createCommentReply({text: values.thread, author: currentUser, path: pathname, parentId: threadId})
      form.reset()
      router.refresh()

    }

    if(!data) return null


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex gap-3 w-full items-center'>
              <div className='relative h-10 w-12 rounded-full'>
                <Image src={data?.user?.image || defaultProfileImage} alt='profile image' fill className='rounded-full'/>
              </div>
              <FormControl className='border-none bg-transparent'>
                <Input {...field} type='text' placeholder='Comment...' className='no-focus text-light-1 outline-none'/>
              </FormControl>
            </FormItem>
          )}
        />
      <Button type="submit" className='comment-form_btn'>Reply</Button>
    </form>
  </Form>
  )
}

export default CommentBox