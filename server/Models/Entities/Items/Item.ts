import DB               from "@Database/DB";
import Database         from "@Database/Connection";
import Price            from "@JsonModels/price.json";
import sale             from "@JsonModels/sale.json";
import UpgradeItems     from "@JsonModels/upgradeItems.json";
import ItemsModel       from "@DbModels/ItemsModel";
import Avatar           from "@Entities/Avatar/Avatar";
import Magic            from "@Categories/Magic";

export default class Item extends DB<TItems>{
    
    //#region Fields
        private name            : string;         //{get; set;}        
        private description     : string;         //{get; set;}        
        private freeze          : boolean;        //{get;}        
        private price           : Price;          //{get; set;}        
        private color           : string;         //{get; set;}        
        private sale            : sale;           //{get; set;}        
        private upgrade         : UpgradeItems;   //{get; set;}                
        private categoryItem    : string;         //{get;}        
        private rank            : number;         
        private minAvatarLevel  :number;
        private maxUpgrade      :number;
        
    //#endregion
    
    //#region Flags
        private isExist  :boolean = false;
        private isActive :boolean = false;
    //#endregion
        
    //#region Refferences
        private magic        : Magic;
        private avatar       : Avatar;

    //#endregion

    //#region Gets
        public GetId              = ():number       => this.id              ;
        public GetName            = ():string       => this.name            ;
        public GetDescription     = ():string       => this.description     ;
        public GetFreeze          = ():boolean      => this.freeze          ;
        public GetPrice           = ():Price        => this.price           ;
        public GetColor           = ():string       => this.color           ;
        public GetSale            = ():sale         => this.sale            ;
        public GetUpgrade         = ():UpgradeItems => this.upgrade         ;
        public GetCategoryItem    = ():string       => this.categoryItem    ;
        public GetRank            = ():number       => this.rank            ;
        public GetMinAvatarLevel  = ():number       => this.minAvatarLevel  ;
        public GetAvatar          = ():Avatar       => this.avatar          ;
        public GetMagic           = ():Magic        => this.magic           ;
        public GetMaxUpgrade      = ():number       => this.maxUpgrade      ;
        public IsExist            = ():boolean      => this.isExist         ;
        public IsActive           = ():boolean      => this.isActive        ;
    //#endregion

    //#region Sets

    //#endregion

    //#region Method

    public RankUp(num:number = 1){
        if(!this.avatar || !this.id) return;
        if(this.rank<this.maxUpgrade){
            this.rank +=num;
            this.Query(`Update avatars_items Set rank=${this.rank} Where itemID=${this.id} and avatarID=${this.avatar.GetId()}`);
        }
    }

        public constructor(obj?:ItemsModel, avatar?:Avatar){
            super({tableName:"items"});

            if(obj && obj as ItemsModel){ 
                this.id               = (obj.id                 ) ? obj.id                          :null;
                this.name             = (obj.name               ) ? obj.name                        :null;
                this.description      = (obj.description        ) ? obj.description                 :null;
                this.freeze           = (obj.freeze             ) ? obj.freeze                      :null;
                this.color            = (obj.color              ) ? obj.color                       :null;
                this.price            = (obj.price              ) ? new Price(obj.price)            :null;
                this.sale             = (obj.sale               ) ? new sale(obj.sale)              :null;
                this.upgrade          = (obj.upgrade            ) ? new UpgradeItems(obj.upgrade)   :null;
                this.categoryItem     = (obj.categoryItem       ) ? obj.categoryItem                :null;
                this.minAvatarLevel   = (obj.minAvatarLevel     ) ? obj.minAvatarLevel              :null;
                this.magic            = (obj.magicID            ) ? Magic.GetMagicById(obj.magicID) :null;
                this.maxUpgrade       = (obj.maxUpgrade         ) ? obj.maxUpgrade                  :null;
                this.isActive         = (obj.active             ) ? true                            :false;
                this.isExist          = (this.id && !this.freeze) ? true                            :false;
            }
            if(avatar)
                this.SelectSync<TAvatarsItems>({
                    Fields : ["rank","active"],
                    from   : "avatars_items",
                    where  : `cardID = ${this.id} and avatarID=${avatar.GetId()}`
                })
                .ValidDB(data=>{
                    this.avatar   = avatar;
                    this.rank     = data[0].rank;
                    this.isActive = data[0].active;
                })
                .NoValidDB(()=>{
                    this.avatar = null;
                })
        }
    //#endregion

