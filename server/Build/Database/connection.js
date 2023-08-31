"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("msnodesqlv8");
const sync = require('synchronized-promise');
class Database {
    static _select(obj) {
        let fields = '';
        let form = Database.protection(obj.from);
        let id = (obj.id) ? `id=${Database.protection(obj.id)}` : "0=1 ";
        let where = Database.protection(obj.where) || " 0=1 ";
        if (Array.isArray(obj.fields)) {
            obj.fields.forEach(v => fields += `${Database.protection(v)},`);
            fields = fields.substring(0, fields.length - 1);
        }
        else
            fields = Database.protection(obj.fields);
        return `SELECT ${fields} FROM ${form} where ${id} or ${where}`;
    }
    static Update(obj) { }
    static protection(value) {
        return value;
    }
}
Database.connection = "server=HAIM\\SQLEXPRESS;Database=ProjectGame;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
Database.Query = (query) => new Promise((resolve, reject) => sql.query(Database.connection, query, (err, rows) => err ? reject(err) : resolve(rows)));
Database.QuerySync = (query) => sync(Database.Query)(query);
Database.Select = (obj) => Database.Query(Database._select(obj));
Database.SelectSync = (obj) => Database.QuerySync(Database._select(obj));
exports.default = Database;
//# sourceMappingURL=connection.js.map