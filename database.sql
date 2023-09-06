CREATE TABLE users (
    "id"            INT IDENTITY(1,1) PRIMARY KEY,
    "username"      VARCHAR(50) NOT NULL UNIQUE,
    "password"      VARCHAR(50) NOT NULL,
    "email"         VARCHAR(150) NOT NULL UNIQUE,
    "firstName"     VARCHAR(50),
    "lastName"      VARCHAR(50),
    "birthday"       VARCHAR(50),
    "registerDate"  DATETIME2 DEFAULT GETDATE(),
    "forgetPass"    VARCHAR(150),
    "banned"        TINYINT DEFAULT 0,
    "freeze"        TINYINT DEFAULT 0,
    "token"         NVARCHAR(MAX)
);

CREATE TABLE global_settings (
    gameName VARCHAR(50),
    "description" NVARCHAR(MAX) DEFAULT 'no description',
    enablePvp TINYINT DEFAULT 0,
    avatarsPerUser INT DEFAULT 3,
    maxUpgrade INT DEFAULT 4
);

CREATE TABLE rank_settings (
    id INT IDENTITY(1,1) PRIMARY KEY,
    startExp INT NOT NULL UNIQUE,
    hp INT NOT NULL,
    energy INT NOT NULL,
    refillEnergy INT NOT NULL
);

CREATE TABLE categories_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE,
    "description" NVARCHAR(MAX) DEFAULT 'no description',
    freeze TINYINT DEFAULT 0
);

CREATE TABLE magics (
    id INT IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE,
    "description" NVARCHAR(MAX) DEFAULT 'no description',
    freeze TINYINT DEFAULT 0
);

CREATE TABLE maps (
    id INT IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE,
    "description" NVARCHAR(MAX) DEFAULT 'no description',
    freeze TINYINT DEFAULT 0
);

CREATE TABLE monsters (
    id INT IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE,
    "description" NVARCHAR(MAX) DEFAULT 'no description',
    freeze TINYINT DEFAULT 0,
    rankPower NVARCHAR(MAX)
);

CREATE TABLE items (
    id                  INT IDENTITY(1,1) PRIMARY KEY,
    "name"              VARCHAR(50) NOT NULL UNIQUE,
    "description"       NVARCHAR(MAX) DEFAULT 'no description',
    freeze              TINYINT DEFAULT 0,
    price               NVARCHAR(MAX),
    color               VARCHAR(10) DEFAULT('none'),
    sale                NVARCHAR(MAX),
    upgrade             NVARCHAR(MAX),
    minAvatarRank INT DEFAULT 1,
    categoryItem        VARCHAR,                                     
    magicID             INT,
    maxUpgrade  INT DEFAULT 3

    -- FOREIGN KEY (categoryItemID) REFERENCES categories_items(id),
    FOREIGN KEY (magicID) REFERENCES magics(id)
);

CREATE TABLE cards (
    id INT IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE,
    "description" NVARCHAR(MAX) DEFAULT 'no description',
    "type" VARCHAR(50),
    price NVARCHAR(MAX),
    "move" NVARCHAR(MAX),
    attack NVARCHAR(MAX),
    "delay" INT,
    minAvatarLevel INT DEFAULT 1,
    upgrade NVARCHAR(MAX),
    maxUpgrade  INT DEFAULT 3,
    freeze TINYINT DEFAULT 0,
    magicID INT,
    FOREIGN KEY (magicID) REFERENCES magics(id)
);

CREATE TABLE labyrinths (
    id INT IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE,
    "description" NVARCHAR(MAX) DEFAULT 'no description',
    "data" NVARCHAR(MAX),
    freeze TINYINT DEFAULT 0,
    mapID INT,
    FOREIGN KEY (mapID) REFERENCES maps(id)
);

CREATE TABLE missions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "description" NVARCHAR(MAX) DEFAULT 'no description',
    freeze TINYINT DEFAULT 0,
    minRank INT,
    difficulty INT,
    goal VARCHAR(50),
    prize NVARCHAR(MAX),
    monsterID INT,
    magicID INT DEFAULT 0,
    labyrinthsID INT,
    FOREIGN KEY (monsterID) REFERENCES monsters(id),
    FOREIGN KEY (labyrinthsID) REFERENCES labyrinths(id)
);


