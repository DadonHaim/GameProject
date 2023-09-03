export default class Update<T>{
    where: string;
    newValues : T
    from?   : "users"|"global_settings"|"rank_settings"|"categories_items"|"magics"|"maps"|"monsters"|"items"|"cards"|"labyrinths"|"missions"|"avatars"|"pvp_rooms"|"avatars_items"|"avatars_cards"|"avatars_monsters"|"avatars_labyrinths";
    constructor(obj : Update<T>){}
}

