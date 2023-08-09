import origin from "../libs/origin"
import {TUser} from "./getUsers"


export async function findUser() {
    
    const response = await fetch(`${origin}api/findUsers`)
 
    if(!response.ok) return {error: "something went wrong"}
 
    const result: TUser  = await response.json()
 
    return result
 }