    //#region statics
        public static getAllItemsByAvatar(avatar:Avatar) : Item[]{
            let items : Item[] = [];
            Database.SelectSync<TItems>({
                Fields : ["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
                And    : ["active"],
                from   : "items",
                where  : `id = ${avatar.GetId()}`,
                join   : "avatars_items",
                on     : `avatars_items.avatarID = ${avatar.GetId()} and avatars_items.itemID = items.id`
            })
            .ValidDB<ItemsModel[]>(data=>{
                data.forEach(item =>items.push(new Item(item)))
            })
            return items;
        }
    //#endregion


    public static GetItemById(itemID:number):Item{
        let item: Item = null;
        Database.SelectSync<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from: 'items',
            where :`id = ${itemID}`
        })
        .ValidDB<ItemsModel[]>(data => item = new Item(data[0]))
        return item;
    }

    public static GetItemByName(itemName:string):Item{
        let item: Item = null;
        Database.SelectSync<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from: 'items',
            where :`name = ${itemName}`
        })
        .ValidDB<ItemsModel[]>(data => item = new Item(data[0]))
        return item;
    }
  





    public static GetItemsByAvatar(avatar:Avatar):Promise<any>{
        return Database.Select<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from:"items",
            join:"avatars_items",
            on: `avatar_items.avatarID = ${avatar.GetId()}`,
        })
    }

    public static GetItemsByAvatarSync(avatar:Avatar):Item[]{
        let items :Item[] = [];
        Database.SelectSync<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from:"items",
            join:"avatars_items",
            on: `avatar_items.avatarID = ${avatar.GetId()}`,
        })
        .ValidDB<ItemsModel[]>(data=>{
            data.forEach(i => items.push(new Item(i)))
        })
        return items;
    }

    public static GetCardsByMinAvatarLeven(minLeven:number):Promise<any>{
        return Database.Select<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from:"items",
            join:"avatars_items",
            on: `avatar_items.minAvatarLevel= ${minLeven}`,
        })
    }

    public static GetCardsByMinAvatarLevenSync(minLeven:number):Item[]{
        let items :Item[] = [];
        Database.SelectSync<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from:"items",
            join:"avatars_items",
            on: `avatar_items.minAvatarLevel= ${minLeven}`,
        })
        .ValidDB<ItemsModel[]>(data=>{
            data.forEach(i => items.push(new Item(i)))
        })
        return items;
    }

    public static GetItemsByMagic(magic:Magic):Promise<any>{
        return Database.Select<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from:"items",
            where:`magicID=${magic.GetId()}`
        })
    }
    public static GetItemsByMagicSync(magic:Magic):Item[]{
        let items :Item[] = [];
        Database.SelectSync<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from:"items",
            where:`magicID=${magic.GetId()}`
        })
        .ValidDB<ItemsModel[]>(data=>{
            data.forEach(i => items.push(new Item(i)))
        })
        return items;
    }

    public static GetItemsByType(type:string):Promise<any>{
        return Database.Select<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from:"items",
            where:`type=${type}`
        })
    }
    public static GetItemsByTypeSync(type:string):Item[]{
        let items :Item[] = [];
        Database.SelectSync<TItems>({
            Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
            from:"items",
            where:`type=${type}`
        })
        .ValidDB<ItemsModel[]>(data=>{
            data.forEach(i => items.push(new Item(i)))
        })
        return items;
    }
}
