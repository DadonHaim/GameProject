import Database from "@Database/Connection";

export default class DB<Model>{
    protected tableName :listAllTableType;
    protected id        :number|null   = null;

    constructor(obj:IListTableDB){
        this.tableName = obj.tableName;
    }
    protected Query(query:string){
        return Database.Query(query);
    }
    protected QuerySync(query:string){
        return Database.QuerySync(query);
    }

    protected SelectSync<Model = any>({where,join,on,Fields,And,from}:ISelect<Model>){
        return Database.SelectSync({
            where:(where||'id='+this.id),
            from :(from||this.tableName),
            Fields,
            join,
            on,
            And
        })   
    }
}

interface IListTableDB{
    tableName : listAllTableType 
}


