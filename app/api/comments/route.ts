import { db } from "@/db/dbClient";
import { threadis } from "@/db/schema";
import { eq, placeholder , desc} from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'


export async function GET(req: NextRequest){

    const id = new URL(req.url).searchParams.get("id")

    // try {
    //     if(!id) throw new Error("Please provide id")

    //     const preparedComments = db.query.threadis.findMany({
    //       where: (eq(threadis.parentId, placeholder("id"))),
    //       orderBy: desc(threadis.createdAt),
    //       with: {
    //           authorInfo: {
    //               columns: {
    //                   uuid: true,
    //                   name: true,
    //                   image: true
    //               }
    //           },
    //           communitiesInfo: {
    //               columns: {
    //                   uuid: true,
    //                   name: true,
    //                   image: true
    //               }
    //           }
    //       },
    //     }).prepare("prepared_comments")
  
    //     const comments = await preparedComments.execute({id})
  
    //     if(!comments) throw new Error("no comments found")
  
    //     return NextResponse.json(comments)
    // } catch (error: any) {
    //     return NextResponse.json({error: error.message})
    // }
}