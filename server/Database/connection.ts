import Debug     from "../Dev/debug";
import sql       from "msnodesqlv8";
import sync      from "synchronized-promise";
import ResultSql from "./ResultSql";

export default  class Database<Model=any>{
    protected tableName :listAllTableType = "none";
    protected id        :number|null   = null;
    public static connection : string = "server=HAIM\\SQLEXPRESS;Database=GameProject;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";


    constructor(obj?:IListTableDB){
        if(obj)
            this.tableName = obj.tableName;
    }

    public Query(query:string){
        Debug(query)
        return new Promise((T,F)=>{
            sql.query(Database.connection,Database.protection(query),(e,r)=>e?F(e):T(r))
        })
    }
    public QuerySync(query:string):ResultSql{
        return new ResultSql(sync(this.Query)(query));
    }

    public Select<T=any>(obj:ISelect<T>){
        return this.Query(this._select(obj));
    }
    public SelectSync<Table=any>(obj:ISelect<Table>):ResultSql{
        return this.QuerySync(this._select(obj));
    }


    public Update<T=any>(obj:IUpdate<T>){
        return this.Query(this._update(obj));
    }
    public UpdateSync<Table=any>(obj:IUpdate<Table>):ResultSql{
        return this.QuerySync(this._update(obj));
    }

    public Insert<T=any>(obj:IInsert<T>){
        return this.Query(this._insert(obj));
    }
    public InsertSync<Table=any>(obj:IInsert<Table>):ResultSql{
        return this.QuerySync(this._insert(obj));
    }
    public Delete<T=any>(obj:IDelete<T>){
        return this.Query(this._delete(obj));
    }
    public DeleteSync<Table=any>(obj:IDelete<Table>):ResultSql{
        return this.QuerySync(this._delete(obj));
    }

    
    public _select({Fields,And,from,join,on,where}:ISelect):string{
        from = from||this.tableName;
        Fields = Fields.map( field => from +"."+field );
        if(And && join)  
            Fields.push(And.map(v=>join+"."+v));
        let res =(join && on)?
            `SELECT ${Fields.toString()} FROM ${from} INNER JOIN ${join} ON ${on}  where ${where ||'id='+this.id}` :
            `SELECT ${Fields.toString()} FROM ${from} where ${where||'id='+this.id}`;
        Debug(res)
        return res
    }
    public _update({from,update,where}:IUpdate){
        let set :string[] = []
        for(let key in update)
            set.push(`${key}='${update[key]}'`)
        Debug(`Update ${from||this.tableName} SET ${set.toString()} where ${where||'id='+this.id}`)
        return `Update ${from||this.tableName} SET ${set.toString()} where ${where||'id='+this.id}`
    }
    public _insert({from,insert}:IInsert){
        let keys :string[] = []
        let vals :string[] =[]
        for(let key in insert){
            keys.push(key)
            vals.push(`'${insert[key]}'`)
        }
        Debug(`Insert Into ${from||this.tableName} (${keys.toString()}) Values (${vals})`)
        return `Insert Into ${from||this.tableName} (${keys.toString()}) Values (${vals})`
    }
    public _delete({from,where}:IDelete){
        Debug(`Delete From ${from||this.tableName} where ${where||'id='+this.id}`)
        return `Delete From ${from||this.tableName} where ${where||'id='+this.id}`
    }


    public static protection<T=any>(value : any | null):T{  //לעדכן בעתיד להגנה על הפרמטרים 
        if(value)
            return value;
        else
            return null;
    }
}



interface IListTableDB{
    tableName : listAllTableType 
}


