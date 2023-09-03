import DB from "../Database/DB";
import Database from "../Database/connection";
import Price from "../Database/jsonModels/price.json";
import sale from "../Database/jsonModels/sale.json";
import UpgradeItems from "../Database/jsonModels/upgradeItems.json";
import AvatarsModel from "../Database/models/AvatarsModel";
import ItemsModel from "../Database/models/ItemsModel";
import Avatar from "./avatar";
import Magic from "./magic";
import User from "./user";

export default class Item extends DB<typeof ItemsModel.type>{
    
    //#region Fields
        private name         : string;         //{get; set;}        
        private description  : string;         //{get; set;}        
        private freeze       : boolean;        //{get;}        
        private price        : Price;          //{get; set;}        
        private color        : string;         //{get; set;}        
        private sale         : sale;           //{get; set;}        
        private upgrade      : UpgradeItems;   //{get; set;}                
        private categoryItem : string;         //{get;}        
        
    //#endregion
    
    //#region Flags
        private isExist  :boolean = false;
        private isActive :boolean = false;
    //#endregion
        
    //#region Refferences
        private magic        : Magic;

    //#endregion

    //#region Gets
        public GetId           = ():number       => this.id         ;
        public GetName         = ():string       => this.name         ;
        public GetDescription  = ():string       => this.description  ;
        public GetFreeze       = ():boolean      => this.freeze       ;
        public GetPrice        = ():Price        => this.price        ;
        public GetColor        = ():string       => this.color        ;
        public GetSale         = ():sale         => this.sale         ;
        public GetUpgrade      = ():UpgradeItems => this.upgrade      ;
        public GetCategoryItem = ():string       => this.categoryItem ;
        public IsExist         = ():boolean      => this.isExist      ;
        public IsActive        = ():boolean      => this.isActive     ;
    //#endregion

    //#region Sets

    //#endregion

    //#region Method

        public constructor(obj?:ItemsModel){
            super({tableName:"items"});

            if(obj && obj as ItemsModel){ 
                this.id           = (obj.id                 ) ? obj.id                          :null;
                this.name         = (obj.name               ) ? obj.name                        :null;
                this.description  = (obj.description        ) ? obj.description                 :null;
                this.freeze       = (obj.freeze             ) ? obj.freeze                      :null;
                this.price        = (obj.price              ) ? obj.price                       :null;
                this.color        = (obj.color              ) ? obj.color                       :null;
                this.sale         = (obj.sale               ) ? new sale(obj.sale)              :null;
                this.upgrade      = (obj.upgrade            ) ? new UpgradeItems(obj.upgrade)   :null;
                this.categoryItem = (obj.categoryItem       ) ? obj.categoryItem                :null;
                this.magic        = (obj.magicID            ) ? Magic.getMagicById(obj.magicID) :null;
                this.isActive     = (obj.active             ) ? true                            :false;
                this.isExist      = (this.id && !this.freeze) ? true                            :false;
            }
        }
    //#endregion

    //#region statics
        public static getAllItemsByAvatar(avatar:Avatar) : Item[]{
            let items : Item[] = [];
            Database.SelectSync<typeof ItemsModel.type>({
                Fields: ["id","name","description","freeze","price","color","sale","upgrade","categoryItem"],
                And: ["active"],
                from :"items",
                where: `id = ${avatar.getId()}`,
                join :"avatars_items",
                on: `avatars_items.avatarID = ${avatar.getId()} and avatars_items.itemID = items.id`
            })
            .ValidDB<ItemsModel[]>(data=>{
                data.forEach(item =>items.push(new Item(item)))
            })
            .NoValidDB(err=>{

            })
            return items;
        }
    //#endregion

}
