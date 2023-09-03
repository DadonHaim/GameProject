export default class SELECT<T>{
    Fields  : T | T[];
    And?    : string[];
    join?   : "users"|"global_settings"|"rank_settings"|"categories_items"|"magics"|"maps"|"monsters"|"items"|"cards"|"labyrinths"|"missions"|"avatars"|"pvp_rooms"|"avatars_items"|"avatars_cards"|"avatars_monsters"|"avatars_labyrinths";
    on?     : string;
    where?  : string;
    from?   : "users"|"global_settings"|"rank_settings"|"categories_items"|"magics"|"maps"|"monsters"|"items"|"cards"|"labyrinths"|"missions"|"avatars"|"pvp_rooms"|"avatars_items"|"avatars_cards"|"avatars_monsters"|"avatars_labyrinths";
    constructor(obj : SELECT<T>){}
}

