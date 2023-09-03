import DBTools from "./DBTools/Select";
import UPDATE from "./DBTools/Update";
import Database from "./connection";

export default class DB<Model>{
    protected tableName :"users"|"global_settings"|"rank_settings"|"categories_items"|"magics"|"maps"|"monsters"|"items"|"cards"|"labyrinths"|"missions"|"avatars"|"pvp_rooms"|"avatars_items"|"avatars_cards"|"avatars_monsters"|"avatars_labyrinths";
    protected id: number | null = null;

    constructor(obj:IconstructorDB){
        this.tableName = obj.tableName;
    }

    public SelectSync(obj:DBTools<Model>){
        let where = obj.where || "id ="+this.id;
        // if(this.id != null) 
        if(obj.join && obj.on)
            return Database.SelectSync({Fields:obj.Fields , from:obj.from||this.tableName , join:obj.join , on:obj.on , where:obj.where||null})
        return Database.SelectSync({Fields:obj.Fields , from:obj.from||this.tableName, where: where })
    }

    protected Update(obj:{newValues:any}){
        return Database.Update<Model>({
            from: this.tableName,
            newValues: obj.newValues,
            where: `id=${this.id}`
        })
    }


    protected UpdateSync(obj){
        // if(this.id != null)
        return Database.UpdateSync({
            newValues: obj,
            from: this.tableName,
            where: `id=${this.id}`,
        })
    }
}

interface IconstructorDB{
    tableName : "users"|"global_settings"|"rank_settings"|"categories_items"|"magics"|"maps"|"monsters"|"items"|"cards"|"labyrinths"|"missions"|"avatars"|"pvp_rooms"|"avatars_items"|"avatars_cards"|"avatars_monsters"|"avatars_labyrinths",
}


