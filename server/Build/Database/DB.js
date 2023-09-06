"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = __importDefault(require("@Database/Connection"));
var DB = /** @class */ (function () {
    function DB(obj) {
        this.id = null;
        this.tableName = obj.tableName;
    }
    DB.prototype.Query = function (query) {
        return Connection_1.default.Query(query);
    };
    DB.prototype.QuerySync = function (query) {
        return Connection_1.default.QuerySync(query);
    };
    DB.prototype.SelectSync = function (_a) {
        var where = _a.where, join = _a.join, on = _a.on, Fields = _a.Fields, And = _a.And, from = _a.from;
        return Connection_1.default.SelectSync({
            where: (where || 'id=' + this.id),
            from: (from || this.tableName),
            Fields: Fields,
            join: join,
            on: on,
            And: And
        });
    };
    return DB;
}());
exports.default = DB;
//# sourceMappingURL=DB.js.map