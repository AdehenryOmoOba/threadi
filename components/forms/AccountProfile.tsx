"use client"
import React, { ChangeEvent, useState } from 'react'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { UserValidationSchema } from '@/lib/validations'
import * as z from "zod";
import { Button } from '../ui/button'
import Image from 'next/image'
import defaultProfilePhoto from "../../public/assets/profile.svg"
import { Textarea } from '../ui/textarea'
import { isBase64Image, updateUser } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'
import { usePathname, useRouter } from 'next/navigation'


interface AccountProfileProps {
  user: {
    id?: string
    objectId?: string
    username?: string
    name?: string
    bio?: string
    image?: string
  } 
}

function AccountProfile({user}: AccountProfileProps) {
  const [file, setfile] = useState<File[] | null>(null)
  const {startUpload} = useUploadThing("media")
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(UserValidationSchema),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || ""
    }
  })

  async function onSubmit(values: z.infer<typeof UserValidationSchema>) {

    // Upload profile image selected by user to cloud storage and get the image url
    const blob = values.profile_photo
    const isDifferentImage = isBase64Image(blob)

    if(file && isDifferentImage){
      const imageResponse = await startUpload(file)
      console.log({imageResponse})
      if(imageResponse && imageResponse[0].url)
      values.profile_photo = imageResponse[0].url
    }

    // Update user profile backend
    try {
      const {bio, name, profile_photo, username} = values
      const updatedUser = await updateUser({name, username, bio, image: profile_photo, path: pathname})
      console.log({updateUser})
      pathname === "/profile/edit" ? router.back() : router.push("/")
    } catch (error: any) {
      console.log(error.message)
    }
 
  }

  function handleImage(e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) {
    e.preventDefault()
    const fileReader = new FileReader()
    const fileObject = !!e.target.files?.length ? e.target.files[0] : null
    if(!fileObject) return
    setfile(Array.from(e.target.files || []))
    if(!fileObject.type.includes("image")) return

    fileReader.onload = async (e: ProgressEvent<FileReader>) => {
      const imageUrl = e.target?.result?.toString() || ""
      fieldChange(imageUrl)
    }

    fileReader.readAsDataURL(fileObject)
  }


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">

        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? 
                   (<Image src={field.value} alt='profile photo' width={96} height={96} priority className='rounded-full object-contain' />) 
                 : (<Image src={defaultProfilePhoto} alt='default profile photo' width={24} height={24} className='object-contain' />)
                }
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input onChange={(e) => handleImage(e, field.onChange)} type='file' accept='image/*' placeholder="Upload a photo" className='account-form_image-input'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base1-semibold text-light-2'>Name</FormLabel>
              <FormControl>
                <Input {...field} type='text' className='account-form_input no-focus'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base1-semibold text-light-2'>Username</FormLabel>
              <FormControl>
                <Input {...field} type='text' className='account-form_input no-focus'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base1-semibold text-light-2'>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} rows={10} className='account-form_input no-focus'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button title="Continue" type="submit" className='bg-primary-500'>Submit</Button>
      </form>

    </Form>
  )
}

export default AccountProfile