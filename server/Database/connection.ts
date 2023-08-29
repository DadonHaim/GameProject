const sql: any = require("msnodesqlv8");



module.exports = class Database{
    public static connection : string = "server=HAIM\\SQLEXPRESS;Database=ProjectGame;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

    public constructor(){}

    public static Query(query:string){
        return new Promise((resolve , reject)=>{
            sql.query(Database.connection, query, (err, rows) => {
                if(err) reject(err)
                else resolve(rows)
            });
        })
    }

    public static Select(obj:ISelect){
        let fields = '';
        let form   = Database.protection(obj.from);
        let id     = (obj.id)? `id=${Database.protection(obj.id)}` : "0=1 ";
        let where  = Database.protection(obj.where) ||" 0=1 ";

        if(Array.isArray(obj.fields)){
            obj.fields.forEach( v=> fields+= `${Database.protection(v)},`);
            fields = fields.substring(0,fields.length-1);
        }
        else
            fields = Database.protection(obj.fields);

            console.log(`SELECT ${fields} FROM ${form} where ${id} or ${where}`)
        return Database.Query(`SELECT ${fields} FROM ${form} where ${id} or ${where}`);
    }

    public static Update(obj:IUpdate){

    }




    public static protection(value : any){  //לעדכן בעתיד להגנה על הפרמטרים 
        return value;
    }
}


interface ISelect{
    fields: string | string[],
    from : string,
    id? : number,
    where? : string,
}



interface IUpdate{
    
}


