import { db } from "@/db/dbClient";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'


export async function GET(req: NextRequest){

    const username = new URL(req.url).searchParams.get("username")

    try {

        if(!username) throw new Error("Invalid username")

        const user = await db.query.users.findFirst({
            where: eq(users.username, username),
          })

        // Perform join between users and coupon_code toble
        // const user = await db.query.users.findFirst({
        //     where: eq(users.username, username),
        //     with: {
        //       couponInfo: true,
        //     }
        //   })

        // Perform join between users, coupon_code and products toble
        // const user = await db.query.users.findFirst({
        //     where: eq(users.username, username),
        //     with: {
        //       couponInfo: true,
        //       productsInfo: true
        //     }
        //   })

        if(!user) throw new Error("user not found")
        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}