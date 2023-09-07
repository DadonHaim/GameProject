import Database from "@Database/Connection";
import LabyrinthsModel  from "@Database/DbModels/LabyrinthsModel";
import MapsModel        from "@Database/DbModels/MapsModel";

export default class Map extends Database<TMaps>{

    private name        :string ;
    private description :string ;
    private freeze      :boolean;
    private isExist     :boolean;

    public GetId          = ():number   => this.id;            
    public GetName        = ():string   => this.name;            
    public GetDescription = ():string   => this.description;                    
    public IsFreeze       = ():boolean  => this.freeze;            
    public IsExist        = ():boolean  => this.isExist;            

    constructor(obj?:MapsModel){
        super({tableName:"maps"})

        if(obj){
            this.name        = obj.name;      
            this.description = obj.description;              
            this.freeze      = obj.freeze;          
        }
        this.isExist = (this.id && this.name)? true:false;          
    }

    public GetAllLabyrinth():any { //Labyrinth[]{
        return null;
    }


    public static GetMapById(mapID:number):Map{
        let map :Map;
        new Database().QuerySync(`select id,name,description,freeze from maps where id=${mapID}`)
        .ValidDB<MapsModel[]>(data=>{
            map = new Map(data[0])
        })
        return map;
    }
    public static GetMapByName(mapName:string):Map{
        let map :Map;
        new Database().QuerySync(`select id,name,description,freeze from maps where name=${mapName}`)
        .ValidDB<MapsModel[]>(data=>{
            map = new Map(data[0])
        })
        return map;
    }
    public static GetAllMaps():Map[]{
        let map :Map[] = [];
        new Database().QuerySync(`select id,name,description,freeze from maps`)
        .ValidDB<MapsModel[]>(data=>{
            data.forEach(m => map.push(new Map(m)))
        })
        return map;
    }
}