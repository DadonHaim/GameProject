import Debug     from "@Dev/debug";
import sql       from "msnodesqlv8";
import sync      from "synchronized-promise";
import ResultSql from "./ResultSql";

export default  class Database{
    public static connection : string = "server=HAIM\\SQLEXPRESS;Database=GameProject;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
    public static Query(query:string){
        return new Promise((T,F)=>{
            sql.query(Database.connection,query,(e,r)=>e?F(e):T(r))
        })
    }
    public static QuerySync(query:string):ResultSql{
        return new ResultSql(sync(Database.Query)(query));
    }

    public static Select<T=any>(obj:ISelect<T>){
        return Database.Query(Database._select(obj));
    }
    public static SelectSync<Table=any>(obj:ISelect<Table>):ResultSql{
        return Database.QuerySync(Database._select(obj));
    }
    
    public static _select(obj:ISelect):string{
        let {Fields,And,from,join,on,where} = Database.protection<ISelect>(obj);
        Fields = Fields.map( field => obj.from +"."+field );
        Fields.push( (And.map(v=>join+"."+v)) ||null );
        let result = (join && on)?
            `SELECT ${Fields.toString()} FROM ${from} INNER JOIN ${join} ON ${on}  where ${where ||"1=1"}` :
            `SELECT ${Fields.toString()} FROM ${from} where ${where}`;
        Debug(result);
        return result;
    }
    
    public static protection<T=any>(value : any | null):T{  //לעדכן בעתיד להגנה על הפרמטרים 
        if(value)
            return value;
        else
            return null;
    }
}


