-- INSERT INTO "users" ("username", "name", "image", "bio", "onboarded")
-- VALUES
--     ('alice_smith', 'Alice Smith', 'alice.jpg', 'Tech enthusiast', false),
--     ('john_doe', 'John Doe', 'john.jpg', 'Software developer', false),
--     ('emily_jones', 'Emily Jones', 'emily.jpg', 'Artist and traveler', false),
--     ('michael_wang', 'Michael Wang', 'michael.jpg', 'Coding enthusiast', false),
--     ('susan_johnson', 'Susan Johnson', 'susan.jpg', 'Nature lover', false),
--     ('adehenry', 'Ade Henry', 'ade.jpg', 'Tech Bro', false);

-- INSERT INTO "communities" ("username", "name", "image", "bio", "created_by")
-- VALUES
--     ('tech_community', 'Tech Enthusiasts', 'tech.jpg', 'Discuss all things tech!', '9b0553eb-fe29-4cdd-b566-f4fb86d22f09'),
--     ('art_lovers', 'Art Lovers', 'art.jpg', 'Appreciate and create art together.', '61e537b1-5a5a-400f-a028-84737fcc22e8'),
--     ('nature_explorers', 'Nature Explorers', 'nature.jpg', 'Discover the beauty of the outdoors.', '61e537b1-5a5a-400f-a028-84737fcc22e8');


-- INSERT INTO "threadis" ("text", "author", "community")
-- VALUES
--     ('Check out my new tech article!', '9b0553eb-fe29-4cdd-b566-f4fb86d22f09', '4f45f4a4-8dbb-4655-942a-cb967d421c8c'),
--     ('Sharing my latest artwork with you all.', '61e537b1-5a5a-400f-a028-84737fcc22e8', '14bb5aa1-249e-44b4-9b83-5d6489cc3d72'),
--     ('Hiking adventure: Exploring the mountains.', '61e537b1-5a5a-400f-a028-84737fcc22e8', '14bb5aa1-249e-44b4-9b83-5d6489cc3d72'),
--     ('Discussing the latest coding trends.', '6784f57e-f325-4cf8-b32c-43630702230b', '14bb5aa1-249e-44b4-9b83-5d6489cc3d72'),
--     ('Art inspiration: Nature and colors.', '6784f57e-f325-4cf8-b32c-43630702230b', null);

-- INSERT INTO "comments_replies" ("parent_id","text", "author")
-- VALUES
--     ('7acbc0cb-801d-4874-a285-0f6ee5fe4d37','me too...cool article', '61e537b1-5a5a-400f-a028-84737fcc22e8'),
--     ('7acbc0cb-801d-4874-a285-0f6ee5fe4d37','I love the article', '6784f57e-f325-4cf8-b32c-43630702230b');

-- INSERT INTO "comments_replies" ("parent_id","text", "author")
-- VALUES
--     ('c1106f53-5ccc-46cf-9a9e-0a483fa1003d','ouiiiiiiiiiiii...!', '0cae795e-f9f7-492a-825a-a5db3c185ad1'),
--     ('c1106f53-5ccc-46cf-9a9e-0a483fa1003d','yes yes yes', '61e537b1-5a5a-400f-a028-84737fcc22e8');

-- INSERT INTO "comments_replies" ("parent_id","text", "author")
-- VALUES
--     ('3bc39a82-0573-41fd-b5bd-6511cc6e6112','lets chat in dm...', '0cae795e-f9f7-492a-825a-a5db3c185ad1');



-- INSERT INTO "test" ("colors", "names") VALUES ('green', '{"oxen", "bible"}');

-- UPDATE "test" 
-- SET "names" = array_append("names", 'kiwi') 
-- WHERE "id" = '3f47873e-1447-4c41-85bc-d4079194e6d6';

-- UPDATE "test" 
-- SET "names" = array_remove("names", 'richie') 
-- WHERE "id" = '3f47873e-1447-4c41-85bc-d4079194e6d6';

UPDATE "users" 
SET "image" = 'https://firebasestorage.googleapis.com/v0/b/threadi-b2a37.appspot.com/o/random_profile_photos%2Fsusan.jpeg?alt=media&token=8ca39098-b2b2-4eaf-8b29-ccc7465b6f99'
WHERE "username" = 'susan_johnson';