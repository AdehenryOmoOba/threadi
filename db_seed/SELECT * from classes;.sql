-- SELECT * from users;
-- SELECT * from communities;
SELECT * from threadis;
-- SELECT * from test;

show max_connections;

-- SELECT * from users WHERE email = 'alice@gmail.com';

-- -- SELECT
-- --     users.username,
-- --     json_agg(json_build_object('threadi_id', threadis.uuid, 'threadi_content', threadis.text, 'created_at', threadis.created_at)) AS tweet_list,
-- --     COUNT(threadis.uuid) AS total_tweets
-- -- FROM
-- --     users
-- -- JOIN
-- --     threadis ON users.uuid = threadis.author
-- -- WHERE
-- --     users.username = 'alice_smith'
-- -- GROUP BY
-- --     users.username
-- -- ORDER BY
-- --     total_tweets ASC;


-- -- WITH RECURSIVE comment_tree AS (
-- --     SELECT
-- --         "uuid",
-- --         "text",
-- --         "author",
-- --         "parent_id",
-- --         "created_at"
-- --     FROM
-- --         "threadis"
-- --     WHERE
-- --         "parent_id" IS NULL

-- --     UNION ALL

-- --     SELECT
-- --         c."uuid",
-- --         c."text",
-- --         c."author",
-- --         c."parent_id",
-- --         c."created_at"
-- --     FROM
-- --         "threadis" c
-- --     JOIN
-- --         comment_tree ct ON c."parent_id" = ct."uuid"
-- -- )
-- -- SELECT * FROM comment_tree;

-- WITH ThreadHierarchy AS (
--     SELECT
--         "uuid",
--         "parent_id",
--         "text",
--         "author",
--         "community",
--         "created_at",
--         "likes",
--         "comments_replies",
--         "reposts",
--         "shares_count",
--         "views_count"
--     FROM
--         "threadis"
--     WHERE
--         "parent_id" IS NULL
-- ),
-- NestedChildren AS (
--     SELECT
--         th."uuid",
--         th."parent_id",
--         th."text",
--         th."author",
--         th."community",
--         th."created_at",
--         th."likes",
--         th."comments_replies",
--         th."reposts",
--         th."shares_count",
--         th."views_count",
--         array_agg(jsonb_build_object(
--             'uuid', tc."uuid",
--             'parent_id', tc."parent_id",
--             'text', tc."text",
--             'author', tc."author",
--             'community', tc."community",
--             'created_at', tc."created_at",
--             'likes', tc."likes",
--             'comments_replies', tc."comments_replies",
--             'reposts', tc."reposts",
--             'shares_count', tc."shares_count",
--             'views_count', tc."views_count",
--             'children', '{}'::jsonb
--         )) AS "children"
--     FROM
--         ThreadHierarchy th
--     LEFT JOIN
--         "threadis" tc ON th."uuid" = tc."parent_id"
--     GROUP BY
--         th."uuid", th."parent_id", th."text", th."author", th."community",
--         th."created_at", th."likes", th."comments_replies", th."reposts",
--         th."shares_count", th."views_count"
-- )
-- SELECT
--     jsonb_agg(jsonb_build_object(
--         'uuid', nc."uuid",
--         'parent_id', nc."parent_id",
--         'text', nc."text",
--         'author', nc."author",
--         'community', nc."community",
--         'created_at', nc."created_at",
--         'likes', nc."likes",
--         'comments_replies', nc."comments_replies",
--         'reposts', nc."reposts",
--         'shares_count', nc."shares_count",
--         'views_count', nc."views_count",
--         'children', nc."children"
--     )) AS "result"
-- FROM
--     NestedChildren nc
-- WHERE
--     nc."parent_id" IS NULL;




-- DROP DATABASE threadi;

-- ////////////////

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
    5
OFFSET
    0;

-- ///////////////////

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
        cr.parent_id = 'cab5c991-3700-401b-b833-4ec9f4160b79'
    GROUP BY
        cr.uuid, cr.text, cr.parent_id, cr.created_at, u.name, u.image, u.uuid
)
SELECT
    tc.*,
    json_build_object(
        'author_name', tu.name,
        'author_image', tu.image,
        'author_uuid', tu.uuid
    ) AS thread_author,
    json_agg(json_build_object(
        'comment_uuid', rc.comment_uuid,
        'comment_text', rc.comment_text,
        'comment_parent_id', rc.comment_parent_id,
        'comment_created_at', rc.comment_created_at,
        'comment_author_name', rc.comment_author_name,
        'comment_author_image', rc.comment_author_image,
        'comment_author_uuid', rc.comment_author_uuid,
        'replies_count', rc.replies_count
    )) AS replies
FROM
    threadis tc
JOIN
    RecursiveComments rc ON tc.uuid = rc.comment_parent_id
LEFT JOIN
    users tu ON tc.author = tu.uuid
WHERE
    tc.uuid = 'cab5c991-3700-401b-b833-4ec9f4160b79'
GROUP BY
    tc.uuid, tc.text, tc.author, tc.community, tc.created_at, tu.name, tu.image, tu.uuid;






