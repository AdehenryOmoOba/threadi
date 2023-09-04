import { db } from "@/db/dbClient";
import { sql } from "drizzle-orm";
import { NextResponse } from 'next/server'


export async function GET(){

    try {
        
        ///////////////////////////////////////////////////////////////////
        // Retrieves top threads and replies count for home page
        // const result = await db.execute(sql.raw(`
        // WITH ThreadData AS (
        //     SELECT
        //         t.*,
        //         u.name AS author_name,
        //         u.email AS author_email,
        //         u.image AS author_image,
        //         c.name AS community_name,
        //         c.image AS community_image,
        //         COUNT(r.uuid) AS replies_count
        //     FROM
        //         threadis t
        //     LEFT JOIN
        //         threadis r ON t.uuid = r.parent_id
        //     JOIN
        //         users u ON t.author = u.uuid
        //     LEFT JOIN
        //         communities c ON t.community = c.uuid
        //     WHERE
        //         t.parent_id IS NULL
        //     GROUP BY
        //         t.uuid, t.text, t.author, u.uuid, u.name, u.email, u.image, t.community, t.created_at, t.likes, t.reposts, t.shares_count, t.views_count, c.name, c.image
        //     ORDER BY
        //         t.created_at DESC
        //     LIMIT 25
        //     OFFSET 0
        // )
        // SELECT
        //     (SELECT json_agg(thread) FROM (SELECT * FROM ThreadData) thread) AS top_threads,
        //     (SELECT total_count FROM threadis_count) AS top_threadis_count;
        
        // `))

        // Retrieves a thread and all it's comments/replies 
         const result = await db.execute(sql.raw(`
           WITH ThreadData AS (
               SELECT
               t.uuid AS thread_uuid,
               t.text AS thread_text,
               t.created_at AS thread_created_at,
               t.likes AS thread_likes,
               t.reposts AS thread_reposts,
               t.shares_count AS thread_shares_count,
               t.author AS thread_author_uuid,
               t.views_count AS thread_views_count,
               t.reply_count AS thread_reply_count,
               u.name AS thread_author_name,
               u.email AS thread_author_email,
               u.image AS thread_author_image,
               t.community AS thread_community_uuid
               FROM
                   threadis t
               LEFT JOIN
                   users u ON t.author = u.uuid
               WHERE
                   t.uuid = '8943a991-5b3a-4345-bb93-52fa2e19edaa'
           )
           SELECT
               td.*,
               json_agg(cmnts.*) AS comments,
               CASE
                   WHEN td.thread_community_uuid IS NOT NULL THEN com.name
                   ELSE NULL
               END AS thread_community_name,
               CASE
                   WHEN td.thread_community_uuid IS NOT NULL THEN com.image
                   ELSE NULL
               END AS thread_community_image
           FROM
               ThreadData td
           LEFT JOIN (
               SELECT
               t.uuid AS comment_uuid,
               t.text AS comment_text,
               t.reply_count AS comment_reply_count,
               t.created_at AS comment_created_at,
               t.likes AS comment_likes,
               t.reposts AS comment_reposts,
               t.shares_count AS comment_shares_count,
               t.views_count AS comment_views_count,
               u.name AS comment_author_name,
               u.email AS comment_author_email,
               u.image AS comment_author_image,
               u.uuid AS comment_author_uuid
               FROM
                   threadis t
               LEFT JOIN
                   users u ON t.author = u.uuid
               WHERE
                   t.parent_id = '8943a991-5b3a-4345-bb93-52fa2e19edaa'
                ORDER BY
                   t.created_at DESC
           ) cmnts ON TRUE
           LEFT JOIN communities com ON com.uuid = td.thread_community_uuid
           GROUP BY
               td.thread_uuid, td.thread_text, td.thread_created_at, td.thread_likes, td.thread_reposts,
               td.thread_shares_count, td.thread_views_count,thread_author_uuid, td.thread_author_name, td.thread_author_email,
               td.thread_author_image,thread_reply_count, td.thread_community_uuid, com.name, com.image;
        `))

        // Retrives a single user's bio, and all their top threads 
        // const result = await db.execute(sql.raw(`
        // WITH UserThreads AS (
        //     SELECT
        //         t.*,
        //         (SELECT COUNT(*) FROM threadis WHERE parent_id = t.uuid) AS replies_count
        //     FROM
        //         threadis t
        //     WHERE
        //         parent_id IS NULL
        //         AND author = '1cfafd95-11b5-4814-be4a-728b76187a2d'
        // )
        // SELECT
        //     (SELECT bio FROM users WHERE uuid = '1cfafd95-11b5-4814-be4a-728b76187a2d') AS user_bio,
        //     json_agg(json_build_object(
        //         'uuid', uuid,
        //         'text', text,
        //         'author', author,
        //         'community', community,
        //         'created_at', created_at,
        //         'likes', likes,
        //         'reposts', reposts,
        //         'shares_count', shares_count,
        //         'views_count', views_count,
        //         'parent_id', parent_id,
        //         'replies_count', replies_count
        //     ) ORDER BY created_at DESC ) AS user_threads
        // FROM
        //     UserThreads;
        // `))

        // Retrives all comments/replies for a single user for notifications page
        // const result = await db.execute(sql.raw(`
        // SELECT
        // t.uuid AS comment_uuid,
        // t.text AS comment_text,
        // t.author AS comment_author_id,
        // u.name AS comment_author_name,
        // u.image AS comment_author_image,
        // t.created_at AS comment_created_at,
        // t.parent_id AS comment_parent_id
        // FROM
        // threadis t
        // LEFT JOIN
        // users u ON t.author = u.uuid
        // WHERE
        // t.parent_id IS NOT NULL
        // AND (
        //     SELECT author
        //     FROM threadis parent
        //     WHERE parent.uuid = t.parent_id
        // ) = '1cfafd95-11b5-4814-be4a-728b76187a2d'
        // ORDER BY
        // t.created_at DESC;
        // `))

        // Retrives all comments/replies created by a single user
        //  const result = await db.execute(sql.raw(`
        //  SELECT t.*, p.author AS parent_author_uuid
        //  FROM threadis t
        //  JOIN threadis p ON t.parent_id = p.uuid
        //  WHERE t.parent_id IS NOT NULL
        //  AND t.author = 'cdafbd38-db80-45bc-a96a-c4a2960db6c0'
        //  ORDER BY t.created_at DESC;
        // `))

    if(!result.rows) throw new Error("tada!")

        return NextResponse.json(result.rows)
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}
