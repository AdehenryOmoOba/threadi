"use client"
import React, { useState } from 'react'
import {Form,FormControl,FormField,FormItem,FormLabel, FormMessage} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod";
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { usePathname, useRouter } from 'next/navigation'
import { ThreadValidationSchema } from '@/lib/validations';
import { createThreadi } from '@/lib/utils'
import LoadingDots from '../loadingDots/LoadingDots'


function PostThread({userId}: {userId: string}) {
  const router = useRouter()
  const pathname = usePathname()
  const [creatingComment, setCreatingComment] = useState(false)


  const form = useForm({
    resolver: zodResolver(ThreadValidationSchema),
    defaultValues: {
        thread: "",
        accountId: userId
    }
  })

  const onSubmit = async (values: z.infer<typeof ThreadValidationSchema>) => {
    setCreatingComment(true)
    await createThreadi({text: values.thread, author: values.accountId, path: pathname, community: null})
    router.refresh()
    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">

        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 rounded-2xl p-8'>
                <Textarea {...field} rows={6}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

    <Button type="submit" title="Post Thread" className='bg-primary-500 w-32 flex self-end rounded-full'>
      {creatingComment ? <LoadingDots /> : <p className='w-8'>Post</p>}
    </Button>
  </form>

</Form>
  )
}

export default PostThread