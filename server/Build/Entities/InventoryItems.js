"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../Database/DB"));
class InventoryItems extends DB_1.default {
    constructor() {
        super({ tableName: "avatars_items" });
    }
    getAllItems() {
        // this.SelectSync([])
        return [null];
    }
}
exports.default = InventoryItems;
//# sourceMappingURL=InventoryItems.js.map