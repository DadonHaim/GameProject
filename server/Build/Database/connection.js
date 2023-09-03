"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("../Dev/debug"));
const sql = require("msnodesqlv8");
const sync = require('synchronized-promise');
class Database {
    static Select(obj) { return Database.Query(Database._select(obj)); }
    static SelectSync(obj) { return Database.QuerySync(Database._select(obj)); }
    static _select(obj) {
        let fields, and;
        if (Array.isArray(obj.Fields)) {
            fields = Database.protection(obj.Fields.map(field => `${obj.from ? obj.from + "." : ""}${field}`));
            if (obj.And && obj.join)
                fields.push(obj.And.map(v => `${obj.join + "."}${v}`));
        }
        else
            fields = Database.protection(obj.Fields);
        let form = Database.protection(obj.from);
        let where = Database.protection(obj.where) || "1=1";
        let join = Database.protection(obj.join);
        let on = Database.protection(obj.on);
        if (join && on) {
            (0, debug_1.default)(`SELECT ${fields.toString()} FROM ${form} INNER JOIN ${join} ON ${on}`);
            return (`SELECT ${fields.toString()} FROM ${form} INNER JOIN ${join} ON ${on}`);
        }
        (0, debug_1.default)(`SELECT ${fields.toString()} FROM ${form} where ${where}`);
        return `SELECT ${fields.toString()} FROM ${form} where ${where}`;
    }
    static _update(obj) {
        let fields = '';
        let form = Database.protection(obj.from);
        let where = Database.protection(obj.where);
        for (let key in obj.newValues)
            fields += `${Database.protection(key)} = '${Database.protection(obj.newValues[key])}'`;
        (0, debug_1.default)(`UPDATE ${form} SET ${fields} where ${where}`);
        return `UPDATE ${form} SET ${fields} where ${where}`;
    }
    static protection(value) {
        if (value)
            return value;
        else
            return null;
    }
}
Database.connection = "server=HAIM\\SQLEXPRESS;Database=GameProject;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
Database.Query = (query) => new Promise((T, F) => sql.query(Database.connection, query, (err, rows) => err ? F(err) : T(rows)));
Database.QuerySync = (query) => { let res = sync(Database.Query)(query); return new ResultSql(res); };
Database.Update = (obj) => Database.Query(Database._update(obj));
Database.UpdateSync = (obj) => Database.QuerySync(Database._update(obj));
exports.default = Database;
class ResultSql {
    constructor(data) {
        this.valid = true;
        this.Data = data;
        if (!Array.isArray(this.Data))
            this.valid = false;
        else if (!this.Data[0])
            this.valid = false;
        else if (!this.Data[0].id)
            this.valid = false;
        else
            this.valid = true;
    }
    ValidDB(callback) {
        if (this.valid)
            callback(this.Data);
        return this;
    }
    NoValidDB(callback) {
        if (!this.valid)
            callback(this.Data);
        return this;
    }
}
//# sourceMappingURL=connection.js.map