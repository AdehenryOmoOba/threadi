import { db } from "@/db/dbClient";
import { users } from "@/db/schema";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import bcrypt from "bcrypt"


export async function POST(req: NextRequest){

    const body = await req.json()

    try {
        const hashedPassword = await bcrypt.hash(body.password, 10)

        

        const newUser = await db.insert(users).values({...body, password: hashedPassword}).returning()

        if(!newUser) throw new Error("something went wrong!")

        newUser[0].password = null

        return NextResponse.json(newUser[0])

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}