import { db } from "@/db/dbClient";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'


export type UserInfo = {
    uuid: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function PUT(req: NextRequest){

    const { bio, image, name, uuid, path}: UserInfo  = await req.json()

    try {

        const user = await db.update(users).set({name, bio, image, onboarded: true}).where(eq(users.uuid, uuid)).returning()

        path === "/profile/edit" ? revalidatePath(path) : revalidatePath("/")

        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}