import { getIPAddress } from "../libs/getIPAddress"
import origin from "../libs/origin"
import {TUser} from "./getUsers"


const ipAddress = getIPAddress()

export async function findUser() {

    console.log({ipAddress})
    
    const response = await fetch(`${origin}api/findUsers`)
 
    if(!response.ok) return {error: "something went wrong"}
 
    const result: TUser  = await response.json()
 
    return result
 }