CREATE TABLE avatars (
    id INT IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    freeze TINYINT DEFAULT 0,
    exp INT DEFAULT 0,
    silver INT DEFAULT 0,
    gold INT DEFAULT 0,
    redPowder INT DEFAULT 0,
    diamond INT DEFAULT 0,
    createdDate DATETIME2 DEFAULT GETDATE(),
    userID INT,
    missionID INT,
    magicID INT,
    FOREIGN KEY (userID) REFERENCES users(id),
    FOREIGN KEY (missionID) REFERENCES missions(id),
    FOREIGN KEY (magicID) REFERENCES magics(id)
);

CREATE TABLE pvp_rooms (
    id INT IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50),
    startDate DATETIME2 DEFAULT GETDATE(),
    endDate DATETIME2 DEFAULT GETDATE(),
    avatarOpenLog NVARCHAR(MAX),
    avatarEnterLog NVARCHAR(MAX),
    avatarOpenID INT,
    avatarEnterID INT,
    avatarWinID INT,
    FOREIGN KEY (avatarOpenID) REFERENCES avatars(id),
    FOREIGN KEY (avatarEnterID) REFERENCES avatars(id),
    FOREIGN KEY (avatarWinID) REFERENCES avatars(id)
);

CREATE TABLE avatars_items (
    id          INT IDENTITY(1,1) PRIMARY KEY,
    rank     INT,
    active      TINYINT DEFAULT 0,
    avatarID    INT,
    itemID      INT,
    FOREIGN KEY (avatarID) REFERENCES avatars(id),
    FOREIGN KEY (itemID) REFERENCES items(id)
);

CREATE TABLE avatars_cards (
    id INT IDENTITY(1,1) PRIMARY KEY,
    rank INT,
    avatarID INT,
    cardID INT,
    FOREIGN KEY (avatarID) REFERENCES avatars(id),
    FOREIGN KEY (cardID) REFERENCES cards(id)
);

CREATE TABLE avatars_monsters (
    id INT IDENTITY(1,1) PRIMARY KEY,
    avatarLog NVARCHAR(MAX),
    monsterLog NVARCHAR(MAX),
    avatarID INT,
    monsterID INT,
    FOREIGN KEY (avatarID) REFERENCES avatars(id),
    FOREIGN KEY (monsterID) REFERENCES monsters(id)
);

CREATE TABLE avatars_labyrinths (
    id INT IDENTITY(1,1) PRIMARY KEY,
    labyrinthData NVARCHAR(MAX),
    activeMissionID INT,
    labyrinthID INT,
    FOREIGN KEY (activeMissionID) REFERENCES missions(id),
    FOREIGN KEY (labyrinthID) REFERENCES labyrinths(id)
);


Insert INTO users ("username"   ,"password"   ,"email"  ,"firstName"   ,"lastName"   ,"birthday"  )
Values('user1','123123','user1@gmail.com','haim','dadon','17/10/2000')

Insert INTO users ("username"    ,"password"    ,"email"       ,"firstName"   ,"lastName"    ,"birthday"    )
Values ('user2','12345678','user2@gmail.com','yosef','uliel','08/05/2005')

Insert INTO users ("username"    ,"password"    ,"email"       ,"firstName"   ,"lastName"    ,"birthday"    )
Values ('TestTest','TestTest','TestTest','TestTest','TestTest','TestTest')



Insert Into magics ("name","description","freeze")
Values('fire','empty',0)
Insert Into magics ("name","description","freeze")
Values('water','empty',0)
Insert Into magics ("name","description","freeze")
Values('nature','empty',0)



Insert Into avatars ("name","exp","silver","gold","redPowder","diamond","userID","magicID")
Values  ('barakAvatar',0,10,10,10,10,1,1),
        ('avivatar',0,10,10,10,10,2,2),
        ('Memotar',0,10,10,10,10,2,2)

Insert Into items ("name","description", "freeze", "price", "color", "sale", "upgrade", "categoryItem", "magicID")
Values  ('item1','empty',0,'empty','red','empty','empty','123',1),
        ('item2','empty',0,'empty','red','empty','empty','123',1),
        ('item3','empty',0,'empty','red','empty','empty','123',1)


Insert Into avatars_items   ("rank","active","avatarID","itemID")
Values                      (1,0,1,1),
                            (1,1,3,1),
                            (1,0,1,2),
                            (1,1,2,2),
                            (1,1,3,2),
                            (1,1,3,2),
                            (1,1,2,1),
                            (1,1,2,1)


 
del /s /q /f .\*.js
