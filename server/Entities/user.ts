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
        public constructor(){
            // if      (obj as ILogin)      this.login(<ILogin>obj)
            // else if (obj as IRegister)   this.register(<IRegister>obj)

            // this.isExist = (this.id && this.username)? true :false ;
            // this.isLogin = (this.id && this.username)? true :false ;

            // if(this.isExist){
            //     this.avatars = Avatar.GetAvatarsByUserId(this.id);
            // }
        }
        
        public updateActiveAvatar(id:null):Avatar {return null} 
        public logout(){}

        public login(obj:ILogin){
            let validation = LoginValidation(obj);
            if(validation.valid){
                Database.SelectSync({fields:"*",from:"users",where:`username='${obj.username}' and password='${obj.password}'`})
                .ValidData((data)=>{
                    this.fillFields(data[0]);
                    this.isExist =  true;
                    this.isLogin =  true;
                    this.avatars = Avatar.GetAvatarsByUserId(this.id);
                })
                .NoValidData(()=>{
                    this.isExist = false;
                    this.isLogin = false;
                    this.message = validation.messages; 
                })
            }       
        }

        public register(obj:IRegister){ 
            let validation = RegisterValidation(obj);
            if(validation.valid){
                this.isExist = true;
                this.isLogin = true;
            }
            else{
                this.isExist = false;
                this.isLogin = false;
                this.message = validation.messages; 
            }
        }


        private fillFields = (data:UserModel) => {for(let key in data) this[key]=data[key]};

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
