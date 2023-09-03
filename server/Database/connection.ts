import Debug from "../Dev/debug";
import Select from "./DBTools/Select";
import Update from "./DBTools/Update";
const sql: any = require("msnodesqlv8");
const sync  = require('synchronized-promise')

export default  class Database{
    public static connection : string = "server=HAIM\\SQLEXPRESS;Database=GameProject;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

    public static Query     = (query:string)               => new Promise((T,F) => sql.query(Database.connection,query,(err,rows) => err? F(err):T(rows)));
    public static QuerySync = (query:string):ResultSql     => {let res = sync(Database.Query)(query);return new ResultSql(res);};

    public static Select<T>     (obj:Select<T>)            {return Database.Query(Database._select(obj));}
    public static SelectSync<T> (obj:Select<T>):ResultSql  {return Database.QuerySync(Database._select(obj));}
    
    public static Update<T>     (obj:Update<T>)           {return Database.Query(Database._update(obj));}
    public static UpdateSync<T> (obj:Update<T>):ResultSql {return Database.QuerySync(Database._update(obj));}

    public static _select(obj:Select<any>):string{
        let fields ,and;
        if(Array.isArray(obj.Fields)){
            fields = Database.protection(obj.Fields.map(field=>`${obj.from? obj.from+"." : ""}${field}`));
            if(obj.And && obj.join)
                fields.push(obj.And.map(v=>`${obj.join+"."}${v}`))
        }
        else
            fields = Database.protection(obj.Fields);

        let form   = Database.protection(obj.from);
        let where  = Database.protection(obj.where) || "1=1";
        let join   = Database.protection(obj.join);
        let on     = Database.protection(obj.on);
        if(join && on){
            Debug(`SELECT ${fields.toString()} FROM ${form} INNER JOIN ${join} ON ${on}`);
            return(`SELECT ${fields.toString()} FROM ${form} INNER JOIN ${join} ON ${on}`);
        }
        Debug(`SELECT ${fields.toString()} FROM ${form} where ${where}`);
        return`SELECT ${fields.toString()} FROM ${form} where ${where}`;
    }
    

    public static _update(obj:Update<any>):string{
        let fields = '';    
        let form      = Database.protection(obj.from);
        let where     = Database.protection(obj.where);
        for(let key in obj.newValues) fields += `${Database.protection(key)} = '${Database.protection(obj.newValues[key])}'`
        Debug(`UPDATE ${form} SET ${fields} where ${where}`);
        return`UPDATE ${form} SET ${fields} where ${where}`;
    }

    public static protection(value : any | null){  //לעדכן בעתיד להגנה על הפרמטרים 
        if(value)
            return value;
        else
            return null;
    }
}



interface IUpdate{
    newValues: any,
    from : string,
    where? : string,
}

class ResultSql{
    public Data;
    public valid = true;

    public constructor(data){
        this.Data=data;
        if(!Array.isArray(this.Data)) 
           this.valid = false;
        else if(!this.Data[0]) 
            this.valid = false;
        else if(!this.Data[0].id) 
            this.valid = false;
        else
            this.valid = true;
    }

    public ValidDB<T>(callback:(data:T)=>void):ResultSql{
        if(this.valid)
            callback(this.Data);
        return this;
    }
    public NoValidDB<T>(callback:(data:T)=>void):ResultSql{
        if(!this.valid)
            callback(this.Data);
        return this;
    }
}