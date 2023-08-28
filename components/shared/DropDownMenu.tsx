"use client"
import {RiExpandUpDownLine} from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import defaultProfilePhoto from "../../public/assets/user.svg"


export function DropdownMenuCheckboxes({profileImage}: {profileImage: string}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-max h-12 rounded-lg ml-4">
        <Button  className="flex gap-4 bg-black text-slate-400">
          <div className="relative h-6 w-6 rounded-full">
            {/* <Image src={profileImage || defaultProfilePhoto} alt="profile photo" fill className="rounded-full"/> */}
            <Image src={profileImage || defaultProfilePhoto} alt="profile photo" fill className="rounded-full" />
          </div>
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
