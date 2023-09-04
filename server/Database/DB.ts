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
    
    protected SelectSync({where,join,on,Fields,And,from}:ISelect<Model>){
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


