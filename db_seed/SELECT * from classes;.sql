SELECT * from users;
SELECT * from communities;
SELECT * from threadis;
SELECT * from test;

-- SELECT
--     users.username,
--     json_agg(json_build_object('threadi_id', threadis.uuid, 'threadi_content', threadis.text, 'created_at', threadis.created_at)) AS tweet_list,
--     COUNT(threadis.uuid) AS total_tweets
-- FROM
--     users
-- JOIN
--     threadis ON users.uuid = threadis.author
-- WHERE
--     users.username = 'alice_smith'
-- GROUP BY
--     users.username
-- ORDER BY
--     total_tweets ASC;


-- WITH RECURSIVE comment_tree AS (
--     SELECT
--         "uuid",
--         "text",
--         "author",
--         "parent_id",
--         "created_at"
--     FROM
--         "threadis"
--     WHERE
--         "parent_id" IS NULL

--     UNION ALL

--     SELECT
--         c."uuid",
--         c."text",
--         c."author",
--         c."parent_id",
--         c."created_at"
--     FROM
--         "threadis" c
--     JOIN
--         comment_tree ct ON c."parent_id" = ct."uuid"
-- )
-- SELECT * FROM comment_tree;

WITH ThreadHierarchy AS (
    SELECT
        "uuid",
        "parent_id",
        "text",
        "author",
        "community",
        "created_at",
        "likes",
        "comments_replies",
        "reposts",
        "shares_count",
        "views_count"
    FROM
        "threadis"
    WHERE
        "parent_id" IS NULL
),
NestedChildren AS (
    SELECT
        th."uuid",
        th."parent_id",
        th."text",
        th."author",
        th."community",
        th."created_at",
        th."likes",
        th."comments_replies",
        th."reposts",
        th."shares_count",
        th."views_count",
        array_agg(jsonb_build_object(
            'uuid', tc."uuid",
            'parent_id', tc."parent_id",
            'text', tc."text",
            'author', tc."author",
            'community', tc."community",
            'created_at', tc."created_at",
            'likes', tc."likes",
            'comments_replies', tc."comments_replies",
            'reposts', tc."reposts",
            'shares_count', tc."shares_count",
            'views_count', tc."views_count",
            'children', '{}'::jsonb
        )) AS "children"
    FROM
        ThreadHierarchy th
    LEFT JOIN
        "threadis" tc ON th."uuid" = tc."parent_id"
    GROUP BY
        th."uuid", th."parent_id", th."text", th."author", th."community",
        th."created_at", th."likes", th."comments_replies", th."reposts",
        th."shares_count", th."views_count"
)
SELECT
    jsonb_agg(jsonb_build_object(
        'uuid', nc."uuid",
        'parent_id', nc."parent_id",
        'text', nc."text",
        'author', nc."author",
        'community', nc."community",
        'created_at', nc."created_at",
        'likes', nc."likes",
        'comments_replies', nc."comments_replies",
        'reposts', nc."reposts",
        'shares_count', nc."shares_count",
        'views_count', nc."views_count",
        'children', nc."children"
    )) AS "result"
FROM
    NestedChildren nc
WHERE
    nc."parent_id" IS NULL;




DROP DATABASE threadi;