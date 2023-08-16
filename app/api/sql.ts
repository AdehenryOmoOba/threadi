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
        'author_username', tu.username,
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
            'user_username', cu.username,
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
    t.uuid, t.text, tu.uuid, tu.username, tu.name, tu.image, tu.bio, tu.onboarded,
    c2.uuid, c2.name, c2.image
ORDER BY
    t.created_at DESC
LIMIT
    ${limit}
OFFSET
    ${offset};

`)

export const commentsRepliesSql = (parentId: string) => (`
WITH RecursiveComments AS (
    SELECT
        cr.uuid AS comment_uuid,
        cr.text AS comment_text,
        cr.parent_id AS comment_parent_id
    FROM
        comments_replies cr
    WHERE
        cr.parent_id = '${parentId}'
),
RecursiveReplies AS (
    SELECT
        cr.uuid AS comment_uuid,
        cr.text AS comment_text,
        cr.parent_id AS comment_parent_id,
        u.image AS author_image
    FROM
        comments_replies cr
    JOIN
        users u ON cr.author = u.uuid
    JOIN
        RecursiveComments rc ON cr.parent_id = rc.comment_uuid
)
SELECT
    rc.comment_uuid,
    rc.comment_text,
    rc.comment_parent_id,
    json_agg(json_build_object(
        'comment_uuid', rr.comment_uuid,
        'comment_text', rr.comment_text,
        'comment_parent_id', rr.comment_parent_id,
        'author_image', rr.author_image
    )) AS replies
FROM
    RecursiveComments rc
LEFT JOIN
    RecursiveReplies rr ON rc.comment_uuid = rr.comment_parent_id
GROUP BY
    rc.comment_uuid, rc.comment_text, rc.comment_parent_id;
`)