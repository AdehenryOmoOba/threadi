import type {FetchUsers} from "../../lib/utils"

export const topThreadisSql = (offset: number, limit: number) => (`
WITH ThreadData AS (
    SELECT
        t.*,
        u.name AS author_name,
        u.email AS author_email,
        u.image AS author_image,
        c.name AS community_name,
        c.image AS community_image,
        COUNT(r.uuid) AS replies_count
    FROM
        threadis t
    LEFT JOIN
        threadis r ON t.uuid = r.parent_id
    JOIN
        users u ON t.author = u.uuid
    LEFT JOIN
        communities c ON t.community = c.uuid
    WHERE
        t.parent_id IS NULL
    GROUP BY
        t.uuid, t.text, t.author, u.uuid, u.name, u.email, u.image, t.community, t.created_at, t.likes, t.reposts, t.shares_count, t.views_count, c.name, c.image
    ORDER BY
        t.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
)
SELECT
    (SELECT json_agg(thread) FROM (SELECT * FROM ThreadData) thread) AS top_threads,
    (SELECT total_count FROM threadis_count) AS top_threadis_count;

`)

export const threadAndReplies = (threadId: string) => (`
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
        t.uuid = '${threadId}'
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
        t.parent_id = '${threadId}'
    ORDER BY
        t.created_at DESC
) cmnts ON TRUE
LEFT JOIN communities com ON com.uuid = td.thread_community_uuid
GROUP BY
    td.thread_uuid, td.thread_text, td.thread_created_at, td.thread_likes, td.thread_reposts,
    td.thread_shares_count, td.thread_views_count,thread_author_uuid, td.thread_author_name, td.thread_author_email,
    td.thread_author_image,thread_reply_count, td.thread_community_uuid, com.name, com.image;

`);

export const userThreadsAndCooments = (userId: string) => (`
SELECT
    (SELECT bio FROM users WHERE uuid = '${userId}') AS user_bio,
    json_agg(json_build_object(
        'uuid', uuid,
        'text', text,
        'author', author,
        'community', community,
        'created_at', created_at,
        'likes', likes,
        'reposts', reposts,
        'shares_count', shares_count,
        'views_count', views_count,
        'reply_count', reply_count,
        'parent_id', parent_id
    ) ORDER BY created_at DESC) AS user_threads
FROM
    threadis
WHERE
    parent_id IS NULL
    AND author = '${userId}';

`)

export const fetchAllUsers = ({searchString, pageNumber, pageSize, sortBy, userId}: FetchUsers) => {

    const withUserId = `
    WITH FilteredUsers AS ( SELECT
        uuid,
        name,
        email,
        image
    FROM
        users
    WHERE
        (name ILIKE '%' || '${searchString}' || '%' OR email ILIKE '%' || '${searchString}' || '%')
        AND uuid != '${userId}'
    )
    SELECT
        *,
        COUNT(*) OVER() AS total_match_count
    FROM
        FilteredUsers
    ORDER BY
        name ${sortBy}
    LIMIT ${pageSize}
    OFFSET (${pageNumber} - 1) * ${pageSize};
    `

    const withoutUserId = `

    WITH FilteredUsers AS (
        SELECT
            uuid,
            name,
            email,
            image
        FROM
            users
        WHERE
            (name ILIKE '%' || '${searchString}' || '%' OR email ILIKE '%' || '${searchString}' || '%')
    )
    SELECT
        *,
        COUNT(*) OVER() AS total_match_count
    FROM
        FilteredUsers
    ORDER BY
        name ${sortBy}
    LIMIT ${pageSize}
    OFFSET (${pageNumber} - 1) * ${pageSize};
    
    `
    return userId === undefined ? withoutUserId : withUserId
}

export const fetchUserActivities = (userId: string) => (`
SELECT
    t.author AS comment_author_id,
    u.name AS comment_author_name,
    u.email AS comment_author_email,
    u.image AS comment_author_image,
    t.created_at AS comment_created_at,
    t.parent_id AS comment_parent_id,
    parent.text AS parent_thread_text,
    parent.created_at AS parent_thread_created_at
FROM
    threadis t
LEFT JOIN
    users u ON t.author = u.uuid
LEFT JOIN
    threadis parent ON t.parent_id = parent.uuid -- Join with parent thread
WHERE
    t.parent_id IS NOT NULL
    AND (
        SELECT author
        FROM threadis parent
        WHERE parent.uuid = t.parent_id
    ) = '${userId}'
    AND t.author != '${userId}' -- Exclude comments authored by the specified UUID
ORDER BY
    t.created_at DESC;
`)



