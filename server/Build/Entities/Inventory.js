"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("./Item"));
class Inventory extends Item_1.default {
    constructor(avatar) {
        super();
        this.GetAllItems = () => this.allItems;
        this.avatar = avatar;
        this.allItems = Item_1.default.getAllItemsByAvatar(avatar);
    }
}
exports.default = Inventory;
//# sourceMappingURL=Inventory.js.map