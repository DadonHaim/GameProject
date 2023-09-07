import Database         from "@Database/Connection";
import Price            from "@JsonModels/price.json";
import sale             from "@JsonModels/sale.json";
import UpgradeItems     from "@JsonModels/upgradeItems.json";
import ItemsModel       from "@DbModels/ItemsModel";
import Avatar           from "@Entities/Avatar/Avatar";
import Magic            from "@Categories/Magic";
import AvatarsModel from "@Database/DbModels/AvatarsModel";
import Card from "@Entities/Card/Card";

export default class Item extends Database<TItems>{
    
    //#region Fields
        private name            : string        |null  = null;   
        private description     : string        |null  = null;   
        private freeze          : boolean       |null  = null;   
        private price           : Price         |null  = null;   
        private color           : string        |null  = null;   
        private sale            : sale          |null  = null;   
        private upgrade         : UpgradeItems  |null  = null;   
        private categoryItem    : string        |null  = null;   
        private rank            : number        |null  = null;   
        private minAvatarLevel  : number        |null  = null;       
        private maxUpgrade      : number        |null  = null;       
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


    //#region Method

    public RankUp(num:number = 1){
        if(!this.avatar||!this.id) return;
        if(this.rank < this.maxUpgrade){
            this.rank +=num;
            this.Update<AvatarsItemsModel>({
                update:{rank:this.rank},
                from:"avatars_items",
                where:`itemID=${this.id} and avatarID=${this.avatar.GetId()}`
            })
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
                    where  : `itemID = ${this.id} and avatarID=${avatar.GetId()}`
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
        public static getAllItemsByAvatar(avatar:Avatar) : Promise<Item[]>{
            return new Promise((resolve,reject)=>{
                let items : Item[] = [];
                new Database().SelectSync<TItems>({
                    Fields : ["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
                    And    : ["active"],
                    from   : "items",
                    where  : `id = ${avatar.GetId()}`,
                    join   : "avatars_items",
                    on     : `avatars_items.avatarID = ${avatar.GetId()} and avatars_items.itemID = items.id`
                })
                .ValidDB<ItemsModel[]>(data=>{
                    data.forEach(item =>items.push(new Item(item)));
                    resolve(items)
                })
            })
        }
        public static GetItemById(itemID:number):Item{
            let item: Item = null;
            new Database().SelectSync<TItems>({
                Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
                from: 'items',
                where :`id = ${itemID}`
            })
            .ValidDB<ItemsModel[]>(data => item = new Item(data[0]))
            return item;
        }
        public static GetItemByName(itemName:string):Item{
            let item: Item = null;
            new Database().SelectSync<TItems>({
                Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
                from: 'items',
                where :`name = ${itemName}`
            })
            .ValidDB<ItemsModel[]>(data => item = new Item(data[0]))
            return item;
        }
        public static GetItemsByAvatar(avatar:Avatar):Promise<Item[]>{
            return new Promise((resolve,reject)=>{
                let items :Item[] =[];
                new Database().SelectSync<TItems>({ 
                    Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
                    from:"items",
                    join:"avatars_items",
                    on: `avatar_items.avatarID = ${avatar.GetId()}`,
                }).ValidDB<ItemsModel[]>(data=>{
                    data.forEach(item=> items.push(new Item(item)))
                    resolve(items)
                })
            })
        }
        public static GetItemsByAvatarSync(avatar:Avatar):Item[]{
            let items :Item[] = [];
            new Database().SelectSync<TItems>({
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
        public static GetItemsByMagic(magic:Magic):Promise<Item[]>{
            return new Promise((resolve,reject)=>{
                let items :Item[] = [];
                new Database().SelectSync<TItems>({
                    Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
                    from:"items",
                    where:`magicID=${magic.GetId()}`
                })
                .ValidDB<ItemsModel[]>(data=>{
                    data.forEach(i => items.push(new Item(i)))
                    resolve(items)
                })
            })
        }
        public static GetItemsByMagicSync(magic:Magic):Item[]{
            let items :Item[] = [];
            new Database().SelectSync<TItems>({
                Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
                from:"items",
                where:`magicID=${magic.GetId()}`
            })
            .ValidDB<ItemsModel[]>(data=>{
                data.forEach(i => items.push(new Item(i)))
            })
            return items;
        }
        public static GetItemsByType(type:string):Promise<Item[]>{
            return new Promise((resolve,reject)=>{
                let items :Item[] = [];
                new Database().SelectSync<TItems>({
                    Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
                    from:"items",
                    where:`type=${type}`
                })
                .ValidDB<ItemsModel[]>(data=>{
                    data.forEach(i => items.push(new Item(i)))
                    resolve(items)
                })
            })
        }
        public static GetItemsByTypeSync(type:string):Item[]{
            let items :Item[] = [];
            new Database().SelectSync<TItems>({
                Fields:["id","name","description","freeze","price","color","sale","upgrade","categoryItem","minAvatarLevel","maxUpgrade"],
                from:"items",
                where:`type=${type}`
            })
            .ValidDB<ItemsModel[]>(data=>{
                data.forEach(i => items.push(new Item(i)))
            })
            return items;
        }
     //#endregion
}
