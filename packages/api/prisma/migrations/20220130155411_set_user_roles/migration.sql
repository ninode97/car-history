-- This is an empty migration.

UPDATE "User"
SET "userRoleId" = 2
WHERE "userRoleId" IS NULL;