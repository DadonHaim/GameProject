import DB           from "@Database/DB";
import Database     from "@Database/Connection";
import AvatarsModel from "@DbModels/AvatarsModel";
import Inventory    from "./Inventory";
import User         from "@Entities/User/User";

export default class Avatar extends DB<TAvatars>{ 
    //#region Fields
        private name        :string;    //{get;}
        private exp         :number;    //{get;}
        private silver      :number;    //{get;}
        private gold        :number;    //{get;}
        private redPowder   :number;    //{get;}
        private diamond     :number;    //{get;}
        private createdDate :string;    //{get;}
        private inventory   :Inventory; //לערוך


    //#endregion

    //#region Flags
        private isExist          :boolean   = false;   
        private isActive         :boolean   = false;   
        private isSelectMission  :boolean   = false;           
        private isFreeze         :boolean   = false;       
        private inPage           :string    = 'home';   
    //#endregion

    //#region Refferences
        private user                :   User;   //{get;}   
        private activeMission       :   any; //  Mission;    //{get;}           
        private magicType           :   any; //  Magic;      //{get;}     
        private page                :   any; //  Page;       //{get;}   
    //#endregion

    //#region Gets      
        public GetId            = ():number     => this.id           ;
        public GetName          = ():string     => this.name         ;
        public GetExp           = ():number     => this.exp          ;
        public GetSilver        = ():number     => this.silver       ;
        public GetGold          = ():number     => this.gold         ;
        public GetRedPowder     = ():number     => this.redPowder    ;
        public GetDiamond       = ():number     => this.diamond      ;
        public GetCreatedDate   = ():string     => this.createdDate  ;
        public GetInventory     = ():Inventory  => this.inventory    ;
        public GetUser          = ():User       => this.user         ;
        public GetActiveMission = ()            => this.activeMission;
        public GetMagicType     = ()            => this.magicType    ;
        public GetPage          = ()            => this.page         ;
    //#endregion

    //#region Method
        public constructor(avatarObj?:AvatarsModel , user?:User){
            super({tableName:"avatars"})
            if(avatarObj){
                this.id          = avatarObj.id         ;
                this.name        = avatarObj.name       ;
                this.exp         = avatarObj.exp        ;
                this.silver      = avatarObj.silver     ;
                this.gold        = avatarObj.gold       ;
                this.redPowder   = avatarObj.redPowder  ;
                this.diamond     = avatarObj.diamond    ;
                this.createdDate = avatarObj.createdDate;
                this.inventory   = new Inventory(this)  ;
                this.isExist     = true                 ;
            }
            if(user)
                this.user = user;
        }

  
        public EnterToActiveAvatar(){
            if(!this.isExist) return;
            this.user.UpdateActiveAvatar(this);
            this.isActive = true;
        }
    
        public OutFromActiveAvatar(){
            if(!this.isExist) return;
            this.user.UpdateActiveAvatar(null);
            this.isActive = false;
        }
    


    //#endregion

    //#region statics
    public static GetAvatarsByUserId(user:User):Avatar[]{
        let avatars:Avatar[] = [];

        Database.SelectSync<TAvatars>({
            Fields  : ["id","name","userID","createdDate","exp","gold","silver","redPowder","diamond","freeze","magicID","missionID"],
            from    : "avatars",
            where   : `userID='${user.GetId()}'`
        })
        .ValidDB<AvatarsModel[]>(data =>{
            data.forEach((avatar)=>{
                avatars.push(new Avatar(avatar,user));
            })
        })
        .NoValidDB(err =>{})
        return avatars;
    }
  
    //#endregion

 }