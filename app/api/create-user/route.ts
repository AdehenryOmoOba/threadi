import { db } from "@/db/dbClient";
import { users } from "@/db/schema";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'


export async function POST(req: NextRequest){

    const body = await req.json()

    try {

        const newUser = await db.insert(users).values(body).returning()

        if(!newUser) throw new Error("something went wrong!")

        return NextResponse.json(newUser)

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}