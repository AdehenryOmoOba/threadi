import origin from "../libs/origin";


export type TUser = {
    role: "VENDOR" | "CUSTOMER" | "ADMIN" | null;
    uuid: string;
    username: string;
    email: string;
    phone: string | null;
    socialUser: boolean | null;
    password: string | null;
    cart: unknown;
    products: unknown;
}


export async function getUsers() {
    
   const response = await fetch(`${origin}/api/getUsers`, {cache: "no-store"})

   if(!response.ok) return {error: "something went wrong"}

   const result: TUser[] = await response.json()

   return result
}