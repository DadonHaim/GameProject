import Database from "../Database/connection";
import UserModel from "../Database/models/UserModel";
import Debug from "../Dev/debug";
import LoginValidation from "../validations/loginValidation";
import RegisterValidation from "../validations/registerValidation";
import Avatar from "./avatar"; 

export default  class User{
    // #region Fields                              
        private id               :number  | null ;  //{get;}               
        private username         :string  | null ;  //{get;}                       
        private email            :string  | null ;  //{get; set;}                   
        private firstName        :string  | null ;  //{get; set;}                       
        private lastName         :string  | null ;  //{get; set;}                       
        private birthday         :string  | null ;  //{get; set;}                       
        private registerDate     :string  | null ;  //{get;}                           
        private banned           :boolean | null ;  //{get;}                   
        private freeze           :boolean | null ;  //{get;}                   
        private token            :string  | null ;  //{get;}            
        public  message          :any      ;       
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
        public constructor(obj:ILogin | IRegister){
            if      (obj as ILogin)      this.login(<ILogin>obj)
            else if (obj as IRegister)   this.register(<IRegister>obj)

            this.isExist = (this.id && this.username)? true :false ;
            this.isLogin = (this.id && this.username)? true :false ;

            if(this.isExist){
                this.avatars = Avatar.GetAvatarsByUserId(this.id);
            }
        }
        
        public updateActiveAvatar(id:null):Avatar {return null} 
        public logout(){}

        private login(obj:ILogin):User{
            let validation = LoginValidation(obj);
            if(validation.valid){
                let data = Database.SelectSync({fields:"*",from:"users",where:`username='${obj.username}' and password='${obj.password}'`})
                this.fillFields(data[0]);
                
            }else{
                this.isExist = false;
                this.isLogin = false;
                this.message = validation.messages; 
            }
            return this;
        }

        private register(obj:IRegister):User{ 
            Debug(`User->constructor(IRegister)`)

            return this;
        }


        private fillFields(data:UserModel){
            this.id            = (data && data.id)           ? data.id           :null;
            this.username      = (data && data.username)     ? data.username     :null;
            this.email         = (data && data.email)        ? data.email        :null;
            this.firstName     = (data && data.firstName)    ? data.firstName    :null;
            this.lastName      = (data && data.lastName)     ? data.lastName     :null;
            this.birthday      = (data && data.birthday)     ? data.birthday     :null;
            this.registerDate  = (data && data.registerDate) ? data.registerDate :null;
            this.banned        = (data && data.banned)       ? data.banned       :null;
            this.freeze        = (data && data.freeze)       ? data.freeze       :null;
            this.token         = (data && data.token)        ? data.token        :null;
        }


    //#endregion

    //#region Statics:
        public static getAllUsers     (): User[] {return null   }
        public static getAllUsersLite (): User[] {return null    }

    //#endregion

}
 
 


interface IFlagUser{
    isExist? : boolean,
    isLogin? : boolean,
}
