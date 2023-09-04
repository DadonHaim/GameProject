import UserModel          from "@DbModels/UserModel";
import LoginValidation    from "@Validations/loginValidation";
import RegisterValidation from "@Validations/registerValidation";
import Avatar             from "@Entities/Avatar/Avatar"; 
import randomString       from "@Functions/randomString";
import DB                 from "@Database/DB";

export default class User extends DB<TUser>{
    // #region Fields                              
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
        private isSelectedAvatar   :boolean  = false; //{get; set;}                     
    // #endregion

    //#region Refferences:
        private avatars       : Avatar[]     ; //{get;}
        private activeAvatar  : Avatar|null  ; //{get;}
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
        public  getActiveAvatar  = ():(Avatar|null) => this.activeAvatar     ;
    //#endregion

    //#region Sets:
        public  setEmail            = (value:string) :void  => {this.email      = value}
        public  setFirstName        = (value:string) :void  => {this.firstName  = value}
        public  setLastName         = (value:string) :void  => {this.lastName   = value}
        public  setBirthday         = (value:string) :void  => {this.birthday   = value}
        public  setIsSelectedAvatar = (value:boolean):void =>{this.isSelectedAvatar = value}
    //#endregion

    //#region Method
        public constructor(){
            super({tableName:"users"})
        }
          
        public logout(){
            if(!this.isLogin) return;
            this.removeToken();
            this.id = null;
            this.isLogin = false; 
        }

        public login(obj:ILogin){
            if(this.isLogin) return;
            LoginValidation(obj).Valid(()=>{
                this.SelectSync({
                    Fields: ["id","username","email","firstName","lastName","registerDate","birthday","freeze","token"],
                    where : `username ='${obj.username}' and password = '${obj.password}'`
                })
                .ValidDB<UserModel[]>((data)=>{
                    this.fillFields(data[0]);
                    this.isExist =  true;
                    this.isLogin =  true;
                    this.createToken();
                    this.avatars = Avatar.GetAvatarsByUserId(this);
                })
                .NoValidDB(()=>{
                    this.isExist = false;
                    this.isLogin = false;
                })
            }).NoValid((msgs)=>this.message = msgs)  
        }
        
        public register(obj:IRegister){ 
            if(this.isLogin) return
            RegisterValidation(obj).Valid(()=>{
                this.isExist = true;
                this.isLogin = true;
            }).NoValid(msg=>{
                this.isExist = false;
                this.isLogin = false;
                this.message = msg; 
            })
        }

        private createToken(){
            if(!this.IsLogin()) return;
            let token = randomString(40)
            // this.UpdateSync({token: token})
            this.token = token;
        }
        private removeToken(){
            if(!this.IsExist()) return;
            // this.UpdateSync({token:'',}) 
            this.token = null;
        }

        public UpdateActiveAvatar(avatarRef:Avatar){
            if(avatarRef == null){
                this.isSelectedAvatar = false;
                this.activeAvatar = null;
                return;
            }
            this.activeAvatar = this.avatars.find(avatar=>avatar.getId()==avatarRef.getId());
            if(this.activeAvatar)
                this.isSelectedAvatar = true;
        }
        private fillFields   = (data:UserModel)  => {for(let key in data) this[key]=data[key]};

    //#endregion

    //#region Statics:
        public static getAllUsers     (): User[] {return null   }
        public static getAllUsersLite (): User[] {return null    }
    //#endregion

}
 
