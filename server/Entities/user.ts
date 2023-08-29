let Database = require("../Database/connection")
const EventEmitter = require("events");
require("../interface/ILogin")

module.exports = class User{
    // #region Fields                              
        private id               :number   ;  //{get;}               
        private username         :string   ;  //{get;}                       
        private email            :string   ;  //{get; set;}                   
        private firstName        :string   ;  //{get; set;}                       
        private lastName         :string   ;  //{get; set;}                       
        private birthday         :string   ;  //{get; set;}                       
        private registerDate     :string   ;  //{get;}                           
        private banned           :boolean  ;  //{get;}                   
        private freeze           :boolean  ;  //{get;}                   
        private token            :string   ;  //{get;}                   
    //#endregion 
    
    //#region Flags:
        private isExist            :boolean  = false; //{get;}         
        private isLogin            :boolean  = false; //{get;}         
        private isSelectedAvatar   :boolean  = false; //{get;}                     
    // #endregion

    //#region Refferences:
        private avatars       : Avatar[]     ; //{get;}
        private activeAvatars : Avatar|null  ; //{get;}
    //#endregion

    //#region Gets:
        public  getId            = ():number        => this.id               ;
        public  getUsername      = ():string        => this.username         ;
        public  getEmail         = ():string        => this.email            ;
        public  getFirstName     = ():string        => this.firstName        ;
        public  getLastName      = ():string        => this.lastName         ;
        public  getBirthday      = ():string        => this.birthday         ;
        public  getRegisterDate  = ():string        => this.registerDate     ;
        public  getBanned        = ():boolean       => this.banned           ;
        public  getFreeze        = ():boolean       => this.freeze           ;
        public  getToken         = ():string        => this.token            ;
        public  IsExist          = ():boolean       => this.isExist          ;
        public  IsLogin          = ():boolean       => this.isLogin          ;
        public  IsSelectedAvatar = ():boolean       => this.isSelectedAvatar ;
        public  getAvatars       = ():Avatar[]      => this.avatars          ;
        public  getActiveAvatar  = ():(Avatar|null) => this.activeAvatars    ;
    //#endregion

    //#region Sets:
        public  setEmail      = (value:string):void => {this.email      = value}
        public  setFirstName  = (value:string):void => {this.firstName  = value}
        public  setLastName   = (value:string):void => {this.lastName   = value}
        public  setBirthday   = (value:string):void => {this.birthday   = value}
    //#endregion

    //#region Method
        public constructor(obj?:UserModel){

        }
        
        public updateActiveAvatar():Avatar {return null} 
        public logout(){}
    //#endregion

    //#region Statics:
        public static getAllUsers (): User[] {return null   }
        public static getAllUsersLite (): User[] {return null    }

    //#endregion

}



interface IFlagUser{
    isExist? : boolean,
    isLogin? : boolean,
}
