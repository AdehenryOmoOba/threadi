"use client"
import Link from "next/link"
import userSvg from "../../../public/assets/login-user.svg"
import passwordSvg from "../../../public/assets/password.svg"
import {AiOutlineGithub} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import Image from "next/image"
import { useState, SyntheticEvent, ChangeEvent, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Spinner from "@/components/Spinner"
 

function Login() {
  const [formData, setformData] = useState({email: "", password: ""})
  const session = useSession()
  const router = useRouter()
  const [LoginLoading, setLoginLoading] = useState(false)

  useEffect(() => {
    console.log("onboarded: ",session.data?.user?.onboarded)
    if(session.data?.user?.onboarded === true){
      router.push("/")
    }
    if(session.data?.user?.onboarded === false){
      router.push("/onboarding")
    }
  }, [session.data?.user?.onboarded])
  
  const handleFormUpdate = (e:ChangeEvent<HTMLInputElement>) => {
    setformData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    setLoginLoading(true)
    e.preventDefault()
    const response = await signIn("credentials", {
      email: formData.email, 
      password: formData.password, 
      redirect: false
    })
    if(!response?.ok) return 
  }

  const handleSocialLogin = async ( provider: "google" | "github") => {
    setLoginLoading(true)
    const response = await signIn(provider, {
      redirect: false
    })
    if(!response?.ok) return
  }

  return (
    <section className="grid place-content-center bg-black h-screen w-screen font-poppins">
      <form className="flex flex-col w-[90vw] items-center h-max px-8 py-16 bg-transparent rounded-xl  gap-y-4 md:w-[28rem] md:px-16 md:py-16">

        <div className="flex flex-col items-center mb-2">
          <p className="text-[24px] font-bold mb-2 text-white">Login</p>
          <small className="text-slate-400">Start Creating Threads Now</small>
        </div>

        <div className="flex flex-col w-full gap-y-3 mb-2">
          <div onClick={() => handleSocialLogin("google")} className="items-center flex justify-center gap-x-3 p-1 rounded-lg  bg-slate-900 cursor-pointer">
            <div className="text-[20px]">
              <FcGoogle />
            </div>
            <p className="text-light-1 text-small-medium font-normal py-2">Login with Google</p>
          </div>

          <div onClick={() => handleSocialLogin("github")} className="items-center flex justify-center gap-x-3 p-1 rounded-lg bg-slate-900 cursor-pointer">
            <div className="text-[20px] text-light-1">
              <AiOutlineGithub />
            </div>
            <p className="text-light-1 text-small-medium font-normal py-2">Login with GitHub</p>
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

          <div>
            <label className="text-small-medium text-slate-400 inline-block mb-2">Password</label>
            <div className="flex px-2 py-3 rounded-lg border border-slate-800">
              <Image height={15} width={15} src={passwordSvg} alt="password svg" className="mr-1"/>
              <input type="password" name="password" value={formData.password} onChange={handleFormUpdate} placeholder="Password" className="bg-transparent text-small-medium flex-1 px-1 text-sm outline-none text-slate-200 placeholder:text-small-medium placeholder:text-slate-600"/> 
            </div>
          </div>
          <Link href="https://google.com">
            <small className="text-[10px] text-slate-200">Forgot Password?</small>
          </Link>
        </div>

        <button type="submit" onClick={handleSubmit} disabled={LoginLoading} className="flex justify-center bg-primary-500 outline-none text-sm font-bold w-full text-light-1 py-3 rounded-lg">
          {LoginLoading ? (<><Spinner />Please wait...</>) : "Login"}
        </button>

        <small className="text-[12px] font-light text-slate-400">
          Don't have an account? <span className="font-extrabold text-slate-200"><Link href="/register">Register</Link></span>
        </small>

      </form>
    </section>
  )
}

export default Login


