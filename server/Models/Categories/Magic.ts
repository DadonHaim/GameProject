import DB            from "@Database/DB"
import Database      from "@Database/Connection";
import MagicsModel   from "@DbModels/MagicsModel";
import ItemsModel    from "@Database/DbModels/ItemsModel";
import cardsModel    from "@Database/DbModels/CardsModel";
import AvatarsModel  from "@Database/DbModels/AvatarsModel";
import MissionsModel from "@Database/DbModels/MissionsModel";
import ResultSql     from "@Database/ResultSql";

export default class Magic extends DB<TMagics>{
    private name        : string;
    private description : string;
    private freeze      : boolean;
    private isExist     : boolean = false;

    public GetId         = ():number  => this.id;
    public GetName        = ():string  => this.name;
    public GetDescription = ():string  => this.description;
    public IsFreeze       = ():boolean => this.freeze;
    public IsExist        = ():boolean => this.isExist;

    constructor(obj?: MagicsModel){
        super({tableName:"magics"})
        if(obj){
            this.id          = (obj.id              )? obj.id         :null;      
            this.name        = (obj.name            )? obj.name       :null;  
            this.description = (obj.description     )? obj.description:null;  
            this.freeze      = (obj.freeze          )? obj.freeze     :null;  
            this.isExist     = (this.id && this.name)? true           :false;
        }
    }

    public GetAllItems(sync?:boolean) :ResultSql|Promise<any>{
        let query = `Select * from items where magicID=${this.id}`;
        if(sync)
            return Database.QuerySync(query);
        return Database.Query(query);
    }
    public GetAllCards(sync?:boolean):ResultSql|Promise<any>{
        let query = `Select * from cards where magicID=${this.id}`;
        if(sync)
            return Database.QuerySync(query);
        return Database.Query(query);
    }
    public GetAllAvatars(sync?:boolean):ResultSql|Promise<any>{
        let query = `Select * from avatars where magicID=${this.id}`;
        if(sync)
            return Database.QuerySync(query);
        return Database.Query(query);
    }
    public GetAllMissions(sync?:boolean):ResultSql|Promise<any>{
        let query = `Select * from missions where magicID=${this.id}`;
        if(sync)
            return Database.QuerySync(query);
        return Database.Query(query);
    }


    public GetAllItemsLite(sync?:boolean) :ResultSql|Promise<any>{
        let query = `Select id,name,description from items where magicID=${this.id}`;
        if(sync)
            return Database.QuerySync(query);
        return Database.Query(query);
    }
    public GetAllCardsLite(sync?:boolean):ResultSql|Promise<any>{
        let query = `Select * from cards where magicID=${this.id}`;
        if(sync)
            return Database.QuerySync(query);
        return Database.Query(query);
    }
    public GetAllAvatarsLite(sync?:boolean):ResultSql|Promise<any>{
        let query = `Select * from avatars where magicID=${this.id}`;
        if(sync)
            return Database.QuerySync(query);
        return Database.Query(query);
    }
    public GetAllMissionsLite(sync?:boolean):ResultSql|Promise<any>{
        let query = `Select * from missions where magicID=${this.id}`;
        if(sync)
            return Database.QuerySync(query);
        return Database.Query(query);
    }


    public static GetMagicById(magicId :number):Magic{
        let magic: Magic = null;
        Database.SelectSync<TMagics>({
            Fields:["id","name","description","freeze"],
            from: 'magics',
            where :`id = ${magicId}`
        })
        .ValidDB<MagicsModel[]>(data => magic=new Magic(data[0]))
        return magic;
    }
    public static GetMagicByName(magicName:string):Magic{
        let magic: Magic = null;
        Database.SelectSync<TMagics>({
            Fields:["id","name","description","freeze"],
            from: 'magics',
            where :`name = '${magicName}'`
        })
        .ValidDB<MagicsModel[]>(data => magic=new Magic(data[0]))
        return magic;
    }
    public static GetListMagics():Magic[]{
        let magics :Magic[] = [];
        Database.SelectSync<TMagics>({
            Fields:["id","name","description","freeze"],
            from: 'magics'
        })
        .ValidDB<MagicsModel[]>(data => data.forEach(magic => magics.push(new Magic(magic))))
        return magics;
    }
    public static GetAllByMagic(magic:Magic, sync=false){
        return({
            Items    : magic.GetAllItems(sync),
            Cards    : magic.GetAllCards(sync),
            Avatars  : magic.GetAllAvatars(sync),
            Missions : magic.GetAllMissions(sync),
        })
    }
}