"use client"
import React from 'react'
import {Form,FormControl,FormField,FormItem,FormLabel, FormMessage} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod";
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { usePathname, useRouter } from 'next/navigation'
import { ThreadValidationSchema } from '@/lib/validations';
import { createThreadi } from '@/lib/utils'


function PostThread({userId}: {userId: string}) {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(ThreadValidationSchema),
    defaultValues: {
        thread: "",
        accountId: userId
    }
  })

  const onSubmit = async (values: z.infer<typeof ThreadValidationSchema>) => {
    await createThreadi({text: values.thread, author: values.accountId, path: pathname, community: null})
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
              <FormLabel className='text-base1-semibold text-light-2'>Content</FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea {...field} rows={15}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

    <Button title="Post Thread" type="submit" className='bg-primary-500'>Submit</Button>
  </form>

</Form>
  )
}

export default PostThread