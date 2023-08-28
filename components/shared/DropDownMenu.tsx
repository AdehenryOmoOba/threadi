"use client"
import {RiExpandUpDownLine} from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import Image from "next/image"


export function DropdownMenuCheckboxes({profileImage}: {profileImage: string}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-max h-12 rounded-lg ml-4">
        <Button  className="flex gap-4 bg-black text-slate-400">
          <Image src={profileImage} alt="profile photo" width={24} height={24} className="rounded-full"/>
          <p className="hidden md:inline-block text-[14px]">Personal Organisations</p>
          <RiExpandUpDownLine />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-72 gap-y-2">
        <div className="flex items-center justify-center bg-slate-100 h-12  cursor-pointer">Item 1</div>
        <div className="flex items-center justify-center bg-slate-100 h-12  cursor-pointer">Item 1</div>
        <div className="flex items-center justify-center bg-slate-100 h-12  cursor-pointer">Item 1</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
