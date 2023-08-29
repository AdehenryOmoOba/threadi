import { db } from "@/db/dbClient";
import { NextResponse } from 'next/server'


export async function GET(){

    try {

        
     
        // const usersList = [{uuid: 123 ,name: "foo"}]

        const usersList = await db.query.users.findMany()

        // Perform join between users and coupon_code toble
        // const usersList = await db.query.users.findMany({
        //   with: {
        //     couponInfo: true
        //   }
        // })

        // Perform join between users, coupon_code and products toble
        // const usersList = await db.query.users.findMany({
        //   with: {
        //     couponInfo: true,
        //     productsInfo: true
        //   }
        // })

        return NextResponse.json(usersList)
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}