-- This is an empty migration.

INSERT INTO "UserRole"
    (id, name)
SELECT 1, 'administrator'
WHERE
    NOT EXISTS (
        SELECT id FROM "UserRole" WHERE id = 1
    );

INSERT INTO "UserRole"
    (id, name)
SELECT 2, 'moderator'
WHERE
    NOT EXISTS (
        SELECT id FROM "UserRole" WHERE id = 2
    );
