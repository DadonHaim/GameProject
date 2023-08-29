CREATE TABLE users (
    "id"            INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "username"      VARCHAR(50)    NOT NULL,
    "password"      VARCHAR(50)    NOT NULL,
    "email"         VARCHAR(150)   NOT NULL,
    "firstName"     VARCHAR(50),
    "lastName"      VARCHAR(50),
    "birthday"      VARCHAR(50),
    "registerDate"  VARCHAR(50)       DEFAULT CURRENT_TIMESTAMP,
    "forgetPass"    VARCHAR(150),
    "banned"        TINYINT(1)     DEFAULT 0,
    "freeze"        TINYINT(1)     DEFAULT 0,
    "token"         TEXT
);

CREATE TABLE global_settings (
    "gameName"          VARCHAR(50),
    "description"       TEXT           DEFAULT 'no description',
    "enablePvp"         TINYINT(1)     DEFAULT 0,
    "avatarsPerUser"    INT            DEFAULT 3,
    "maxUpgrade"        INT            DEFAULT 4
);

CREATE TABLE rank_settings (
    "id"              INT     NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "startExp"        INT     NOT NULL,
    "hp"              INT     NOT NULL,
    "energy"          INT     NOT NULL,
    "refillEnergy"    INT     NOT NULL
);

CREATE TABLE categories_items (
    "id"              INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"            VARCHAR(50)    NOT NULL,
    "description"     TEXT           DEFAULT 'no description',
    "freeze"          TINYINT(1)     DEFAULT 0
);

CREATE TABLE magics (
    "id"             INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"           VARCHAR(50)    NOT NULL,
    "description"    TEXT           DEFAULT 'no description',
    "freeze"         TINYINT(1)     DEFAULT 0
);

CREATE TABLE maps (
    "id"             INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"           VARCHAR(50)    NOT NULL,
    "description"    TEXT           DEFAULT 'no description',
    "freeze"         TINYINT(1)     DEFAULT 0
);

CREATE TABLE monsters (
    "id"             INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"           VARCHAR(50)     NOT NULL,
    "description"    TEXT            DEFAULT 'no description',
    "freeze"         TINYINT(1)      DEFAULT 0,
    "rankPower"      TEXT
);

CREATE TABLE items (
    "id"               INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"             VARCHAR(50)   NOT NULL,
    "description"      TEXT          DEFAULT 'no description',
    "freeze"           TINYINT(1)    DEFAULT 0,
    "price"            TEXT,
    "sale"             TEXT,
    "upgrade"          TEXT,
    "categoryItemID"   INT,                                     
    "magicID"          INT,
    FOREIGN KEY (categoryItemID) REFERENCES categories_items(id),
    FOREIGN KEY (magicID)        REFERENCES magics(id)
);

CREATE TABLE cards (
    "id"               INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"             VARCHAR(50)    NOT NULL,
    "description"      TEXT           DEFAULT 'no description',
    "type"             VARCHAR(50),
    "price"            TEXT,
    "move"             TEXT,
    "attack"           TEXT,
    "delay"            INT,
    "upgrade"          TEXT,
    "freeze"           TINYINT(1)     DEFAULT 0,
    "magicID"          INT,
    FOREIGN KEY (magicID) REFERENCES magics(id)
);

CREATE TABLE labyrinths (
    "id"              INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"            VARCHAR(50)    NOT NULL,
    "description"     TEXT           DEFAULT 'no description',
    "data"            TEXT,
    "freeze"          TINYINT(1)     DEFAULT 0,
    "mapID"           INT,
    FOREIGN KEY (mapID) REFERENCES maps(id)
);

CREATE TABLE missions (
    "id"              INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"            VARCHAR(50)    NOT NULL,
    "description"     TEXT           DEFAULT 'no description',
    "freeze"          TINYINT(1)     DEFAULT 0,
    "minRank"         INT,
    "difficulty"      INT,
    "goal"            VARCHAR(50),
    "prize"           TEXT,
    "monsterID"       INT,
    "labyrinthsID"    INT,
    FOREIGN KEY (monsterID)    REFERENCES monsters(id),
    FOREIGN KEY (labyrinthsID) REFERENCES labyrinths(id)
);

CREATE TABLE avatars (
    "id"           INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"         VARCHAR(50)    NOT NULL,
    "freeze"       TINYINT(1)     DEFAULT 0,
    "exp"          INT            DEFAULT 0,
    "silver"       INT            DEFAULT 0,
    "gold"         INT            DEFAULT 0,
    "redPowder"    INT            DEFAULT 0,
    "diamond"      INT            DEFAULT 0,
    "createdDate"  VARCHAR(50)    DEFAULT CURRENT_TIMESTAMP,
    "userID"       INT,
    "missionID"    INT,
    "magicID"      INT,
    FOREIGN KEY (userID)    REFERENCES users(id),
    FOREIGN KEY (missionID) REFERENCES missions(id),
    FOREIGN KEY (magicID)   REFERENCES magics(id)
);

CREATE TABLE pvp_rooms (
    "id"                  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "name"                VARCHAR(50)     NOT NULL,
    "status"              VARCHAR(50),
    "startDate"           VARCHAR(50)     DEFAULT CURRENT_TIMESTAMP,
    "endDate"             VARCHAR(50)     DEFAULT CURRENT_TIMESTAMP,
    "avatarOpenLog"       TEXT,
    "avatarEnterLog"      TEXT,
    "avatarOpenID"        INT,
    "avatarEnterID"       INT,
    "avatarWinID"         INT,
    FOREIGN KEY (avatarOpenID)  REFERENCES avatars(id),
    FOREIGN KEY (avatarEnterID) REFERENCES avatars(id),
    FOREIGN KEY (avatarWinID)   REFERENCES avatars(id)
);

CREATE TABLE avatars_items (
    "id"            INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "level"         INT,
    "active"        TINYINT(1)     DEFAULT 0,
    "avatarID"      INT,
    "itemID"        INT,
    FOREIGN KEY (avatarID) REFERENCES avatars(id),
    FOREIGN KEY (itemID)   REFERENCES items(id)
);

CREATE TABLE avatars_cards (
    "id"        INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "level"     INT,
    "avatarID"  INT,
    "cardID"    INT,
    FOREIGN KEY (avatarID)  REFERENCES avatars(id),
    FOREIGN KEY (cardID)    REFERENCES cards(id)
);

CREATE TABLE avatars_monsters (
    "id"              INT     NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "avatarLog"       TEXT,
    "monsterLog"      TEXT,
    "avatarID"        INT,
    "monsterID"       INT,
    FOREIGN KEY (avatarID)  REFERENCES avatars(id),
    FOREIGN KEY (monsterID) REFERENCES monsters(id)
);

CREATE TABLE avatars_labyrinths (
    "id"                  INT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "labyrinthData"       TEXT,
    "activeMissionID"     INT,
    "labyrinthID"         INT,
    FOREIGN KEY (activeMissionID) REFERENCES missions(id),
    FOREIGN KEY (labyrinthID)     REFERENCES labyrinths(id)
