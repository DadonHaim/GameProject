"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../Database/DB"));
const connection_1 = __importDefault(require("../Database/connection"));
const CategoriesItemsModel_1 = __importDefault(require("../Database/models/CategoriesItemsModel"));
const Item_1 = __importDefault(require("./Item"));
class Inventory extends DB_1.default {
    constructor(avatar) {
        super({ tableName: "avatars_items" });
        this.GetAllItems = () => this.allItems;
        this.GetActiveItems = () => this.activeItems;
        this.GetAvatar = () => this.avatar;
        this.avatar = avatar;
        this.allItems = Item_1.default.getAllItemsByAvatar(avatar);
        this.activeItems = this.getActiveItems();
    }
    getActiveItems() {
        let result = new CategoriesItemsModel_1.default();
        this.allItems.forEach(item => {
            if (item.IsActive)
                result[item.GetCategoryItem()] = item;
        });
        return result;
    }
    SetActiveItem(obj) {
        connection_1.default.Query(`Update avatars_items Set active=0 Where itemID=${this.activeItems[obj.category].GetId()} and avatarID = ${this.avatar.getId()}`);
        this.activeItems[obj.category] = obj.item;
        connection_1.default.Query(`Update avatars_items Set active=1 Where itemID=${obj.item.GetId()} and avatarID = ${this.avatar.getId()}`);
    }
}
exports.default = Inventory;
//# sourceMappingURL=Inventory.js.map