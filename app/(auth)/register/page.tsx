"use client"
import Link from "next/link"
import userSvg from "../../../public/assets/login-user.svg"
import passwordSvg from "../../../public/assets/password.svg"
import {AiOutlineGithub} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import Image from "next/image"
import { useState, SyntheticEvent, ChangeEvent } from "react"
import { signIn } from "next-auth/react"
import { createUser } from "@/lib/utils"
import { useRouter } from "next/navigation"
 

function Register() {
  const [formData, setformData] = useState({email: "", password: "", confirmPassword: ""})
  const router = useRouter()

  const handleFormUpdate = (e:ChangeEvent<HTMLInputElement>) => {
    setformData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if(formData.password !== formData.confirmPassword) return
    const newUser = await createUser(formData)
    console.log({newUser})
    router.push("/login")
  }

  return (
    <section className="grid place-content-center bg-black h-screen w-screen font-poppins">
      <form className="flex flex-col w-[90vw] items-center h-max px-8 py-16 bg-transparent rounded-xl  gap-y-4 md:w-[28rem] md:px-16 md:py-16">

        <div className="flex flex-col items-center mb-2">
          <p className="text-[24px] font-bold mb-2 text-white">Register</p>
          <small className="text-slate-400">Join The Best Social Blogging App</small>
        </div>

        <div className="flex flex-col w-full gap-y-3 mb-2">
          <div className="items-center flex justify-center gap-x-3 p-1 rounded-lg  bg-slate-900 cursor-pointer">
            <div className="text-[20px]">
              <FcGoogle />
            </div>
            <p className="text-light-1 text-small-medium font-normal py-2">Register with Google</p>
          </div>

          <div onClick={() => signIn("github", {redirect: true, callbackUrl: "/onboarding"})} className="items-center flex justify-center gap-x-3 p-1 rounded-lg bg-slate-900 cursor-pointer">
            <div className="text-[20px] text-light-1">
              <AiOutlineGithub />
            </div>
            <p className="text-light-1 text-small-medium font-normal py-2">Register with GitHub</p>
          </div>
        </div>

        <div className="w-full relative h-5">
          <div className="absolute h-[0.5px] w-full bg-slate-700 top-1/2 -translate-y-1/2" />
          <p className="absolute bg-slate-950 text-small-medium text-slate-500 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-6">Or</p>
        </div>

        <div className="w-full">
          <div className="mb-4">
            <label className="text-small-medium text-slate-400 inline-block mb-2">Email</label>
            <div className="flex px-2 py-3 rounded-lg border border-slate-800">
              <Image height={20} width={20} src={userSvg} alt="user svg" className="mr-1"/>
              <input type="text" name="email" value={formData.email} onChange={handleFormUpdate} placeholder="someone@example.com" className="bg-transparent text-small-medium flex-1 px-1 text-sm outline-none text-slate-200 placeholder:text-small-medium placeholder:text-slate-600"/> 
            </div>
          </div>

          <div className="mb-4">
            <label className="text-small-medium text-slate-400 inline-block mb-2">Password</label>
            <div className="flex px-2 py-3 rounded-lg border border-slate-800">
              <Image height={15} width={15} src={passwordSvg} alt="password svg" className="mr-1"/>
              <input type="password" name="password" value={formData.password} onChange={handleFormUpdate} placeholder="Password" className="bg-transparent text-small-medium flex-1 px-1 text-sm outline-none text-slate-200 placeholder:text-small-medium placeholder:text-slate-600"/> 
            </div>
          </div>

          <div>
            <label className="text-small-medium text-slate-400 inline-block mb-2">Confirm Password</label>
            <div className="flex px-2 py-3 rounded-lg border border-slate-800">
              <Image height={15} width={15} src={passwordSvg} alt="password svg" className="mr-1"/>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleFormUpdate} placeholder="Confirm Password" className="bg-transparent text-small-medium flex-1 px-1 text-sm outline-none text-slate-200 placeholder:text-small-medium placeholder:text-slate-600"/> 
            </div>
          </div>
        </div>

        <button type="submit" onClick={handleSubmit} className="bg-primary-500 outline-none text-sm font-bold w-full text-light-1 py-3 rounded-lg">Register</button>

        <small className="text-[12px] font-light text-slate-400">
          Already registered? <span className="font-extrabold text-slate-200"><Link href="/login">Login</Link></span>
        </small>

      </form>
    </section>
  )
}

export default Register