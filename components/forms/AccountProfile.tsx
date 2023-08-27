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
import { useSession } from 'next-auth/react'
import defaultImage from "../../public/assets/profile.svg"


interface AccountProfileProps {
  user: {
    id: string,
    name: string,
    image: string,
    bio: string
  } 
}

function AccountProfile({user}: AccountProfileProps) {
  const [file, setfile] = useState<File[] | null>(null)
  const {startUpload} = useUploadThing("media")
  const router = useRouter()
  const pathname = usePathname()
  const {update, data: session} = useSession()

  const form = useForm({
    resolver: zodResolver(UserValidationSchema),
    defaultValues: {
      profile_photo: user?.image || defaultImage,
      name: user?.name || "",
      bio: user?.bio || ""
    }
  })

  async function onSubmit(values: z.infer<typeof UserValidationSchema>) {

    // Upload profile image selected by user to cloud storage and get the image url
    const blob = values.profile_photo
    const isDifferentImage = isBase64Image(blob)

    if(file && isDifferentImage){
      const imageResponse = await startUpload(file)
      if(imageResponse && imageResponse[0].url)
      values.profile_photo = imageResponse[0].url
    }

    // Update user profile backend
    try {
      const {bio, name, profile_photo} = values

      const response = await updateUser({name, bio, image: profile_photo, path: pathname, uuid: user.id})
      
      if(!response.error) await update({...session, user: {...session?.user, onboarded: true, name: response.name, image: response.image, bio: response.bio}})
              
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