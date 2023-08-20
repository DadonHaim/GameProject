const Database     = require("../Database/connection");
const {RegisterValid} = require("../validation/registerValidation")

class User extends Database{
     private id             : number | null;
     private username       : string;
     private email          : string;
     private firstName      : string;
     private lastName       : string;
     private birthday       : Date;
     private register_date  : Date;
     private token          : string;
     private banned         : boolean;
     private freeze         : boolean;
     private avatars        : Avatar[];
     private isExist        : boolean = false;

     
     public GetId           = ():number|null => this.id;
     public GetUsername     = ():string      => this.username;
     public GetEmail        = ():string      => this.email;
     public GetFirstname    = ():string      => this.firstName;
     public GetLastName     = ():string      => this.lastName;
     public GetBirthday     = ():Date        => this.birthday;
     public IsBanned        = ():boolean     => this.banned;
     public IsFreeze        = ():boolean     => this.freeze;
     public GetRegisterDate = ():Date        => this.register_date;
     public GetAllAvatars   = ():Avatar[]    => this.avatars;
     public IsExist         = ():boolean     => this.isExist;
     
     public SetEmail      = (val:string):void => {this.email     = val;}
     public SetFirstname  = (val:string):void => {this.firstName = val;}
     public SetLastName   = (val:string):void => {this.lastName  = val;}
     public SetBirthday   = (val:Date)  :void => {this.birthday  = val;}


     public constructor(){super()}




     public Login(username:string , password:string):User{
          this.Query(`SELECT * FROM users WHERE username='${username}' and password='${password}'`)
          .then(rows=>{
               this.id             = rows[0].user_id;
               this.username       = rows[0].username;
               this.email          = rows[0].email;
               this.firstName      = rows[0].firstName;
               this.lastName       = rows[0].lastName;
               this.birthday       = rows[0].birthday;
               this.register_date  = rows[0].register_date;
               this.banned         = rows[0].banned;
               this.freeze         = rows[0].freeze;
               this.token          = rows[0].token;
               this.avatars        = Avatar.GetAllAvatars(this.id)
               this.isExist        = true;
          })
          .catch(err=>{this.id = null;})
          return this;
     }

     public Register(obj:RegisterType):User{
          let validation = RegisterValid(obj);
          if(validation.isValid){
               this.Query(`Insert Into users (username,email,firstName,lastName,birthday) Values ('${obj.username}','${obj.email}','${obj.firstName}','${obj.lastName}','${obj.birthday}')`)
               .then()
          }
          else{

          }
          return this;
     }

     public CreateNewAvatar(obj:AvatarType):Result<void>{
          if(this.avatars.length >= new Setting().GetAvatarsPerUser()){
               const tempAvatar = new Avatar();
               const check = tempAvatar.create(obj);

               if(tempAvatar.IsExist())
                    return new Result({Messages:LangValid.createAvatarSuccess, Valid:true });
               else
                    return new Result({Messages:check.Messages, Valid:false });
          }
          else
               return new Result({Messages:LangError.TooMuchAvatars, Valid:false });
     }

     public ForgetPassword(){}

     public static GetUsersLength(){}

     public static GetAllUsers(){}

     
}
