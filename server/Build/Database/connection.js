var _a;
const sql = require("msnodesqlv8");
module.exports = (_a = class Database {
        constructor() { }
        static Query(query) {
            return new Promise((resolve, reject) => {
                sql.query(Database.connection, query, (err, rows) => {
                    if (err)
                        reject(err);
                    else
                        resolve(rows);
                });
            });
        }
        static Select(obj) {
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
            console.log(`SELECT ${fields} FROM ${form} where ${id} or ${where}`);
            return Database.Query(`SELECT ${fields} FROM ${form} where ${id} or ${where}`);
        }
        static Update(obj) {
        }
        static protection(value) {
            return value;
        }
    },
    _a.connection = "server=HAIM\\SQLEXPRESS;Database=ProjectGame;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}",
    _a);
//# sourceMappingURL=connection.js.map