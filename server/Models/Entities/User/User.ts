import UserModel          from "@DbModels/UserModel";
import randomString from "@Functions/randomString";
import Database           from "@Database/Connection";
import Avatar from "@Entities/Avatar/Avatar";
import RegisterValidation from "@Validations/registerValidation";
import LoginValidation from "@Validations/loginValidation";

export default class User extends Database<TUser>{
    // #region Fields                              
        private username         :string  | null =null;  //{get;}                       
        private email            :string  | null =null;  //{get; set;}                   
        private firstName        :string  | null =null;  //{get; set;}                       
        private lastName         :string  | null =null;  //{get; set;}                       
        private birthday         :string  | null =null;  //{get; set;}                       
        private registerDate     :string  | null =null;  //{get;}                           
        private banned           :boolean | null =null;  //{get;}                   
        private freeze           :boolean | null =null;  //{get;}                   
        private token            :string  | null =null;  //{get;}            
        public  message          :any;       
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
        public  GetId            = ():number        => this.id               ;
        public  GetUsername      = ():string        => this.username         ;
        public  GetEmail         = ():string        => this.email            ;
        public  GetFirstName     = ():string        => this.firstName        ;
        public  GetLastName      = ():string        => this.lastName         ;
        public  GetBirthday      = ():string        => this.birthday         ;
        public  GetRegisterDate  = ():string        => this.registerDate     ;
        public  GetBanned        = ():boolean       => this.banned           ;
        public  GetFreeze        = ():boolean       => this.freeze           ;
        public  GetToken         = ():string        => this.token            ;
        public  IsExist          = ():boolean       => this.isExist          ;
        public  IsLogin          = ():boolean       => this.isLogin          ;
        public  IsSelectedAvatar = ():boolean       => this.isSelectedAvatar ;
        public  GetAvatars       = ():Avatar[]      => this.avatars          ;
        public  GetActiveAvatar  = ():(Avatar|null) => this.activeAvatar     ;
    //#endregion

    //#region Sets:
        public  setEmail            = (value:string) :void  => {this.email      = value}
        public  setFirstName        = (value:string) :void  => {this.firstName  = value}
        public  setLastName         = (value:string) :void  => {this.lastName   = value}
        public  setBirthday         = (value:string) :void  => {this.birthday   = value}
        public  setIsSelectedAvatar = (value:boolean):void  => {this.isSelectedAvatar = value}
    //#endregion

    //#region Method
        public constructor(obj?:UserModel){
            super({tableName:"users"})

            if(obj){
                this.id           = (obj.id           )? obj.id           : null;         
                this.id           = (obj.id           )? obj.id           : null;         
                this.username     = (obj.username     )? obj.username     : null;         
                this.email        = (obj.email        )? obj.email        : null;        
                this.firstName    = (obj.firstName    )? obj.firstName    : null;        
                this.lastName     = (obj.lastName     )? obj.lastName     : null;         
                this.birthday     = (obj.birthday     )? obj.birthday     : null;         
                this.registerDate = (obj.registerDate )? obj.registerDate : null;         
                this.banned       = (obj.banned       )? obj.banned       : null;       
                this.freeze       = (obj.freeze       )? obj.freeze       : null;       
                this.token        = (obj.token        )? obj.token        : null;        
            }
            this.isExist = (this.id && this.username)? true :false;
        }
          
        public Logout():User{
            if(!this.isLogin) return;
            this.removeToken();
            this.id      = null;
            this.isLogin = false; 
            return this;
        }

        public Login(obj:ILogin):User{
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
            return this;
        }
        
        public Register(obj:IRegister):User{ 
            if(this.isLogin) return
            RegisterValidation(obj).Valid(()=>{
                this.isExist = true;
                this.isLogin = false;
                this.username = obj.username;
                this.QuerySync(`insert into users (username,password,email,firstName,lastName) Values ('${obj.username}','${obj.password}','${obj.email}','${obj.firstName}','${obj.lastName}')`)
            }).NoValid(msg=>{
                this.isExist = false;
                this.isLogin = false;
                this.message = msg; 
            })
            return this;
        }

        public DeleteDB(){
            this.DeleteSync({where:`username='${this.username}'`})
            this.isExist = false;
        }

        private createToken(){
            if(!this.IsLogin()) return;
            let token = randomString(40)
            this.UpdateSync({update: {token:token}})
            this.token = token;
        }
        private removeToken(){
            if(!this.IsExist()) return;
            this.UpdateSync({update: {token:''}})
            this.token = null;
        }

        public UpdateActiveAvatar(avatar:Avatar){
            if(!avatar){
                this.isSelectedAvatar = false;
                this.activeAvatar = null;
                return;
            }
            this.activeAvatar = this.avatars.find(a=>a.GetId()==avatar.GetId());
            this.isSelectedAvatar = this.activeAvatar? true : false;
        }
        private fillFields   = (data:UserModel)  => {for(let key in data) this[key]=data[key]};

    //#endregion

    //#region Statics:
        public static getAllUsers():Promise<User[]> {
            return new Promise<User[]>((resolve,reject)=>{
                let user :User[]= []
                new Database().SelectSync<TUser>({
                    Fields:['id','username','email','firstName','lastName','birthday','registerDate','freeze','token'],
                    from:"users",
                    where:"1=1"
                }).ValidDB<UserModel[]>(data => {
                    data.forEach(usr => user.push(new User(usr)));
                    resolve(user)
                })
                .NoValidDB(err=>reject(err))     
            })
        }

        public static getAllUsersSync(): User[] {
            let user:User[] = [];
            new Database().SelectSync<TUser>({
                Fields:['id','username','email','firstName','lastName','birthday','registerDate','freeze','token'],
                from:"users",
            })
            .ValidDB<UserModel[]>(data=> data.forEach(u=>user.push(new User(u))))
            return user
        }
        

        public static GetUserById(userID:number):User{
            let user:User = null;
            new Database().SelectSync<TUser>({
                Fields:['id','username','email','firstName','lastName','birthday','registerDate','freeze','token'],
                from:"users",
                where : `id='${userID}'`
            })
            .ValidDB<UserModel[]>(data=> user=new User(data[0]))
            return user
        }
        public static GetUserByUsername(username:string):User{
            let user:User = null;
            new Database().SelectSync<TUser>({
                Fields:['id','username','email','firstName','lastName','birthday','registerDate','freeze','token'],
                from:"users",
                where : `username='${username}'`
            })
            .ValidDB<UserModel[]>(data=> user=new User(data[0]))
            return user
        }
        public static GetUserByToken(token:string):User{
            let user:User = new User;
            if(token.length <10) return user; 
            new Database().SelectSync<TUser>({
                Fields:['id','username','email','firstName','lastName','birthday','registerDate','freeze','token'],
                from:"users",
                where : `token='${token}'`
            })
            .ValidDB<UserModel[]>(data=> user=new User(data[0]))
            return user
        }


    //#endregion

}
 
