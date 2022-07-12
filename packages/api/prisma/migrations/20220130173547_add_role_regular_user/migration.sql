-- This is an empty migration.
INSERT INTO "UserRole"
    (id, name)
SELECT 3, 'regular'
WHERE
    NOT EXISTS (
        SELECT id FROM "UserRole" WHERE id = 3
    );
