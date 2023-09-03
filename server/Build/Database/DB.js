"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
class DB {
    constructor(obj) {
        this.id = null;
        this.tableName = obj.tableName;
    }
    SelectSync(obj) {
        let where = obj.where || "id =" + this.id;
        // if(this.id != null) 
        if (obj.join && obj.on)
            return connection_1.default.SelectSync({ Fields: obj.Fields, from: obj.from || this.tableName, join: obj.join, on: obj.on, where: obj.where || null });
        return connection_1.default.SelectSync({ Fields: obj.Fields, from: obj.from || this.tableName, where: where });
    }
    UpdateSync(obj) {
        // if(this.id != null)
        return connection_1.default.UpdateSync({
            newValues: obj,
            from: this.tableName,
            where: `id=${this.id}`,
        });
    }
}
exports.default = DB;
//# sourceMappingURL=DB.js.map