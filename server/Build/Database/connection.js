"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var msnodesqlv8_1 = __importDefault(require("msnodesqlv8"));
var synchronized_promise_1 = __importDefault(require("synchronized-promise"));
var ResultSql_1 = __importDefault(require("./ResultSql"));
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.Query = function (query) {
        return new Promise(function (T, F) {
            msnodesqlv8_1.default.query(Database.connection, query, function (e, r) { return e ? F(e) : T(r); });
        });
    };
    Database.QuerySync = function (query) {
        return new ResultSql_1.default((0, synchronized_promise_1.default)(Database.Query)(query));
    };
    Database.Select = function (obj) {
        return Database.Query(Database._select(obj));
    };
    Database.SelectSync = function (obj) {
        return Database.QuerySync(Database._select(obj));
    };
    Database._select = function (obj) {
        var _a = Database.protection(obj), Fields = _a.Fields, And = _a.And, from = _a.from, join = _a.join, on = _a.on, where = _a.where;
        Fields = Fields.map(function (field) { return obj.from + "." + field; });
        if (And)
            Fields.push((And.map(function (v) { return join + "." + v; })) || null);
        var result = (join && on) ?
            "SELECT ".concat(Fields.toString(), " FROM ").concat(from, " INNER JOIN ").concat(join, " ON ").concat(on, "  where ").concat(where || "1=1") :
            "SELECT ".concat(Fields.toString(), " FROM ").concat(from, " where ").concat(where);
        return result;
    };
    Database.protection = function (value) {
        if (value)
            return value;
        else
            return null;
    };
    Database.connection = "server=HAIM\\SQLEXPRESS;Database=GameProject;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
    return Database;
}());
exports.default = Database;
//# sourceMappingURL=Connection.js.map