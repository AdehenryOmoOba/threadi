import type {FetchUsers} from "../../lib/utils"

export const topThreadisSql = (offset: number, limit: number) => (`
SELECT
    t.uuid AS thread_uuid,
    t.text AS thread_text,
    t.author,
    t.community,
    t.created_at,
    t.likes,
    t.reposts,
    t.shares_count,
    t.views_count,
    json_build_object(
        'author_uuid', tu.uuid,
        'author_name', tu.name,
        'author_image', tu.image,
        'author_bio', tu.bio,
        'author_onboarded', tu.onboarded
    ) AS thread_author,
    COALESCE(
        json_agg(json_build_object(
            'comment_uuid', c.uuid,
            'comment_text', c.text,
            'user_uuid', cu.uuid,
            'user_name', cu.name,
            'user_image', cu.image,
            'user_bio', cu.bio,
            'user_onboarded', cu.onboarded
        )),
        '[]'::json
    ) AS comments,
    c2.uuid AS community_uuid,
    c2.name AS community_name,
    c2.image AS community_image
FROM
    threadis t
LEFT JOIN
    comments_replies c ON t.uuid = c.parent_id
LEFT JOIN
    users cu ON c.author = cu.uuid
LEFT JOIN
    users tu ON t.author = tu.uuid
LEFT JOIN
    communities c2 ON t.community = c2.uuid
GROUP BY
    t.uuid, t.text, tu.uuid, tu.name, tu.image, tu.bio, tu.onboarded,
    c2.uuid, c2.name, c2.image
ORDER BY
    t.created_at DESC
LIMIT
    ${limit}
OFFSET
    ${offset};

`)

///////////////

export const commentsRepliesSql = (parentId: string, table: string) => (`
WITH RecursiveComments AS (
    SELECT
        cr.uuid AS comment_uuid,
        cr.text AS comment_text,
        cr.parent_id AS comment_parent_id,
        cr.created_at AS comment_created_at,
        u.name AS comment_author_name,
        u.image AS comment_author_image,
        u.uuid AS comment_author_uuid,
        COUNT(cr2.uuid) AS replies_count
    FROM
        comments_replies cr
    JOIN
        users u ON cr.author = u.uuid
    LEFT JOIN
        comments_replies cr2 ON cr.uuid = cr2.parent_id
    WHERE
        cr.parent_id = '${parentId}'
    GROUP BY
        cr.uuid, cr.text, cr.parent_id, cr.created_at, u.name, u.image, u.uuid
    ORDER BY
        cr.created_at DESC
)
SELECT
    tc.*,
    tu.name AS thread_author_name,
    tu.image AS thread_author_image,
    json_agg(json_build_object(
        'comment_uuid', rc.comment_uuid,
        'comment_text', rc.comment_text,
        'comment_parent_id', rc.comment_parent_id,
        'comment_created_at', rc.comment_created_at,
        'comment_author_name', rc.comment_author_name,
        'comment_author_image', rc.comment_author_image,
        'comment_author_uuid', rc.comment_author_uuid,
        'replies_count', rc.replies_count
    )) FILTER (WHERE rc.comment_uuid IS NOT NULL) AS replies
FROM
    ${table} tc
LEFT JOIN
    RecursiveComments rc ON tc.uuid = rc.comment_parent_id
LEFT JOIN
    users tu ON tc.author = tu.uuid
WHERE
    tc.uuid = '${parentId}'
GROUP BY
    tc.uuid, tc.text, tc.author, tc.community, tc.created_at, tu.name, tu.image;
    `);

//////////////////////

export const userThreadsAndCooments = (userId: string) => (`
WITH ThreadComments AS (
    SELECT
        t.uuid AS thread_uuid,
        t.text AS thread_text,
        t.author AS thread_author_id,
        u.name AS thread_author_name,
        u.image AS thread_author_image,
        u.uuid AS thread_author_uuid,
        t.created_at AS thread_created_at,
        c.uuid AS comment_uuid,
        c.text AS comment_text,
        c.author AS comment_author_id,
        cu.name AS comment_author_name,
        cu.image AS comment_author_image,
        cu.uuid AS comment_author_uuid,
        c.created_at AS comment_created_at
    FROM
        threadis t
    LEFT JOIN
        comments_replies c ON t.uuid = c.parent_id
    LEFT JOIN
        users u ON t.author = u.uuid
    LEFT JOIN
        users cu ON c.author = cu.uuid
    WHERE
        t.author = '${userId}'
)
SELECT
    thread_uuid,
    thread_text,
    json_build_object(
        'author_name', thread_author_name,
        'author_image', thread_author_image,
        'author_uuid', thread_author_uuid
    ) AS thread_author,
    thread_created_at,
    json_agg(json_build_object(
        'comment_uuid', comment_uuid,
        'comment_author', json_build_object(
            'name', comment_author_name,
            'image', comment_author_image,
            'uuid', comment_author_uuid
        )
    ) ORDER BY comment_created_at DESC) AS comments
FROM
    ThreadComments
GROUP BY
    thread_uuid, thread_text, thread_author_name, thread_author_image, thread_author_uuid, thread_created_at
ORDER BY thread_created_at DESC;

`)

export const userAndThreadCount = (userId: string) => (`
SELECT
    u.*,
    CAST(COUNT(t.uuid) AS INTEGER) AS thread_count
FROM
    users u
LEFT JOIN
    threadis t ON u.uuid = t.author
WHERE
    u.uuid = '${userId}'
GROUP BY
    u.uuid;
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



