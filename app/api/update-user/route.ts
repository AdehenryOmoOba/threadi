import { db } from "@/db/dbClient";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'


export type UserInfo = {
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function PUT(req: NextRequest){

    const { bio, image, name, path, username}: UserInfo  = await req.json()

    try {

        const user = await db.insert(users)
        .values({name,username,bio,image})
        .onConflictDoUpdate({target: users.username, set: {name, username,bio,image, onboarded: true}})
        .returning()

        if(path === "/profile/edit") revalidatePath(path)

        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}