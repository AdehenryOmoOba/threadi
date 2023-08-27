import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User  {
        onboarded: boolean
        pgUUID: string,
        id?: string,
        bio: string | null
    }

    interface Session extends DefaultSession {
        user?: User,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        pgUUID: string,
        onboarded: boolean
        bio: string | null
    }
}