import DB from "../Database/DB"
import Database from "../Database/connection";
import MagicsModel from "../Database/models/MagicsModel";

export default class Magic extends DB<typeof MagicsModel.type>{
    private name        : string;
    private description : string;
    private freeze      : boolean;

    private isExist:boolean = false;

    constructor(obj?: MagicsModel){
        super({tableName:"magics"})

        if(obj && obj as MagicsModel){
            this.id          = (obj.id         )? obj.id         :null;      
            this.name        = (obj.name       )? obj.name       :null;  
            this.description = (obj.description)? obj.description:null;  
            this.freeze      = (obj.freeze     )? obj.freeze     :null;  
            if(this.id && this.name)
                this.isExist     = true;
        }
    }

    public static getMagicById(magicId : number):Magic{
        let magic: Magic = null;
        Database.SelectSync<typeof MagicsModel.type>({
            Fields:["id","name","description","freeze"],
            from: 'magics',
            where :`id = ${magicId}`
        })
        .ValidDB<MagicsModel[]>(data=>{
            magic = new Magic(data[0])
        })
        .NoValidDB<any>(err=>{

        })
        return magic;
    }

}