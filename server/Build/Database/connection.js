"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("../Dev/debug"));
var msnodesqlv8_1 = __importDefault(require("msnodesqlv8"));
var synchronized_promise_1 = __importDefault(require("synchronized-promise"));
var ResultSql_1 = __importDefault(require("./ResultSql"));
var Database = /** @class */ (function () {
    function Database(obj) {
        this.tableName = "none";
        this.id = null;
        if (obj)
            this.tableName = obj.tableName;
    }
    Database.prototype.Query = function (query) {
        (0, debug_1.default)(query);
        return new Promise(function (T, F) {
            msnodesqlv8_1.default.query(Database.connection, Database.protection(query), function (e, r) { return e ? F(e) : T(r); });
        });
    };
    Database.prototype.QuerySync = function (query) {
        return new ResultSql_1.default((0, synchronized_promise_1.default)(this.Query)(query));
    };
    Database.prototype.Select = function (obj) {
        return this.Query(this._select(obj));
    };
    Database.prototype.SelectSync = function (obj) {
        return this.QuerySync(this._select(obj));
    };
    Database.prototype.Update = function (obj) {
        return this.Query(this._update(obj));
    };
    Database.prototype.UpdateSync = function (obj) {
        return this.QuerySync(this._update(obj));
    };
    Database.prototype.Insert = function (obj) {
        return this.Query(this._insert(obj));
    };
    Database.prototype.InsertSync = function (obj) {
        return this.QuerySync(this._insert(obj));
    };
    Database.prototype.Delete = function (obj) {
        return this.Query(this._delete(obj));
    };
    Database.prototype.DeleteSync = function (obj) {
        return this.QuerySync(this._delete(obj));
    };
    Database.prototype._select = function (_a) {
        var Fields = _a.Fields, And = _a.And, from = _a.from, join = _a.join, on = _a.on, where = _a.where;
        from = from || this.tableName;
        Fields = Fields.map(function (field) { return from + "." + field; });
        if (And && join)
            Fields.push(And.map(function (v) { return join + "." + v; }));
        var res = (join && on) ?
            "SELECT ".concat(Fields.toString(), " FROM ").concat(from, " INNER JOIN ").concat(join, " ON ").concat(on, "  where ").concat(where || 'id=' + this.id) :
            "SELECT ".concat(Fields.toString(), " FROM ").concat(from, " where ").concat(where || 'id=' + this.id);
        (0, debug_1.default)(res);
        return res;
    };
    Database.prototype._update = function (_a) {
        var from = _a.from, update = _a.update, where = _a.where;
        var set = [];
        for (var key in update)
            set.push("".concat(key, "='").concat(update[key], "'"));
        (0, debug_1.default)("Update ".concat(from || this.tableName, " SET ").concat(set.toString(), " where ").concat(where || 'id=' + this.id));
        return "Update ".concat(from || this.tableName, " SET ").concat(set.toString(), " where ").concat(where || 'id=' + this.id);
    };
    Database.prototype._insert = function (_a) {
        var from = _a.from, insert = _a.insert;
        var keys = [];
        var vals = [];
        for (var key in insert) {
            keys.push(key);
            vals.push("'".concat(insert[key], "'"));
        }
        (0, debug_1.default)("Insert Into ".concat(from || this.tableName, " (").concat(keys.toString(), ") Values (").concat(vals, ")"));
        return "Insert Into ".concat(from || this.tableName, " (").concat(keys.toString(), ") Values (").concat(vals, ")");
    };
    Database.prototype._delete = function (_a) {
        var from = _a.from, where = _a.where;
        (0, debug_1.default)("Delete From ".concat(from || this.tableName, " where ").concat(where || 'id=' + this.id));
        return "Delete From ".concat(from || this.tableName, " where ").concat(where || 'id=' + this.id);
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