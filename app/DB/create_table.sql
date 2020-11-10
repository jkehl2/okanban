BEGIN;

DROP TABLE IF EXISTS "list" CASCADE;

DROP TABLE IF EXISTS "card" CASCADE;

DROP TABLE IF EXISTS "tag" CASCADE;

DROP TABLE IF EXISTS "cardHasTag" CASCADE;

CREATE TABLE IF NOT EXISTS "list" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "card" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "list_id" INTEGER NOT NULL REFERENCES "list" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "tag" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#FFFFFF',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cardHasTag" (
    "card_id" INTEGER NOT NULL REFERENCES "card" ("id") ON DELETE CASCADE,
    "tag_id" INTEGER NOT NULL REFERENCES "tag" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY("card_id", "tag_id")
);

INSERT INTO
    "list" (
        "id",
        "name",
        "position"
    )
VALUES
    (1, 'A FAIRE', 0),
    (2, 'EN COURS', 1),
    (3, 'TERMINER', 2);

INSERT INTO
    "card" (
        "id",
        "title",
        "position",
        "list_id"
    )
VALUES
    (1, 'TACHE 1', 0, 3),
    (2, 'TACHE 2', 0, 3),
    (3, 'TACHE 3', 0, 2),
    (4, 'TACHE 4', 0, 2),
    (5, 'TACHE 5', 0, 2),
    (6, 'TACHE 6', 0, 1),
    (7, 'TACHE 7', 0, 1);

INSERT INTO
    "tag" ("id", "name")
VALUES
    (1, 'P0'),
    (2, 'P1'),
    (3, 'P2'),
    (4, 'P3'),
    (5, 'P4');

INSERT INTO
    "cardHasTag" ("card_id", "tag_id")
VALUES
    (1, 1),
    (2, 1),
    (3, 3),
    (4, 3),
    (5, 4),
    (6, 5),
    (7, 5);

COMMIT;