// import { db } from "@/db/dbClient";
import { classes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from 'next/server'


export async function GET(){

    try {

        const result = null

        // const result = await db.query.classes.findMany()
        
        // const result = await db.query.classes.findFirst({
        //     where: eq(classes.uuid, "9fecfb4f-27a5-4e6b-b95a-781561d9aaa0"),
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