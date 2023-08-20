

create table users(
    user_id        int            NOT NULL   IDENTITY(1,1)     PRIMARY KEY ,
    username       varchar(50)    NOT NULL,
    "password"     varchar(50)    NOT NULL,
    email          varchar(150)   NOT NULL,
    firstName      varchar(50),
    lastName       varchar(50),
    birthday       dateTime ,
    register_date  dateTime         default GETDATE(),
    forgetPass     varchar(150),
    banned         bit              default 0,
    freeze         bit              default 0,
    token          text ,
)

create table user_log(
    user_ID    int      FOREIGN KEY REFERENCES users(user_id),
    login_in   dateTime,
    login_out  dateTime,

)






create table global_settings(
    game_name           varchar(50),
    "description"       text    default 'no description',
    enable_pvp          bit     default 0 ,
    avatars_per_user    int     default 3,
    max_upgrade         int     default 4,
)

create table rank_settings(
    rank_id         int     not null    IDENTITY(1,1)   PRIMARY KEY,
    start_exp       int     not null,
    hp              int     not null,
    energy          int     not null,
    refill_energy   int     not null,
)

create table categories_items(
    category_id     int            not null    IDENTITY(1,1)   PRIMARY KEY,
    category_name   varchar(50)    not null,
    "description"   text           default 'no description',
    freeze          bit            default 0,
)

create table magics(
    magic_id        int            not null    IDENTITY(1,1)   PRIMARY KEY,
    magic_name      varchar(50)    not null,
    "description"   text           default 'no description',
    freeze          bit            default 0,
)

create table maps(
    map_id          int            not null    IDENTITY(1,1)   PRIMARY KEY,
    map_name        varchar(50)    not null,
    "description"   text           default 'no description',
    freeze          bit            default 0,
)

create table monsters(
    monster_id      int     not null    IDENTITY(1,1)   PRIMARY KEY,
    monster_name    varchar(50)     not null,
    "description"   text    default 'no description',
    freeze          bit     default 0,
    rank_power      text
)

create table items(
    item_id          int           not null    IDENTITY(1,1)   PRIMARY KEY,
    item_name        varchar(50)   not null,
    "description"    text          default 'no description',
    price            text,
    sale             text,          
    upgrade          text,
    freeze           bit           default 0       ,
    category_item    int           FOREIGN KEY REFERENCES categories_items(category_id) ,
    magic_ID         int           FOREIGN KEY REFERENCES magics(magic_id)
)

create table cards(
    card_id          int            not null    IDENTITY(1,1)   PRIMARY KEY,
    card_name        varchar(50)    not null,
    "description"    text           default 'no description',
    "type"           varchar(50),        -- קלף הגנה , קלף חידוש , קלף התקפה
    price            text,
    "move"           text,
    attack           text,
    "delay"          int   ,
    upgrade          text ,
    freeze           bit            default 0,
    magic_ID         int            FOREIGN KEY REFERENCES magics(magic_id)
)

create table labyrinths(
    labyrinth_id    int            not null    IDENTITY(1,1)   PRIMARY KEY,
    labyrinth_name  varchar(50)    not null,
    "description"   text           default 'no description',
    labyrinth_data  text,
    freeze          bit            default 0,
    map_ID          int            FOREIGN KEY REFERENCES maps(map_id)  
)

create table missions(
    mission_id       int            not null    IDENTITY(1,1)   PRIMARY KEY   ,
    missions_name    varchar(50)    not null,
    "description"    text           default 'no description',
    min_rank         int   ,
    difficulty       int   ,
    goal             varchar(50),
    prize            text   ,
    monster_ID       int            FOREIGN KEY REFERENCES monsters(monster_id),
    labyrinths_ID    int            FOREIGN KEY REFERENCES labyrinths(labyrinth_id)  
)

create table avatars(
    avatar_id    int            NOT NULL   IDENTITY(1,1)     PRIMARY KEY,
    avatar_name  varchar(50)    NOT NULL,
    exp          int            default 0 ,
    silver       int            default 0 ,
    gold         int            default 0 ,
    redPowdwe    int            default 0 ,
    dimaond      int            default 0 ,
    created_date dateTime       default GETDATE(),
    user_ID      int            FOREIGN KEY REFERENCES users(user_id),
    mission_ID   int            FOREIGN KEY REFERENCES missions(mission_id),
    magic_ID     int            FOREIGN KEY REFERENCES magics(magic_id)
)   




create table pvp_rooms(
    room_id             int             not null    IDENTITY(1,1) PRIMARY KEY,
    room_name           varchar(50)     not null,
    "status"            varchar(50),
    "start_date"        dateTime        default GETDATE(),
    "end_date"          dateTime        default GETDATE(),
    avatar_open_log     text,
    avatar_enter_log    text,
    avatar_open         int             FOREIGN KEY REFERENCES avatars(avatar_id),
    avatar_Enter        int             FOREIGN KEY REFERENCES avatars(avatar_id),
    avatar_win          int             FOREIGN KEY REFERENCES avatars(avatar_id)
)   



create table avatars_items(
    id      int            not null    IDENTITY(1,1)   PRIMARY KEY,
    leven   int,
    active  bit default 0,
    avatar_ID int  FOREIGN KEY REFERENCES avatars(avatar_id)  ,
    item_ID  int FOREIGN KEY REFERENCES items(item_id)  ,
)
create table avatars_cards(
    id      int            not null    IDENTITY(1,1)   PRIMARY KEY,
    leven   int,
    avatar_ID int FOREIGN KEY REFERENCES avatars(avatar_id)  ,
    card_ID int FOREIGN KEY REFERENCES cards(card_id)  ,

)
create table avatars_monsters(
    id   int            not null    IDENTITY(1,1)   PRIMARY KEY,
    avatar_log      text ,
    monster_log     text ,
    avatar_ID    int   FOREIGN KEY REFERENCES avatars(avatar_id)  ,
    monster_ID   int  FOREIGN KEY REFERENCES monsters(monster_id)  ,

)
create table avatars_labyrinths(
    id   int            not null    IDENTITY(1,1)   PRIMARY KEY,
    labyrinth_data  text,

    active_mission_ID  int   FOREIGN KEY REFERENCES missions(mission_ID)  ,
    labyrinth_ID  int FOREIGN KEY REFERENCES labyrinths(labyrinth_id)  ,
)
create table monsters_cards(
    id   int            not null    IDENTITY(1,1)   PRIMARY KEY,
    monster_ID   int  FOREIGN KEY REFERENCES monsters(monster_id)  ,
    card_ID    int FOREIGN KEY REFERENCES cards(card_id)  ,
)


