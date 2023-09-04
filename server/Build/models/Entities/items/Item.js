"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../Database/DB"));
const connection_1 = __importDefault(require("../Database/connection"));
const sale_json_1 = __importDefault(require("../Database/jsonModels/sale.json"));
const upgradeItems_json_1 = __importDefault(require("../Database/jsonModels/upgradeItems.json"));
const magic_1 = __importDefault(require("./magic"));
class Item extends DB_1.default {
    //#endregion
    //#region Sets
    //#endregion
    //#region Method
    constructor(obj) {
        super({ tableName: "items" });
        //#endregion
        //#region Flags
        this.isExist = false;
        this.isActive = false;
        //#endregion
        //#region Gets
        this.GetId = () => this.id;
        this.GetName = () => this.name;
        this.GetDescription = () => this.description;
        this.GetFreeze = () => this.freeze;
        this.GetPrice = () => this.price;
        this.GetColor = () => this.color;
        this.GetSale = () => this.sale;
        this.GetUpgrade = () => this.upgrade;
        this.GetCategoryItem = () => this.categoryItem;
        this.IsExist = () => this.isExist;
        this.IsActive = () => this.isActive;
        if (obj && obj) {
            this.id = (obj.id) ? obj.id : null;
            this.name = (obj.name) ? obj.name : null;
            this.description = (obj.description) ? obj.description : null;
            this.freeze = (obj.freeze) ? obj.freeze : null;
            // this.price        = (obj.price              ) ? obj.price                       :null;
            this.color = (obj.color) ? obj.color : null;
            this.sale = (obj.sale) ? new sale_json_1.default(obj.sale) : null;
            this.upgrade = (obj.upgrade) ? new upgradeItems_json_1.default(obj.upgrade) : null;
            this.categoryItem = (obj.categoryItem) ? obj.categoryItem : null;
            this.magic = (obj.magicID) ? magic_1.default.getMagicById(obj.magicID) : null;
            this.isActive = (obj.active) ? true : false;
            this.isExist = (this.id && !this.freeze) ? true : false;
        }
    }
    //#endregion
    //#region statics
    static getAllItemsByAvatar(avatar) {
        let items = [];
        connection_1.default.SelectSync({
            Fields: ["id", "name", "description", "freeze", "price", "color", "sale", "upgrade", "categoryItem"],
            And: ["active"],
            from: "items",
            where: `id = ${avatar.getId()}`,
            join: "avatars_items",
            on: `avatars_items.avatarID = ${avatar.getId()} and avatars_items.itemID = items.id`
        })
            .ValidDB(data => {
            data.forEach(item => items.push(new Item(item)));
        })
            .NoValidDB(err => {
        });
        return items;
    }
}
exports.default = Item;
//# sourceMappingURL=Item.js.map