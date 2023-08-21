const sql = require("msnodesqlv8");
module.exports = class Database {
    constructor() {
        this.connection = "server=HAIM\\SQLEXPRESS;Database=ProjectGame;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
    }
    Query(query) {
        return new Promise((resolve, reject) => {
            sql.query(this.connection, query, (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
};
//# sourceMappingURL=connection.js.map