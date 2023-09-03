import DB from "../Database/DB";
import Database from "../Database/connection";
import CategoriesItemsModel from "../Database/models/CategoriesItemsModel";
import Item from "./Item";
import Avatar from "./avatar";

export default class Inventory extends DB<typeof AvatarsItemsModel.type>{

    private avatar : Avatar;
    private allItems : Item[];
    // private allCard : Card[];
    private activeItems : CategoriesItemsModel;

    public GetAllItems    = ():Item[]                 => this.allItems;
    public GetActiveItems = ():CategoriesItemsModel   => this.activeItems;
    public GetAvatar      = ():Avatar                 => this.avatar;

    constructor(avatar:Avatar){
        super({tableName:"avatars_items"})
        this.avatar      = avatar;
        this.allItems    = Item.getAllItemsByAvatar(avatar);
        this.activeItems = this.getActiveItems();
    }

    private getActiveItems() :CategoriesItemsModel{
        let result = new CategoriesItemsModel();
        this.allItems.forEach(item=>{
            if(item.IsActive) 
                result[item.GetCategoryItem()] = item;
        })
        return result;
    }

    public SetActiveItem(obj:{category:string , item:Item}){
        Database.Query(`Update avatars_items Set active=0 Where itemID=${this.activeItems[obj.category].GetId()} and avatarID = ${this.avatar.getId()}`)
        this.activeItems[obj.category] = obj.item;
        Database.Query(`Update avatars_items Set active=1 Where itemID=${obj.item.GetId()} and avatarID = ${this.avatar.getId()}`)
    }

}
