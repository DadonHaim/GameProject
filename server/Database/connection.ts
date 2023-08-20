const sql: any = require("msnodesqlv8");




module.exports = class Database{
    private connection : string = "server=HAIM\\SQLEXPRESS;Database=ProjectGame;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

    public constructor(){
    }

    public Query(query:string){
        return new Promise((resolve , reject)=>{
            sql.query(this.connection, query, (err, rows) => {
                if(err) reject(err)
                else resolve(rows)
            });
        })
    }
}


