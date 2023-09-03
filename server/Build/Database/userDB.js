"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
class DB {
    constructor(tableName) {
        this.id = null;
        this.tableName = tableName;
    }
    SelectSync(Fields) {
        if (this.id != null)
            return connection_1.default.SelectSync({
                fields: Fields,
                from: this.tableName,
                where: `id=${this.id}`,
            });
    }
    UpdateSync(obj) {
        if (this.id != null)
            return connection_1.default.UpdateSync({
                newValues: obj,
                from: this.tableName,
                where: `id=${this.id}`,
            });
    }
}
exports.default = DB;
//# sourceMappingURL=userDB.js.map