export default class UserModel{
    public id?           : number;
    public username?     : string;
    // public password?     : string; -- חסוי
    public email?        : string;
    public firstName?    : string;
    public lastName?     : string;
    public birthday?     : string;
    public registerDate? : string;
    // public banned?       : boolean; -- חסוי
    public freeze?       : boolean;
    public token?        : string;
    // public forgetPass?   : string; -- חסוי

    public static type : "id"|"username"|"email"|"firstName"|"lastName"|"birthday"|"registerDate"|"freeze"|"token";
}

