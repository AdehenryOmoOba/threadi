import { db } from "@/db/dbClient";
import { classes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from 'next/server'


export async function GET(){

    try {

        const result = await db.query.classes.findMany()
        
        // const result = await db.query.classes.findFirst({
        //     where: eq(classes.uuid, "e4089ea4-186b-4f6b-ac7f-a6e210476cef"),
        //     with:{
        //         students_classes: {
        //             columns: {
        //                 classId: false,
        //                 studentId: false
        //             },
        //             with: {
        //                 student: true
        //             }
        //         }
        //     },
        // })

        if(!result) throw new Error("tada!")

        return NextResponse.json(result)
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}